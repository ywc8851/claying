import { styled } from "styled-components";
import ServiceIntroduce from "./Components/ServiceIntroduce";
import LogoHeader from "./Components/LogoHeader";
import YoutubeToday from "./Components/YoutubeToday";
import Footer from "./Components/Footer";
import GoogleLoginBtn from "./Components/GoogleLoginBtn";

const index = () => {
	return (
		<Container>
			<LogoHeader />
			<ServiceIntroduce />
			<GoogleLoginBtn />
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
