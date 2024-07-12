import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { detailDataState } from "@/store/detailData";
import { DataProps } from "@/types/dataProps";

const CHANNEL_NAME = "채널 이름";
const SUBSCRIBER = 500;

const TopicCard = (props: DataProps) => {
	const navigate = useNavigate();
	const setTopicState = useSetRecoilState(detailDataState);
	const { section, title, short_summary, thumbnail, upload_date } = props;

	const handleNavigate = () => {
		setTopicState(props);
		navigate("/detail");
	};

	return (
		<Container onClick={handleNavigate}>
			<CardHeader>
				<Category>{section}</Category>
				<Title>{title}</Title>
			</CardHeader>
			<Summary>{short_summary}</Summary>
			<Thumbnail src={thumbnail} />
			<UploadTime>{upload_date} 영상 업로드</UploadTime>
			<ChannelInfo>
				<ProfileImage></ProfileImage>
				<ProfileInfo>
					<Name>{CHANNEL_NAME}</Name>
					<Subscriber>{SUBSCRIBER}명</Subscriber>
				</ProfileInfo>
			</ChannelInfo>
		</Container>
	);
};

export default TopicCard;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 24px 22px 18px 22px;
	gap: 10px;
	border-radius: 8px;
	background: rgba(255, 255, 255, 1);
	margin-bottom: 32px;
`;

const CardHeader = styled.div`
	display: flex;
	gap: 14px;
	padding-bottom: 12px;
	border-bottom: 1px solid black;
`;

const Category = styled.div`
	width: 76px;
	height: 46px;
	padding: 11px 16px;
	gap: 10px;
	border-radius: 4px;
	background: rgba(48, 213, 200, 1);
	flex-shrink: 0;
	text-align: center;

	font-size: 12px;
	font-weight: 800;
	line-height: 24px;
	color: rgba(255, 255, 255, 1);
`;

const Title = styled.span`
	font-size: 20px;
	font-weight: 800;
	line-height: 24px;
`;

const Summary = styled.div`
	/* height: 130px; */
	padding: 15px 14px 15px 14px;
	gap: 10px;
	border-radius: 4px;
	background: rgba(244, 245, 247, 1);

	font-size: 14px;
	font-weight: 400;
	line-height: 19.6px;
`;

const Thumbnail = styled.img`
	object-fit: cover;
	height: 154px;
`;

const UploadTime = styled.span`
	font-size: 14px;
	font-weight: 400;
	line-height: 16.8px;
`;

const ChannelInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 9px;
	height: 36px;
`;

const ProfileImage = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background: rgba(217, 217, 217, 1);
`;

const ProfileInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const Name = styled.span`
	font-size: 14px;
	line-height: 19.6px;
`;
const Subscriber = styled.span`
	font-size: 12px;
	line-height: 16.8px;
	color: rgba(158, 158, 158, 1);
`;
