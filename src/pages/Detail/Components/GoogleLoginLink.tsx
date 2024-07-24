import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/user";
import { auth } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const GoogleLoginLink = () => {
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

	return <GoogleLoginButton onClick={signInGoogle}>로그인해서 피드 마저 읽기</GoogleLoginButton>;
};

export default GoogleLoginLink;

const GoogleLoginButton = styled.button`
	border: none;
	border-bottom: 1px solid rgba(0, 123, 255, 1);
	background-color: white;

	font-family: "Pretendard Variable";
	font-size: 13px;
	font-weight: 700;
	line-height: 15.51px;
	color: rgba(0, 123, 255, 1);
`;
