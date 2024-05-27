import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userState } from "@src/store/user";

const LogoHeader = () => {
	const user = useRecoilValue(userState);

	return (
		<Container>
			로고
			<ProfileImage>
				<img src={user.picture} alt="User profile" />
			</ProfileImage>
		</Container>
	);
};
export default LogoHeader;

const Container = styled.header`
	width: 100%;
	height: 52px;
	padding: 0 20px;
	position: fixed;
	top: 0;
	max-width: 360px;
	background-color: red;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ProfileImage = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: blue;

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
`;
