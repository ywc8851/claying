import styled from "styled-components";
import LogoHeader from "./../Landing/Components/LogoHeader";
import TocItem from "./Components/TocItem";
import YoutubeIframe from "./Components/YoutubeIframe";
import { useState } from "react";

const MOCK_DATA = [
	{
		seq: 1,
		start: 0,
		end: 180,
		summary: "목차 1에 대한 요약입니다. 목차 1에 대한 요약입니다. 목차 1에 대한 요약입니다. 목차 1에 대한 요약입니다.",
	},
	{
		seq: 2,
		start: 181,
		end: 360,
		summary: "목차 2에 대한 요약입니다. 목차 2에 대한 요약입니다. 목차 2에 대한 요약입니다. 목차 2에 대한 요약입니다.",
	},
	{
		seq: 3,
		start: 361,
		end: 400,
		summary: "목차 3에 대한 요약입니다. 목차 3에 대한 요약입니다. 목차 3에 대한 요약입니다. 목차 3에 대한 요약입니다.",
	},
];

const index = () => {
	const [seekTo, setSeekTo] = useState<(num: number) => void>(() => () => {});

	const handleChapterClick = (num: number) => {
		seekTo(num);
	};

	return (
		<Container>
			<LogoHeader />
			<PageInfo>
				<Category>주식</Category>
				<Title>변화의 흐름 미래를 준비하는 법</Title>
				<Upload>2024-04-27 09:32 업로드</Upload>
			</PageInfo>
			<YoutubeIframe onSeekToChange={setSeekTo} />
			<TOC>
				<div>목차</div>
				<div>
					{MOCK_DATA.map(({ seq }) => {
						return <span key={seq}>목차 {seq}</span>;
					})}
				</div>
			</TOC>
			<Contents>
				{MOCK_DATA.map(({ seq, start, end, summary }) => {
					return <TocItem key={seq} seq={seq} start={start} end={end} summary={summary} onClick={handleChapterClick} />;
				})}
			</Contents>
		</Container>
	);
};

export default index;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	font-family: "Pretendard Variable";
	padding-top: 76px;
`;

const PageInfo = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 20px;
	margin-bottom: 16px;
`;

const Category = styled.span`
	font-size: 16px;
	font-weight: 600;
	line-height: 19.09px;
	color: rgba(48, 213, 200, 1);
	margin-bottom: 12px;
`;

const Title = styled.span`
	font-size: 20px;
	font-weight: 800;
	line-height: 24px;
	margin-bottom: 4px;
`;

const Upload = styled.span`
	font-size: 12px;
	font-weight: 400;
	line-height: 14.4px;
`;

const TOC = styled.div`
	margin-top: 30px;
	padding: 0 20px;

	div:first-child {
		height: 44px;
		padding: 10px 16px 10px 16px;
		background-color: rgba(0, 0, 0, 1);
		font-size: 20px;
		font-weight: 800;
		line-height: 24px;
		color: rgba(255, 255, 255, 1);
	}

	div:nth-child(2) {
		padding: 12px 16px 12px 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		background-color: rgba(242, 242, 242, 1);
		font-size: 16px;
		font-weight: 600;
		line-height: 19.09px;
	}
`;

const Contents = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
