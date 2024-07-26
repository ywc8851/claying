import styled from "styled-components";
import GoogleLoginBtn from "../../Landing/Components/GoogleLoginBtn";
import { TOPIC_TAGS } from "@/constants/topic";
import InfoIcon from "@/assets/subInfo.svg?react";
import GoogleLoginLink from "./GoogleLoginLink";

const DIMMED_TITLE =
	"지금 바로 무료 구독하고 <br/> 19개의 주요 분야의 영상을 <br/> <span class='highlight'>매일 읽어보세요.</span>";

const DimmedArea = () => {
	return (
		<Container>
			<ServiceTitle dangerouslySetInnerHTML={{ __html: DIMMED_TITLE }} />
			<TopicTags>
				{TOPIC_TAGS.map((topic) => {
					return <TopicTag key={topic}>{topic}</TopicTag>;
				})}
			</TopicTags>
			<GoogleLoginBtn />
			<Info>
				<span>
					<InfoIcon /> 이미 구독중이라면?
				</span>
				<GoogleLoginLink />
			</Info>
		</Container>
	);
};

export default DimmedArea;

const Container = styled.div`
	position: absolute;
	top: -4px;
	padding-top: 72px;
	padding-bottom: 60px;
	background-color: rgba(255, 255, 255, 0.9);

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 18px;
`;

const ServiceTitle = styled.span`
	font-size: 20px;
	font-weight: 800;
	line-height: 30px;

	text-align: center;
`;

const TopicTags = styled.div`
	padding: 12px 9px;
	gap: 10px;
	border-radius: 4px;
	background: rgba(242, 242, 242, 1);

	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 8px;
`;

const TopicTag = styled.div`
	height: 26px;
	padding: 6px 12px;
	gap: 10px;
	border-radius: 12px;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.12);

	font-size: 12px;
	font-weight: 400;
	line-height: 14.32px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;

	span {
		font-size: 12px;
		font-weight: 400;
		line-height: 14.32px;
		display: flex;
		gap: 4px;
	}
`;
