const loadingMessages = [
	'Did you think to pray?',
	'Who are your ministering brothers and sisters?',
	'Have you had your daily scripture study?',
	'Have you been to the temple lately?',
] as const;

export default function HomeLoadingScreen() {
	const randomMessage =
		loadingMessages[Math.floor(Math.random() * loadingMessages.length)] ?? loadingMessages[0];

	return (
		<main
			style={{
				maxWidth: 550,
				margin: '0 auto',
				padding: '12px',
				height: '100dvh',
				minHeight: '100vh',
				boxSizing: 'border-box',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'var(--program-bg)',
			}}
			aria-busy="true"
			aria-label="Loading program"
		>
			<div
				style={{
					padding: '14px 20px',
					borderRadius: 12,
					backgroundColor: 'var(--program-panel-bg)',
					border: '1px solid var(--program-panel-border)',
					color: 'var(--program-fg)',
					fontSize: '1rem',
					fontWeight: 500,
					letterSpacing: '0.01em',
					textAlign: 'center',
					animation: 'gentlePulse 1.8s ease-in-out infinite',
				}}
			>
				{randomMessage}
			</div>
			<style>{`
				@keyframes gentlePulse {
					0% {
						opacity: 0.65;
						transform: translateY(0px);
					}
					50% {
						opacity: 1;
						transform: translateY(-1px);
					}
					100% {
						opacity: 0.65;
						transform: translateY(0px);
					}
				}
			`}</style>
		</main>
	);
}
