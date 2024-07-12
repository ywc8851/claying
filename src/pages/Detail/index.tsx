import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import LogoHeader from "./../Landing/Components/LogoHeader";
import YouTube, { YouTubeProps } from "react-youtube";
import TocItem from "./Components/TocItem";
import { useRecoilValue } from "recoil";
import { detailDataState } from "@/store/detailData";
import { DataProps } from "@/types/dataProps";

const index = () => {
	const detailData = useRecoilValue<DataProps>(detailDataState);
	const [videoPlayer, setVideoPlayer] = useState<any>(null);
	const [isFixed, setIsFixed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const scrollRef = useRef<HTMLDivElement>(null);
	const videoContainerRef = useRef<HTMLDivElement>(null);

	const onPlayerReady: YouTubeProps["onReady"] = (event) => {
		setVideoPlayer(event.target);
		event.target.pauseVideo();
		setIsLoading(false);
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
		setIsLoading(true);

		console.log(detailData.template_summary);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Container $isFixed={isFixed}>
			<LogoHeader title={isFixed ? detailData.title : ""} />
			<PageInfo ref={scrollRef}>
				<Category>{detailData.section}</Category>
				<Title>{detailData.title}</Title>
				<Upload>{detailData.upload_date} 업로드</Upload>
			</PageInfo>
			<VideoContainer ref={videoContainerRef} $isFixed={isFixed}>
				{isLoading && <Loader />}
				<YouTube
					videoId={detailData.id}
					opts={opts}
					onReady={onPlayerReady}
					onStateChange={onPlayerStateChange}
					style={{ display: isLoading ? "none" : "block" }}
				/>
			</VideoContainer>
			<TOC>
				<div>목차</div>
				<div>
					{detailData.template_summary.map((_, index) => {
						return <span key={index}>목차 {index + 1}</span>;
					})}
				</div>
			</TOC>
			<Contents>
				{detailData.template_summary.map(({ start_time, end_time, contents }, index) => {
					return (
						<TocItem
							key={index}
							seq={index + 1}
							start={Math.floor(Number(start_time))}
							end={Math.floor(Number(end_time))}
							summary={contents}
							onClick={() => handleTocItemClick(Math.floor(Number(start_time)))}
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

	/* padding-top: ${(props) => (props.$isFixed ? "224px" : "76px")}; */
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

const VideoContainer = styled.div<{ $isFixed: boolean }>`
	position: ${(props) => (props.$isFixed ? "fixed" : "static")};
	top: ${(props) => (props.$isFixed ? "52px" : "auto")};
	left: ${(props) => (props.$isFixed ? "0" : "auto")};
	width: 100%;
	z-index: 1000;
	display: flex;
	justify-content: center;
`;

const LoaderAnimation = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: 200px 0;
    }
`;

const Loader = styled.div`
	width: 360px;
	height: 202px;
	background: #f0f0f0;
	background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: ${LoaderAnimation} 1.5s infinite;
`;
