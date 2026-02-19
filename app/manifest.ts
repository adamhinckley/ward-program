import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Ward Program',
		short_name: 'Ward Program',
		description: 'Sacrament Meeting Agenda for Florence Ward',
		start_url: '/',
		scope: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#1b1c1f',
		icons: [
			{
				src: '/icon.png',
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: '/icon.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	};
}
