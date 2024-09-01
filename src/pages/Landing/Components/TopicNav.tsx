import styled from "styled-components";
import { isDesktop } from "react-device-detect";
import { YOUTUBE_TOPICS } from "@/constants/topic";

interface TopicNavProps {
	$isFixed: boolean;
	selectedTopic: string;
	handleTopicClick: (topic: string) => void;
}

const TopicNav = ({ $isFixed, selectedTopic, handleTopicClick }: TopicNavProps) => {
	const navSize = Math.ceil(YOUTUBE_TOPICS.length / 3);

	const topicGroups = [
		YOUTUBE_TOPICS.slice(0, navSize),
		YOUTUBE_TOPICS.slice(navSize, navSize * 2),
		YOUTUBE_TOPICS.slice(navSize * 2, YOUTUBE_TOPICS.length),
	];

	return (
		<Container $isFixed={$isFixed} $isDesktop={isDesktop}>
			{topicGroups.map((chunk, index) => (
				<Column key={index}>
					{chunk.map(({ topic, icon }) => (
						<Topic key={topic} onClick={() => handleTopicClick(topic)} selected={selectedTopic === topic}>
							{icon}
							<span>{topic}</span>
						</Topic>
					))}
				</Column>
			))}
		</Container>
	);
};

export default TopicNav;

const Container = styled.div<{ $isFixed: boolean; $isDesktop: boolean }>`
	width: calc(100% + 20px);
	max-width: ${({ $isDesktop }) => ($isDesktop ? "400px" : "none")};
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 12px 0;
	margin-bottom: 12px;
	background-color: rgba(242, 242, 242, 1);

	padding-right: ${(props) => (props.$isFixed ? "50px" : "auto")};
	position: ${(props) => (props.$isFixed ? "fixed" : "static")};
	top: ${(props) => (props.$isFixed ? "52px" : "auto")};
	z-index: ${(props) => (props.$isFixed ? 10000 : 0)};

	overflow-x: scroll;
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;

const Column = styled.div`
	display: flex;
	gap: 12px;
`;

const Topic = styled.div<{ selected: boolean }>`
	width: auto;
	height: 32px;
	display: flex;
	align-items: center;
	padding: 6px 12px;
	gap: 6px;
	border-radius: 12px;
	border: 1px solid rgba(0, 0, 0, 1);
	background-color: ${(props) => (props.selected ? "#30D5C8" : "#D9D9D9")};

	span {
		font-family: var(--font-Pretendard);
		font-size: 12px;
		font-weight: 400;
		line-height: 14.32px;
		white-space: nowrap;
		/* display: inline-block; */
		text-align: center;
		/* width: 46px; */
	}
`;
