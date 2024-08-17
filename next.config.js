/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	images: {
		domains: ['content.churchofjesuschrist.org', 'www.churchofjesuschrist.org'],
	},
	compiler: {
		emotion: true,
	},
	// this webpack key was added for Tiptap https://tiptap.dev/docs/editor/getting-started/install/nextjs
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// Ensure that all imports of 'yjs' resolve to the same instance
			config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs');
		}
		return config;
	},
};

module.exports = nextConfig;
