import { useState, useEffect } from "react";
import styled from "styled-components";
import TopicCard from "./TopicCard";
import { DataProps } from "@/types/dataProps";

const TODAY_TITLE = "유투브 투데이";
const YOUTUBE_TOPICS = [
	"전체",
	"주식",
	"부동산",
	"가상자산",
	"경제",
	"정치",
	"과학",
	"IT/테크",
	"자동차",
	"건강",
	"자기계발",
	"요리",
	"연애/결혼",
	"패션",
	"뷰티/메이크업",
];

interface YoutubeTodayProps {
	data: DataProps[];
}

const YoutubeToday = ({ data }: YoutubeTodayProps) => {
	const [timeLeft, setTimeLeft] = useState<string>("");
	const [selectedTopic, setSelectedTopic] = useState<string>("전체");

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

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calcuateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<Container>
			<TodayTitle>{TODAY_TITLE}</TodayTitle>
			<TimeWarning>이 시간이 지나면 읽을 수 없습니다.</TimeWarning>
			<Time>{timeLeft}</Time>
			<TopicNav>
				{YOUTUBE_TOPICS.map((topic) => {
					return (
						<Topic key={topic} onClick={() => handleTopicClick(topic)} selected={selectedTopic === topic}>
							<Circle></Circle>
							<span>{topic}</span>
						</Topic>
					);
				})}
			</TopicNav>
			{data
				.filter((item) => selectedTopic === "전체" || item.section === selectedTopic)
				.map((item, index) => (
					<TopicCard key={index} {...item} />
				))}
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
	margin-bottom: 12px;
	border-bottom: 1px solid rgba(0, 0, 0, 1);
`;

const TopicNav = styled.div`
	height: 64px;
	width: calc(100% + 20px);
	display: flex;
	gap: 12px;
	margin-bottom: 24px;
	overflow-x: scroll;

	// 스크롤 UI 제거
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;

const Topic = styled.div<{ selected: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;

	span {
		font-size: 10px;
		font-weight: 500;
		line-height: 15px;
	}

	background-color: ${(props) => (props.selected ? "#333333" : "transparent")};
	color: ${(props) => (props.selected ? "#ffffff" : "#333333")};
`;

const Circle = styled.div`
	width: 40px;
	height: 40px;
	background-color: blue;
	border-radius: 50%;
`;
