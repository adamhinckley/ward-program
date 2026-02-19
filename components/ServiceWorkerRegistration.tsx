'use client';

import { useEffect } from 'react';

const ServiceWorkerRegistration = () => {
	useEffect(() => {
		if (!('serviceWorker' in navigator)) {
			return;
		}

		navigator.serviceWorker
			.register('/sw.js')
			.catch((error) => console.error('Failed to register service worker:', error));
	}, []);

	return null;
};

export default ServiceWorkerRegistration;
