import styled from "styled-components";
import TocItem from "./TocItem";
import Recommend from "./Recommend";
import { DetailDataProps } from "@/types/dataProps";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/user";
import { useEffect, useRef, useState } from "react";

interface ContentsProps {
	detailData: DetailDataProps;
	thumbnails: string[];
	handleTocItemClick: (starTime: number) => void;
}

const Contents = ({ detailData, thumbnails, handleTocItemClick }: ContentsProps) => {
	const user = useRecoilValue(userState);
	const [tocItemHeight, setTocItemHeight] = useState(0);
	const tocItemsRef = useRef<HTMLDivElement | null>(null);

	const hasDimmedItem = detailData.summary_data.section.some((_, index) => index >= 3 && user.name === "");

	useEffect(() => {
		const calculateHeight = () => {
			if (tocItemsRef.current) setTocItemHeight(tocItemsRef.current.clientHeight);
		};

		calculateHeight();
	}, [tocItemsRef, detailData, thumbnails]);

	return (
		<>
			<ContentWrapper>
				{detailData.summary_data.section
					.slice(0, user.name === "" ? 4 : detailData.summary_data.section.length)
					.map(({ title, start_time, detail_contents, explanation_keyword, explanation_description }, index) => (
						<TocItem
							key={index}
							ref={index === (user.name === "" ? 3 : detailData.summary_data.section.length - 1) ? tocItemsRef : null}
							title={title}
							start={Math.floor(Number(start_time))}
							summary={detail_contents}
							thumbnails={thumbnails[index]}
							explanation_keyword={explanation_keyword}
							explanation_description={explanation_description}
							partialDimmed={index === 2 && user.name === ""}
							dimmed={index >= 3 && user.name === ""}
							tocItemHeight={tocItemHeight}
							toc={detailData.summary_data.section}
							onClick={() => handleTocItemClick(Math.floor(Number(start_time)))}
						/>
					))}
			</ContentWrapper>
			<RecommendWrapper $hasDimmedItem={hasDimmedItem} $tocItemHeight={tocItemHeight}>
				<Recommend detailData={detailData} />
			</RecommendWrapper>
		</>
	);
};

export default Contents;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 20px;
`;

const RecommendWrapper = styled.div<{ $hasDimmedItem: boolean; $tocItemHeight: number }>`
	margin-top: ${(props) => (props.$hasDimmedItem ? `0px` : "60px")};
`;
