import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";
import InfoIcon from "@/assets/info.svg?react";
import { DataProps } from "@/types/dataProps";
import { useRecoilValue } from "recoil";
import { dataState } from "@/store/data";
import { YOUTUBE_TOPICS } from "@/constants/topic";
import RecommendCard from "./RecommendCard";

const TOOLTIP_OPTION1 =
	"조회수 대비 참여도(좋아요, 댓글 수 등)가 높은 순으로 오늘 업로드된 최대 3개의 영상이 각 주제 별로 노출됩니다.";
const TOOLTIP_OPTION2 = "조회수가 높은 순으로 오늘 업로드된 최대 3개의 영상이 각 주제 별로 노출됩니다.";

interface RecommendProps {
	detailData: DataProps;
}

const Recommend = ({ detailData }: RecommendProps) => {
	const RECOMMEND_TITLE = `👇 다음&nbsp;<span class='highlight'>${detailData.section}</span>&nbsp;유튜브 아티클 확인하기`;
	const [sortCriteria, setSortCriteria] = useState("engagement");
	const [tooltipVisible, setTooltipVisible] = useState(false);
	const infoIconRef = useRef<HTMLDivElement>(null);
	const apiData = useRecoilValue<DataProps[]>(dataState);

	const handleSortClick = (criteria: string) => {
		setSortCriteria(criteria);
	};

	const handleClickIcon = (e: React.MouseEvent) => {
		e.stopPropagation();
		setTooltipVisible(!tooltipVisible);
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (infoIconRef.current && !infoIconRef.current.contains(e.target as Node)) {
			setTooltipVisible(false);
		}
	};

	const filteredAndSortedData = useMemo(() => {
		const filteredData = apiData.filter((item) => item.section === detailData.section && item.id !== detailData.id);
		const sortedData = filteredData.sort((a, b) => {
			if (sortCriteria === "engagement") {
				return b.engagement_score - a.engagement_score;
			} else {
				return b.views - a.views;
			}
		});
		return sortedData;
	}, [apiData, sortCriteria]);

	useEffect(() => {
		if (tooltipVisible) document.addEventListener("click", handleClickOutside);
		else document.removeEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [tooltipVisible]);

	return (
		<Container>
			<RecommendTitle dangerouslySetInnerHTML={{ __html: RECOMMEND_TITLE }} />
			<SortOptions>
				<div>
					<OptionBtn selected={sortCriteria === "engagement"} onClick={() => handleSortClick("engagement")}>
						참여도
					</OptionBtn>
					<OptionBtn selected={sortCriteria === "views"} onClick={() => handleSortClick("views")}>
						조회수
					</OptionBtn>
				</div>
				<TooltipSection ref={infoIconRef}>
					<InfoIcon onClick={handleClickIcon} />
					{tooltipVisible && (
						<Tooltip $tooltipVisible={tooltipVisible}>
							<span>{sortCriteria === "engagement" ? TOOLTIP_OPTION1 : TOOLTIP_OPTION2}</span>
						</Tooltip>
					)}
				</TooltipSection>
			</SortOptions>
			{filteredAndSortedData.map((item, index) => {
				const topicIcon = YOUTUBE_TOPICS.find((topic) => topic.topic === item.section)?.icon;
				return <RecommendCard key={index} icon={topicIcon} {...item} />;
			})}
		</Container>
	);
};

export default Recommend;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 20px;
`;

const RecommendTitle = styled.span`
	display: flex;
	align-items: center;
	font-size: 16px;
	font-weight: 400;
	margin-bottom: 16px;

	.highlight {
		font-weight: 600;
		color: rgba(48, 213, 200, 1);
	}
`;

const SortOptions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;

	div {
		display: flex;
		gap: 4px;
	}
`;

const TooltipSection = styled.div`
	position: relative;
	cursor: pointer;
`;

const Tooltip = styled.div<{ $tooltipVisible: boolean }>`
	position: absolute;
	right: 0;
	top: 20px;
	background-color: #555555;
	color: #fff;
	z-index: 1000;
	display: ${(props) => (props.$tooltipVisible ? "block" : "none")};

	width: 135px;
	padding: 8px 13px;
	border-radius: 12px;

	span {
		font-size: 8px;
		font-weight: 500;
		line-height: 9.68px;
	}
`;

const OptionBtn = styled.button<{ selected: boolean }>`
	width: 54px;
	height: 28px;
	border-radius: 4px;
	background-color: #ffffff;

	font-family: var(--font-Pretendard);
	font-size: 12px;
	font-weight: 500;
	line-height: 14.52px;

	/* background-color: ${(props) => (props.selected ? "#FFFFFF" : "transparent")}; */
	color: ${(props) => (props.selected ? "rgba(0, 0, 0, 0.9059)" : "rgba(126, 126, 126, 1)")};
	border: ${(props) => (props.selected ? "1px solid rgba(0, 0, 0, 1)" : "none")};
`;
