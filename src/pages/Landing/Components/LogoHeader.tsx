import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/store/user";
import { googleLogout } from "@react-oauth/google";

const LogoHeader = () => {
	const user = useRecoilValue(userState);
	const setUser = useSetRecoilState(userState);

	const logOut = () => {
		googleLogout();
		setUser({
			name: "",
			email: "",
			picture: "",
		});
	};

	return (
		<Container>
			로고
			<ProfileImage onClick={logOut}>
				{user.picture !== "" && <img src={user.picture} alt="User profile" />}
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
	z-index: 1000;
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
		overflow: hidden;
	}
`;
