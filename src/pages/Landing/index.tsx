import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import axios from "axios";
import ServiceIntroduce from "./Components/ServiceIntroduce";
import LogoHeader from "@/components/LogoHeader";
import YoutubeToday from "./Components/YoutubeToday";
import Footer from "./Components/Footer";
import { dataState } from "@/store/data";
import { userState } from "@/store/user";
import GoogleLogin from "@/components/GoogleLogin";

const STOCK_API_URL = "https://claying.shop/briefing/top_videos/stock";
const EXCEPT_STOCK_API_URL = "https://claying.shop/briefing/top_videos";

const index = () => {
	const setApiData = useSetRecoilState(dataState);
	const apiData = useRecoilValue(dataState);
	const user = useRecoilValue(userState);

	useEffect(() => {
		const getData = async () => {
			try {
				const [response1, response2] = await Promise.all([axios.get(EXCEPT_STOCK_API_URL), axios.get(STOCK_API_URL)]);
				const combinedData = [...response1.data, ...response2.data];
				setApiData(combinedData);
			} catch (error) {
				console.error("API 에러가 발생하였습니다 :", error);
			}
		};

		getData();
	}, [setApiData]);

	return (
		<Container $isLogin={user.name !== ""}>
			<LogoHeader />
			{user.name === "" && (
				<>
					<ServiceIntroduce />
					<GoogleLogin variant="button" text="구글 계정 연동해서 무료 구독하기" />
				</>
			)}
			<YoutubeToday data={apiData} />
			<Footer />
		</Container>
	);
};

export default index;

const Container = styled.div<{ $isLogin: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Pretendard Variable";
	padding-top: ${(props) => (props.$isLogin ? "16px" : "76px")};

	&::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none;
	scrollbar-width: none;
	overflow-y: scroll;
`;
