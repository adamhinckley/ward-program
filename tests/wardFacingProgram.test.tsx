// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';

const { mockUseProgramTheme } = vi.hoisted(() => ({
	mockUseProgramTheme: vi.fn(),
}));

vi.mock('next/dynamic', () => ({
	default: (_importFn: unknown, _options?: unknown) => () => null,
}));

vi.mock('@/context/ProgramThemeContext', () => ({
	useProgramTheme: () => mockUseProgramTheme(),
}));

vi.mock('@/components/agendaV2', () => ({
	default: () => null,
}));

vi.mock('@/components/frontPage', () => ({
	default: () => null,
}));

vi.mock('@/components/announcements', () => ({
	default: () => null,
}));

vi.mock('@/components/WardContacts', () => ({
	default: () => null,
}));

import WardFacingProgram from '../components/WardFacingProgram';

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

const setScrollY = (value: number) => {
	Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value });
};

describe('WardFacingProgram scroll behavior', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockUseProgramTheme.mockReturnValue({ themeMode: 'light', setThemeMode: vi.fn() });
		setScrollY(0);
		vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
			height: 50,
			top: 0,
			bottom: 50,
			left: 0,
			right: 0,
			width: 100,
			x: 0,
			y: 0,
			toJSON: () => ({}),
		} as DOMRect);
	});

	const getHeader = (container: HTMLElement) => container.querySelector('header')!;

	it('renders with header visible by default', () => {
		const { container } = render(<WardFacingProgram />);
		const header = getHeader(container);
		expect(header.className).toContain('translate-y-0');
		expect(header.className).not.toContain('-translate-y-full');
	});

	it('shows header and resets when scrollY is at or below zero', () => {
		const { container } = render(<WardFacingProgram />);
		const header = getHeader(container);

		setScrollY(100);
		fireEvent.scroll(window);
		expect(header.className).toContain('-translate-y-full');

		setScrollY(0);
		fireEvent.scroll(window);
		expect(header.className).toContain('translate-y-0');
		expect(header.className).not.toContain('-translate-y-full');
	});

	it('hides header when scrolling down past header height', () => {
		const { container } = render(<WardFacingProgram />);
		const header = getHeader(container);

		// hideHeaderOffset is 50 (from mocked getBoundingClientRect height)
		setScrollY(100);
		fireEvent.scroll(window);

		expect(header.className).toContain('-translate-y-full');
	});

	it('shows header when scrolling up', () => {
		const { container } = render(<WardFacingProgram />);
		const header = getHeader(container);

		setScrollY(100);
		fireEvent.scroll(window);
		expect(header.className).toContain('-translate-y-full');

		setScrollY(50);
		fireEvent.scroll(window);
		expect(header.className).toContain('translate-y-0');
	});

	it('does not change header visibility for small scroll deltas', () => {
		const { container } = render(<WardFacingProgram />);
		const header = getHeader(container);

		// delta = 1 - 0 = 1, which is less than the threshold of 2
		setScrollY(1);
		fireEvent.scroll(window);

		expect(header.className).toContain('translate-y-0');
		expect(header.className).not.toContain('-translate-y-full');
	});

	it('does not hide header when scrollY is within the header height offset', () => {
		const { container } = render(<WardFacingProgram />);
		const header = getHeader(container);

		// scrollY=30 is less than hideHeaderOffset=50, so header stays visible
		setScrollY(30);
		fireEvent.scroll(window);

		expect(header.className).toContain('translate-y-0');
		expect(header.className).not.toContain('-translate-y-full');
	});

	it('updates header height offset on resize event', () => {
		const { container } = render(<WardFacingProgram />);
		const header = getHeader(container);

		// With hideHeaderOffset=50, scrollY=30 does not hide the header
		setScrollY(30);
		fireEvent.scroll(window);
		expect(header.className).toContain('translate-y-0');

		// Resize reduces the header height to 10, updating hideHeaderOffset to 10
		vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
			height: 10,
			top: 0,
			bottom: 10,
			left: 0,
			right: 0,
			width: 100,
			x: 0,
			y: 0,
			toJSON: () => ({}),
		} as DOMRect);
		fireEvent(window, new Event('resize'));

		// scrollY=60 is now greater than updated hideHeaderOffset=10
		setScrollY(60);
		fireEvent.scroll(window);
		expect(header.className).toContain('-translate-y-full');
	});

	it('updates header height offset on orientationchange event', () => {
		const { container } = render(<WardFacingProgram />);
		const header = getHeader(container);

		setScrollY(30);
		fireEvent.scroll(window);
		expect(header.className).toContain('translate-y-0');

		vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
			height: 10,
			top: 0,
			bottom: 10,
			left: 0,
			right: 0,
			width: 100,
			x: 0,
			y: 0,
			toJSON: () => ({}),
		} as DOMRect);
		fireEvent(window, new Event('orientationchange'));

		setScrollY(60);
		fireEvent.scroll(window);
		expect(header.className).toContain('-translate-y-full');
	});

	it('cleans up scroll, resize, and orientationchange listeners on unmount', () => {
		const addSpy = vi.spyOn(window, 'addEventListener');
		const removeSpy = vi.spyOn(window, 'removeEventListener');

		const { unmount } = render(<WardFacingProgram />);
		unmount();

		for (const eventType of ['scroll', 'resize', 'orientationchange']) {
			const addCall = addSpy.mock.calls.find((call) => call[0] === eventType);
			const removeCall = removeSpy.mock.calls.find((call) => call[0] === eventType);
			expect(addCall, `addEventListener for '${eventType}' was not called`).toBeTruthy();
			expect(removeCall, `removeEventListener for '${eventType}' was not called`).toBeTruthy();
			expect(removeCall?.[1]).toBe(addCall?.[1]);
		}
	});
});
