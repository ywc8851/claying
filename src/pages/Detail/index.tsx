import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LogoHeader from "./../Landing/Components/LogoHeader";
import YouTube, { YouTubeProps } from "react-youtube";
import TocItem from "./Components/TocItem";

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
	{
		seq: 4,
		start: 361,
		end: 400,
		summary: "목차 4에 대한 요약입니다. 목차 3에 대한 요약입니다. 목차 3에 대한 요약입니다. 목차 3에 대한 요약입니다.",
	},
	{
		seq: 5,
		start: 361,
		end: 400,
		summary: "목차 5에 대한 요약입니다. 목차 3에 대한 요약입니다. 목차 3에 대한 요약입니다. 목차 3에 대한 요약입니다.",
	},
];

const MOCK_CATEGORY = "주식";
const MOCK_TITLE = "변화의 흐름 미래를 준비하는 법";
const MOCK_UPLOAD = "2024-04-27 09:32";

const index = () => {
	const [videoPlayer, setVideoPlayer] = useState<any>(null);
	const [isFixed, setIsFixed] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const videoContainerRef = useRef<HTMLDivElement>(null);

	const onPlayerReady: YouTubeProps["onReady"] = (event) => {
		setVideoPlayer(event.target);
		event.target.pauseVideo();
	};

	const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
		// event.data 값 => 1 재생 중, 2 일시중지, 0 종료
		if (!event.data) {
			const player = event.target;
			player.playVideo();
		}
	};

	const handleTocItemClick = (start: number) => {
		if (videoPlayer) videoPlayer.seekTo(start, true);
	};

	const opts: YouTubeProps["opts"] = {
		height: "202",
		width: "360",
		playerVars: {
			autoplay: 0,
			rel: 0,
			start: 5,
			end: 10,
			disablekb: 1,
		},
	};

	useEffect(() => {
		const handleScroll = () => {
			if (scrollRef.current) {
				const scrollRefTop = scrollRef.current.getBoundingClientRect().top;
				setIsFixed(scrollRefTop <= 0);
			}
		};

		window.addEventListener("scroll", handleScroll);

		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Container $isFixed={isFixed}>
			<LogoHeader title={isFixed ? MOCK_TITLE : ""} />
			<PageInfo ref={scrollRef}>
				<Category>{MOCK_CATEGORY}</Category>
				<Title>{MOCK_TITLE}</Title>
				<Upload>{MOCK_UPLOAD} 업로드</Upload>
			</PageInfo>
			<VideoContainer ref={videoContainerRef} isFixed={isFixed}>
				<YouTube videoId="6Af6b_wyiwI" opts={opts} onReady={onPlayerReady} onStateChange={onPlayerStateChange} />
			</VideoContainer>
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
					return (
						<TocItem
							key={seq}
							seq={seq}
							start={start}
							end={end}
							summary={summary}
							onClick={() => handleTocItemClick(start)}
						/>
					);
				})}
			</Contents>
		</Container>
	);
};

export default index;

const Container = styled.div<{ $isFixed: boolean }>`
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

const VideoContainer = styled.div<{ isFixed: boolean }>`
	position: ${(props) => (props.isFixed ? "fixed" : "static")};
	top: ${(props) => (props.isFixed ? "52px" : "auto")};
	left: ${(props) => (props.isFixed ? "0" : "auto")};
	width: 100%;
	z-index: 1000;
	display: flex;
	justify-content: center;
`;
