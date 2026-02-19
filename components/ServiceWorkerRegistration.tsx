'use client';

import { useEffect } from 'react';

const ServiceWorkerRegistration = () => {
	useEffect(() => {
		if (!('serviceWorker' in navigator)) {
			return;
		}

		navigator.serviceWorker.register('/sw.js').catch(() => undefined);
	}, []);

	return null;
};

export default ServiceWorkerRegistration;
