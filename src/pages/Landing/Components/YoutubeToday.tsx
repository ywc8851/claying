import { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import TopicCard from "./TopicCard";
import { DataProps } from "@/types/dataProps";
import TodayIcon from "@/assets/today.svg?react";
import InfoIcon from "@/assets/info.svg?react";
import { YOUTUBE_TOPICS } from "@/constants/topic";

const TODAY_TITLE = "유투브 투데이";

interface YoutubeTodayProps {
	data: DataProps[];
}

const YoutubeToday = ({ data }: YoutubeTodayProps) => {
	const [timeLeft, setTimeLeft] = useState<string>("");
	const [selectedTopic, setSelectedTopic] = useState<string>("전체");
	const [sortCriteria, setSortCriteria] = useState("engagement");
	const [isFixed, setIsFixed] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	const formatToTwoDigits = (time: number): string => time.toString().padStart(2, "0");

	const calcuateTimeLeft = (): string => {
		const now = new Date();
		const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0, 0);
		const diff = tomorrow.getTime() - now.getTime();
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const seconds = Math.floor((diff / 1000) % 60);

		return `${formatToTwoDigits(hours)}:${formatToTwoDigits(minutes)}:${formatToTwoDigits(seconds)}`;
	};

	const handleTopicClick = (topic: string) => {
		setSelectedTopic(topic);
	};

	const handleSortClick = (criteria: string) => {
		setSortCriteria(criteria);
	};

	const filteredAndSortedData = useMemo(() => {
		const filteredData = data.filter((item) => selectedTopic === "전체" || item.section === selectedTopic);
		const sortedData = filteredData.sort((a, b) => {
			if (sortCriteria === "engagement") {
				return b.engagement_score - a.engagement_score;
			} else {
				return b.views - a.views;
			}
		});
		return sortedData;
	}, [data, selectedTopic, sortCriteria]);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calcuateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

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
		<Container>
			<TodayTitle>
				<TodayIcon />
				{TODAY_TITLE}
			</TodayTitle>
			<TimeWarning>이 시간이 지나면 읽을 수 없습니다.</TimeWarning>
			<Time ref={scrollRef}>{timeLeft}</Time>
			<TopicNav $isFixed={isFixed}>
				{YOUTUBE_TOPICS.map(({ topic, icon }) => {
					return (
						<Topic key={topic} onClick={() => handleTopicClick(topic)}>
							<IconBox selected={selectedTopic === topic}>{icon}</IconBox>
							{topic === "뷰티/메이크업" ? (
								<span>
									뷰티/ <br /> 메이크업
								</span>
							) : (
								<span>{topic}</span>
							)}
						</Topic>
					);
				})}
			</TopicNav>
			<SortOptions $isFixed={isFixed}>
				<div>
					<OptionBtn selected={sortCriteria === "engagement"} onClick={() => handleSortClick("engagement")}>
						참여도
					</OptionBtn>
					<OptionBtn selected={sortCriteria === "views"} onClick={() => handleSortClick("views")}>
						조회수
					</OptionBtn>
				</div>
				<InfoIcon />
			</SortOptions>
			{filteredAndSortedData.map((item, index) => {
				const topicIcon = YOUTUBE_TOPICS.find((topic) => topic.topic === item.section)?.icon;
				return <TopicCard key={index} icon={topicIcon} {...item} />;
			})}
		</Container>
	);
};

export default YoutubeToday;

const Container = styled.div`
	width: 100%;
	background-color: rgba(242, 242, 242, 1);
	padding: 25px 20px;
	display: flex;
	flex-direction: column;
	margin-top: 36px;
`;

const TodayTitle = styled.span`
	font-size: 24px;
	font-weight: 800;
	line-height: 28.64px;
	color: rgba(0, 123, 255, 1);
	letter-spacing: -1px;
	margin-bottom: 24px;

	display: flex;
	align-items: center;
	gap: 12px;
`;

const TimeWarning = styled.span`
	font-size: 14px;
	font-weight: 400;
	line-height: 16.71px;
	margin-bottom: 20px;
`;

const Time = styled.span`
	font-size: 32px;
	font-weight: 500;
	line-height: 16px;
	text-align: left;
	padding-bottom: 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 1);
`;

const TopicNav = styled.div<{ $isFixed: boolean }>`
	width: calc(100% + 20px);
	width: 100%;
	display: flex;
	gap: 12px;
	padding-top: 12px;
	margin-bottom: 5px;
	overflow-x: scroll;

	position: ${(props) => (props.$isFixed ? "fixed" : "static")};
	top: ${(props) => (props.$isFixed ? "52px" : "auto")};
	left: ${(props) => (props.$isFixed ? "0" : "auto")};
	z-index: ${(props) => (props.$isFixed ? 10000 : 0)};

	background-color: rgba(242, 242, 242, 1);
	// 스크롤 UI 제거
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;

const Topic = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;

	span {
		font-size: 12px;
		font-weight: 500;
		line-height: 15px;

		display: inline-block;
		text-align: center;
		width: 46px;
	}
`;

const IconBox = styled.div<{ selected: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 44px;
	height: 44px;
	border-radius: 50%;

	background-color: ${(props) => (props.selected ? "#30D5C8" : "#D9D9D9")};
	/* color: ${(props) => (props.selected ? "#ffffff" : "#333333")}; */
`;

const SortOptions = styled.div<{ $isFixed: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
	margin-top: ${(props) => (props.$isFixed ? "188px" : "0px")};

	div {
		display: flex;
		gap: 4px;
	}
`;

const OptionBtn = styled.button<{ selected: boolean }>`
	width: 54px;
	height: 28px;
	border-radius: 4px;
	background-color: ${(props) => (props.selected ? "#FFFFFF" : "transparent")};

	font-family: var(--font-Pretendard);
	font-size: 12px;
	font-weight: 500;
	line-height: 14.52px;
	color: ${(props) => (props.selected ? "#000000E7" : "#7E7E7E")};
`;
