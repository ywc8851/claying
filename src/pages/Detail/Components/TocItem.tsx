import styled from "styled-components";
import PlayIcon from "@/assets/play.svg?react";

interface TocItemProps {
	seq: number;
	start: number;
	end: number;
	summary: string;
	onClick: () => void;
}

const TocItem = ({ seq, start, end, summary, onClick }: TocItemProps) => {
	const formatMinutesToTime = (minutes: number): string => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		const formattedHours = hours.toString().padStart(2, "0");
		const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
		return `${formattedHours}:${formattedMinutes}`;
	};

	const formatTimeRange = (startMinutes: number, endMinutes: number): string => {
		const startTime = formatMinutesToTime(startMinutes);
		const endTime = formatMinutesToTime(endMinutes);
		return `${startTime} - ${endTime}`;
	};

	return (
		<Container>
			<Title>목차 {seq}</Title>
			<Thumbnail>
				<PlayIcon onClick={onClick} />
			</Thumbnail>
			<Timeline>
				<PlayIcon width={16} height={16} />
				<span>{formatTimeRange(start, end)}</span>
			</Timeline>
			<Summary>{summary}</Summary>
		</Container>
	);
};

export default TocItem;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: calc(100% - 40px);
	margin-top: 24px;
`;

const Title = styled.span`
	font-size: 20px;
	font-weight: 600;
	line-height: 23.87px;
`;

const Thumbnail = styled.div`
	width: 317px;
	height: 155px;
	padding: 42px 0px 41px 0px;
	background: rgba(217, 217, 217, 1);
	margin-top: 12px;
	margin-bottom: 8px;
	display: flex;
	justify-content: center;
`;

const Timeline = styled.div`
	display: flex;
	align-items: center;
	height: 18px;
	gap: 12px;
	margin-bottom: 24px;

	span {
		font-size: 14px;
		font-weight: 500;
		line-height: 16.71px;
	}
`;

const Summary = styled.div`
	font-size: 16px;
	font-weight: 500;
	line-height: 24px;
	letter-spacing: -0.02em;
	text-align: left;
`;
