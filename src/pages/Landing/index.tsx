import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import axios from "axios";
import ServiceIntroduce from "./Components/ServiceIntroduce";
import LogoHeader from "./Components/LogoHeader";
import YoutubeToday from "./Components/YoutubeToday";
import Footer from "./Components/Footer";
import GoogleLoginBtn from "./Components/GoogleLoginBtn";
import { dataState } from "@/store/data";

const index = () => {
	const setApiData = useSetRecoilState(dataState);
	const apiData = useRecoilValue(dataState);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get("https://uncrapi.link/briefing/top_videos/");
				setApiData(response.data);
				console.log(response.data[0]);
			} catch (error) {
				console.error("Error fetching top videos:", error);
			}
		};

		getData();
	}, [setApiData]);

	return (
		<Container>
			<LogoHeader />
			<ServiceIntroduce />
			<GoogleLoginBtn />
			<YoutubeToday data={apiData} />
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
