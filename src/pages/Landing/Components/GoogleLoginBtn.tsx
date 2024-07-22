import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/user";
import { auth } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const GoogleLoginBtn = () => {
	const setUser = useSetRecoilState(userState);

	const provider = new GoogleAuthProvider();

	const signInGoogle = async () => {
		try {
			const { user } = await signInWithPopup(auth, provider);
			setUser({
				name: user.displayName,
				email: user.email,
				picture: user.photoURL,
			});
		} catch (e) {
			console.error(e);
		}
	};

	return <GoogleLoginButton onClick={signInGoogle}>구글 계정 연동해서 무료 구독하기</GoogleLoginButton>;
};

export default GoogleLoginBtn;

const GoogleLoginButton = styled.button`
	width: calc(100% - 40px);
	height: 60px;
	border-radius: 4px;
	background-color: #007bff;

	font-family: "Pretendard Variable";
	font-size: 16px;
	font-weight: 700;
	line-height: 22px;
	color: white;
`;
