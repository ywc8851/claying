import styled from "styled-components";
import TocItem from "./TocItem";
import Recommend from "./Recommend";
import { DataProps } from "@/types/dataProps";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/user";
import { useEffect, useRef, useState } from "react";

interface ContentsProps {
	detailData: DataProps;
	handleTocItemClick: (starTime: number) => void;
}

const Contents = ({ detailData, handleTocItemClick }: ContentsProps) => {
	const user = useRecoilValue(userState);
	const [tocItemHeight, setTocItemHeight] = useState(0);
	const tocItemsRef = useRef<HTMLDivElement | null>(null);

	const hasDimmedItem = detailData.template_summary.some((_, index) => index >= 3 && user.name === "");

	useEffect(() => {
		const calculateHeight = () => {
			if (tocItemsRef.current) setTocItemHeight(tocItemsRef.current.clientHeight);
		};

		calculateHeight();
	}, [detailData.template_summary]);

	return (
		<>
			<ContentWrapper hasDimmedItem={hasDimmedItem}>
				{detailData.template_summary.map(({ title, start_time, detail_contents }, index) => (
					<TocItem
						key={index}
						ref={index === 3 ? tocItemsRef : null}
						title={title}
						start={Math.floor(Number(start_time))}
						summary={detail_contents}
						dimmed={index >= 3 && user.name === ""}
						onClick={() => handleTocItemClick(Math.floor(Number(start_time)))}
					/>
				))}
			</ContentWrapper>
			<RecommendWrapper hasDimmedItem={hasDimmedItem} tocItemHeight={tocItemHeight}>
				<Recommend detailData={detailData} />
			</RecommendWrapper>
		</>
	);
};

export default Contents;

const ContentWrapper = styled.div<{ hasDimmedItem: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 20px;
`;

const RecommendWrapper = styled.div<{ hasDimmedItem: boolean; tocItemHeight: number }>`
	margin-top: ${(props) => (props.hasDimmedItem ? `${531 - props.tocItemHeight}px` : "0")};
`;
