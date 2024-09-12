import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { detailDataState } from "@/store/detailData";
import { DataProps } from "@/types/dataProps";
import { formatDate } from "@/utils/formatter";

interface RecommendCardProps extends DataProps {
	icon: React.ReactNode;
}

const RecommendCard = (props: RecommendCardProps) => {
	const navigate = useNavigate();
	const setTopicState = useSetRecoilState(detailDataState);
	const { video_id, summary_data, thumbnail, upload_date } = props;

	const handleNavigate = () => {
		setTopicState(props);
		navigate(`/detail/${video_id}`);
	};

	return (
		<Container onClick={handleNavigate}>
			<Thumbnail src={thumbnail} />
			<Info>
				<Title>
					{summary_data.headline_title}, <br />
					{summary_data.headline_sub_title}
				</Title>
				<UploadTime>{formatDate(upload_date)}</UploadTime>
			</Info>
		</Container>
	);
};

export default RecommendCard;

const Container = styled.div`
	display: flex;
	gap: 8px;
	padding: 20px 0;
	gap: 20px;
	background: rgba(255, 255, 255, 1);

	border-bottom: 1px solid rgba(172, 172, 172, 1);
	font-family: "Pretendard Variable";
`;

const Thumbnail = styled.img`
	object-fit: cover;
	width: 120px;
	height: 64px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const Title = styled.span`
	font-size: 16px;
	font-weight: 400;
	line-height: 140%;
`;

const UploadTime = styled.span`
	font-size: 12px;
	font-weight: 400;
	line-height: 14.32px;
	color: rgba(158, 158, 158, 1);
`;
