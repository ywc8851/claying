import styled from "styled-components";

const SERVICE_TITLE = "유튜브 영상 정보의 홍수 속에서 나만 똑똑하게 시청하는 방법.";
const SERVICE_DESCRIPTION =
	"500시간이 넘는 영상이 매 분마다 업로드 되는 현재, 오늘 업로드된 주요 영상들을 <span class='highlight'>매일</span> 요약드립니다.";
const SERVICE_SUBDESCRIPTION = "<span class='highlight'>17</span>가지 주요 분야 영상들 매일 요약받고 트렌디해지기!";
const SERVICE_TAGS = [
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
	"피트니스",
	"인공지능",
	"역사",
];

const ServiceIntroduce = () => {
	return (
		<Container>
			<ServiceTitle>{SERVICE_TITLE}</ServiceTitle>
			<ServiceDesc dangerouslySetInnerHTML={{ __html: SERVICE_DESCRIPTION }} />
			<TopicTags>
				{SERVICE_TAGS.map((topic) => {
					return <TopicTag key={topic}>{topic}</TopicTag>;
				})}
			</TopicTags>
			<ServiceSubDesc dangerouslySetInnerHTML={{ __html: SERVICE_SUBDESCRIPTION }} />
		</Container>
	);
};

export default ServiceIntroduce;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 18px;
	padding: 0 20px;
	margin-bottom: 12px;

	.highlight {
		font-weight: 800;
	}
`;

const ServiceTitle = styled.span`
	font-size: 24px;
	font-weight: 800;
	line-height: 33.6px;
`;

const ServiceDesc = styled.span`
	font-size: 16px;
	font-weight: 400;
	line-height: 22.4px;
	letter-spacing: -0.02em;
`;

const TopicTags = styled.div`
	width: 320px;
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

const ServiceSubDesc = styled.span`
	font-size: 14px;
	font-weight: 400;
	line-height: 16.71px;
`;
