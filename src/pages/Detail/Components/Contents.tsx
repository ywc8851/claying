import styled from "styled-components";
import TocItem from "./TocItem";
import Recommend from "./Recommend";
import { DataProps } from "@/types/dataProps";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/user";

interface ContentsProps {
	detailData: DataProps;
	handleTocItemClick: (starTime: number) => void;
}

const Contents = ({ detailData, handleTocItemClick }: ContentsProps) => {
	const user = useRecoilValue(userState);

	const hasDimmedItem = detailData.template_summary.some((_, index) => index >= 3 && user.name === "");

	return (
		<>
			<ContentWrapper hasDimmedItem={hasDimmedItem}>
				{detailData.template_summary.map(({ headline, start_time, contents }, index) => (
					<TocItem
						key={index}
						headline={headline}
						start={Math.floor(Number(start_time))}
						summary={contents}
						dimmed={index >= 3 && user.name === ""}
						onClick={() => handleTocItemClick(Math.floor(Number(start_time)))}
					/>
				))}
			</ContentWrapper>
			<RecommendWrapper hasDimmedItem={hasDimmedItem}>
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

const RecommendWrapper = styled.div<{ hasDimmedItem: boolean }>`
	margin-top: ${(props) => (props.hasDimmedItem ? "200px" : "0")};
`;
