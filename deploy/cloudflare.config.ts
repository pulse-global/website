import { defineConfig } from 'cf/config';

export default defineConfig({
	worker: {
		name: 'pulse-site',
		compatibilityDate: '2026-11-01',
		domains: ['pulse.city', 'www.pulse.city'],
		workersDev: true,
		observability: {
			enabled: true
		}
	}
});
