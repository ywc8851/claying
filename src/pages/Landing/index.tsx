import { styled } from "styled-components";
import ServiceIntroduce from "./Components/ServiceIntroduce";
import LogoHeader from "./Components/LogoHeader";
import YoutubeToday from "./Components/YoutubeToday";
import Footer from "./Components/Footer";
const index = () => {
	return (
		<Container>
			<LogoHeader />
			<ServiceIntroduce />
			<GoogleLoginBtn>구글 계정 연동해서 무료 구독하기</GoogleLoginBtn>
			<YoutubeToday />
			<Footer />
		</Container>
	);
};

export default index;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Pretendard Variable";
	padding-top: 76px;
`;

const GoogleLoginBtn = styled.button`
	width: 320px;
	height: 60px;
	border-radius: 4px;
	background-color: rgba(0, 123, 255, 1);
	margin-bottom: 36px;

	font-family: inherit;
	font-size: 16px;
	font-weight: 700;
	line-height: 22px;
	text-align: center;
	color: rgba(255, 255, 255, 1);
`;
