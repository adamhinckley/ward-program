/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const loadingStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	margin: 0 auto;
	max-width: 600px;
	background-color: #ffffff;
	position: relative;

	@keyframes showTopText {
		0% {
			transform: translate3d(0, 100%, 0);
		}
		100% {
			transform: translate3d(0, 0, 0);
		}
	}
	@keyframes showBottomText {
		0% {
			transform: translate3d(0, -100%, 0);
		}
		100% {
			transform: translate3d(0, 0, 0);
		}
	}
	.animated-title {
		color: #222;
		font-family: Roboto, Arial, sans-serif;
		height: 100vh;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 90vmin;
		margin: 0 auto;
	}
	.animated-title > div {
		height: 50%;
		overflow: hidden;
		position: absolute;
		width: 100%;
	}
	.animated-title > div div {
		font-size: 12vmin;
		padding: 2vmin 0;
		position: absolute;
	}
	.animated-title > div div span {
		display: block;
	}
	.animated-title > div.text-top {
		border-bottom: 1vmin solid #000;
		top: 0;
	}
	.animated-title > div.text-top div {
		animation: showTopText 0.3s;
		// animation-delay: 0.2s;
		animation-fill-mode: forwards;
		bottom: 0;
		transform: translate(0, 100%);
	}
	.animated-title > div.text-top div span:first-of-type {
		color: #767676;
	}
	.animated-title > div.text-bottom {
		bottom: 0;
	}
	.animated-title > div.text-bottom div {
		animation: showBottomText 0.4s;
		animation-delay: 0.3s;
		animation-fill-mode: forwards;
		top: 0;
		transform: translate(0, -100%);
	}
`;

const Loading = () => {
	return (
		<div css={loadingStyles}>
			<div className="animated-title">
				<div className="text-top">
					<div>
						<span>Florence</span>
					</div>
				</div>
				<div className="text-bottom">
					<div>Ward</div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
