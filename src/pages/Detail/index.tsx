import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";
import { Helmet } from "react-helmet";
import { isDesktop } from "react-device-detect";
import LogoHeader from "@/components/LogoHeader";
import Contents from "./Components/Contents";
import { DataProps } from "@/types/dataProps";
import { formatSummary } from "@/utils/formatter";
import { base64ToBlobUrl } from "@/utils/base64";
import { playerState } from "@/store/player";
import NotFoundPage from "./NotFound";

const index = () => {
	const { id } = useParams();
	const [detailData, setDetailData] = useState<DataProps | null>(null);
	const [thumbnails, setThumbnails] = useState<string[]>([]);
	const [videoPlayer, setVideoPlayer] = useState<any>(null);
	const [isFixed, setIsFixed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [is404, setIs404] = useState(false);
	const isPlayerVisible = useRecoilValue(playerState);
	const scrollRef = useRef<HTMLDivElement>(null);
	const videoContainerRef = useRef<HTMLDivElement>(null);

	const onPlayerReady: YouTubeProps["onReady"] = (event) => {
		setVideoPlayer(event.target);
		setIsLoading(false);
	};

	const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
		if (!event.data) {
			const player = event.target;
			player.playVideo();
		}
	};

	const handleTocItemClick = (start: number) => {
		if (!isPlayerVisible) return;

		if (videoPlayer) videoPlayer.seekTo(start, true);
	};

	const opts: YouTubeProps["opts"] = {
		height: "202",
		playerVars: {
			autoplay: 1,
			rel: 0,
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

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const fetchThumbnails = async () => {
			try {
				const response = await fetch(`https://claying.shop/briefing/capture_frames/${id}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data: { filename: string; content: string }[] = await response.json();
				// 목차 순 정렬
				const sortedFiles = data.sort((a, b) => {
					const numA = parseInt(a.filename.match(/\d+/)?.[0] || "0", 10);
					const numB = parseInt(b.filename.match(/\d+/)?.[0] || "0", 10);

					return numA - numB;
				});
				if (Array.isArray(sortedFiles) && sortedFiles.length > 0) {
					const urls = sortedFiles.map(({ content }) => base64ToBlobUrl(content));
					setThumbnails(urls);
				}
			} catch (error) {
				console.error("Error fetching thumbnails:", error);
			}
		};

		const fetchData = async () => {
			try {
				const response = await fetch(`https://claying.shop/briefing/top_videos/${id}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setDetailData(data[0]);
			} catch (error) {
				setIs404(true);
				console.error("Error fetching the data:", error);
			}
		};

		fetchData();
		fetchThumbnails();
	}, [id]);

	if (is404) {
		return <NotFoundPage />;
	}

	return (
		<Container $isFixed={isFixed}>
			{detailData && (
				<Helmet>
					<title>{detailData.title}</title>
					<meta property="og:title" content={detailData.title} />
					<meta property="og:description" content={detailData.short_summary} />
					<meta property="og:image" content={detailData.thumbnail} />
				</Helmet>
			)}
			{detailData && (
				<>
					<LogoHeader title={isFixed ? `${detailData.headline_title}, ${detailData.headline_subtitle}` : ""} />
					<PageInfo ref={scrollRef}>
						<Category>{detailData.section}</Category>
						<Title>
							{detailData.headline_title},
							<br />
							{detailData.headline_subtitle}
						</Title>
						<Upload>{detailData.upload_date} 업로드</Upload>
					</PageInfo>
					{isPlayerVisible && (
						<VideoContainer ref={videoContainerRef} $isFixed={isFixed} $isDesktop={isDesktop}>
							{isLoading && <Loader />}
							<YouTube
								videoId={id}
								opts={opts}
								onReady={onPlayerReady}
								onStateChange={onPlayerStateChange}
								style={{ display: isLoading ? "none" : "block" }}
							/>
						</VideoContainer>
					)}

					<Preview $isFixed={isFixed}>
						<div>
							<span>🔎 미리보기</span>
							{formatSummary(detailData.short_summary)}
						</div>
					</Preview>
					<TOC>
						<div>목차</div>
						<div>
							{detailData.template_summary.map(({ title }, index) => {
								return <span key={index}>{title} </span>;
							})}
						</div>
					</TOC>
					<Contents detailData={detailData} thumbnails={thumbnails} handleTocItemClick={handleTocItemClick} />
				</>
			)}
		</Container>
	);
};

export default index;

const Container = styled.div<{ $isFixed: boolean }>`
	display: flex;
	flex-direction: column;
	font-family: "Pretendard Variable";
	padding-top: 76px;
	background-color: white;
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

const Preview = styled.div<{ $isFixed: boolean }>`
	padding: 20px;
	margin-top: ${(props) => (props.$isFixed ? "176px" : "28px")};

	div {
		display: flex;
		flex-direction: column;
		background-color: #f2f2f2;
		padding: 20px;
		gap: 12px;
	}

	span {
		display: block;
		font-family: "Pretendard Variable";
		font-size: 16px;
	}

	span:first-child {
		font-weight: 600;
	}

	span.line-break {
		font-weight: 400;
		line-height: 160%;
		margin-bottom: 8px;
	}
`;

const TOC = styled.div`
	margin-top: 24px;
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
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		background-color: rgba(242, 242, 242, 1);
		font-size: 18px;
		font-weight: 600;
		line-height: 19.09px;
	}
`;

const VideoContainer = styled.div<{ $isFixed: boolean; $isDesktop: boolean }>`
	position: ${(props) => (props.$isFixed ? "fixed" : "static")};
	top: ${(props) => (props.$isFixed ? "52px" : "auto")};
	z-index: 1000;
	display: flex;

	div {
		width: 100vw;

		iframe {
			width: 100vw;
			max-width: ${({ $isDesktop }) => ($isDesktop ? "420px" : "none")};
		}
	}
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
