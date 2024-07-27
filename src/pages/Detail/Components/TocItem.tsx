import styled from "styled-components";
import PlayIcon from "@/assets/play.svg?react";
import { formatTimeRange } from "@/utils/formatter";
import DimmedArea from "./DimmedArea";
import { forwardRef } from "react";

interface TocItemProps {
	title: string;
	start: number;
	summary: string;
	dimmed?: boolean;
	onClick: () => void;
}

const TocItem = forwardRef<HTMLDivElement, TocItemProps>(({ title, start, summary, dimmed, onClick }, ref) => {
	return (
		<Container ref={ref}>
			<ContentWrapper dimmed={dimmed}>
				<Title>{title}</Title>
				<Thumbnail>
					<PlayIcon onClick={onClick} />
				</Thumbnail>
				<Timeline>
					<PlayIcon width={16} height={16} />
					<span>{formatTimeRange(start)}</span>
				</Timeline>
				<Summary>{summary}</Summary>
			</ContentWrapper>
			{dimmed && <DimmedArea />}
		</Container>
	);
});

export default TocItem;

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin-top: 24px;
`;

const ContentWrapper = styled.div<{ dimmed?: boolean }>`
	opacity: ${(props) => (props.dimmed ? 0.8 : 1)};
`;

const Title = styled.span`
	font-size: 24px;
	font-weight: 600;
	line-height: 23.87px;
`;

const Thumbnail = styled.div`
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
	font-size: 18px;
	font-weight: 400;
	line-height: 168%;
	letter-spacing: -0.02em;
`;
