import styled from "styled-components";

const Footer = () => {
	const openUrl = (url: string) => {
		window.open(url, "_blank");
	};

	return (
		<Container>
			<button onClick={() => openUrl("https://youticle.notion.site/f076128fc331471cb90886dd8b19e4f5")}>이용약관</button>
			<button onClick={() => openUrl("https://youticle.notion.site/077923c2481e4894b130b7ae1f1bc58a")}>
				개인정보처리방침
			</button>
		</Container>
	);
};

export default Footer;

const Container = styled.footer`
	width: 100%;
	height: 68px;
	background-color: rgba(15, 15, 15, 1);
	display: flex;
	padding-left: 20px;

	button {
		font-size: 14px;
		font-weight: 500;
		line-height: 16.71px;
		background-color: transparent;
		color: rgba(255, 255, 255, 1);
	}
`;
