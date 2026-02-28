import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockRevalidateTag = vi.fn();
const mockCreateClient = vi.fn();

vi.mock('next/cache', () => ({
	revalidateTag: (...args: unknown[]) => mockRevalidateTag(...args),
}));

vi.mock('../utils/supabase/server', () => ({
	createClient: () => mockCreateClient(),
}));

const makeRequest = (body: unknown) =>
	new Request('http://localhost/api/bulletin', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

const makeInvalidJsonRequest = () =>
	new Request('http://localhost/api/bulletin', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: '{invalid-json',
	});

const createSupabaseMock = ({
	user,
	userError,
	updateError,
}: {
	user: { id: string } | null;
	userError: { message: string } | null;
	updateError: { message: string } | null;
}) => {
	const maybeSingle = vi.fn().mockResolvedValue({ error: updateError });
	const select = vi.fn().mockReturnValue({ maybeSingle });
	const eq = vi.fn().mockReturnValue({ select });
	const update = vi.fn().mockReturnValue({ eq });
	const from = vi.fn().mockReturnValue({ update });

	return {
		auth: {
			getUser: vi.fn().mockResolvedValue({
				data: { user },
				error: userError,
			}),
		},
		from,
		mocks: { from, update, eq, select, maybeSingle },
	};
};

describe('PUT /api/bulletin', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns 401 when user is not authenticated', async () => {
		const supabase = createSupabaseMock({
			user: null,
			userError: null,
			updateError: null,
		});
		mockCreateClient.mockResolvedValue(supabase);

		const { PUT } = await import('../app/api/bulletin/route');
		const response = await PUT(makeRequest({ bulletin: { title: 'Test' } }));
		const json = await response.json();

		expect(response.status).toBe(401);
		expect(json).toEqual({ error: 'Unauthorized' });
		expect(mockRevalidateTag).not.toHaveBeenCalled();
	});

	it('returns 400 when JSON payload is invalid', async () => {
		const supabase = createSupabaseMock({
			user: { id: 'user-1' },
			userError: null,
			updateError: null,
		});
		mockCreateClient.mockResolvedValue(supabase);

		const { PUT } = await import('../app/api/bulletin/route');
		const response = await PUT(makeInvalidJsonRequest());
		const json = await response.json();

		expect(response.status).toBe(400);
		expect(json).toEqual({ error: 'Invalid JSON payload' });
		expect(mockRevalidateTag).not.toHaveBeenCalled();
	});

	it('returns 400 when bulletin payload is missing or not an object', async () => {
		const supabase = createSupabaseMock({
			user: { id: 'user-1' },
			userError: null,
			updateError: null,
		});
		mockCreateClient.mockResolvedValue(supabase);

		const { PUT } = await import('../app/api/bulletin/route');
		const response = await PUT(makeRequest({ bulletin: 'bad-payload' }));
		const json = await response.json();

		expect(response.status).toBe(400);
		expect(json).toEqual({ error: 'Missing bulletin payload' });
		expect(mockRevalidateTag).not.toHaveBeenCalled();
	});

	it('returns 500 when bulletin update fails', async () => {
		const supabase = createSupabaseMock({
			user: { id: 'user-1' },
			userError: null,
			updateError: { message: 'db failure' },
		});
		mockCreateClient.mockResolvedValue(supabase);

		const { PUT } = await import('../app/api/bulletin/route');
		const response = await PUT(makeRequest({ bulletin: { title: 'Test' } }));
		const json = await response.json();

		expect(response.status).toBe(500);
		expect(json).toEqual({ error: 'Unable to update bulletin' });
		expect(mockRevalidateTag).not.toHaveBeenCalled();
	});

	it('updates bulletin and revalidates matching ward tag on success', async () => {
		const supabase = createSupabaseMock({
			user: { id: 'user-123' },
			userError: null,
			updateError: null,
		});
		mockCreateClient.mockResolvedValue(supabase);

		const bulletin = { title: 'Ward Program' };
		const { PUT } = await import('../app/api/bulletin/route');
		const response = await PUT(makeRequest({ bulletin }));
		const json = await response.json();

		expect(supabase.mocks.from).toHaveBeenCalledWith('ward-bulletin');
		expect(supabase.mocks.update).toHaveBeenCalledWith({ bulletin });
		expect(supabase.mocks.eq).toHaveBeenCalledWith('id', 'user-123');
		expect(supabase.mocks.select).toHaveBeenCalledWith('id');
		expect(response.status).toBe(200);
		expect(json).toEqual({ ok: true });
		expect(mockRevalidateTag).toHaveBeenCalledWith('ward-bulletin:user-123', 'max');
	});
});
