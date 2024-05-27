import styled from "styled-components";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useSetRecoilState } from "recoil";
import { userState } from "@src/store/user";

interface GoogleDecodedProps {
	aud: string;
	azp: string;
	email: string;
	email_varified: boolean;
	exp: number;
	family_name: string;
	given_name: string;
	iat: number;
	iss: string;
	jti: string;
	name: string;
	nbf: number;
	picture: string;
	sub: string;
}

const GoogleLoginBtn = () => {
	const setUser = useSetRecoilState(userState);

	const onGoogleLogin = async (res: CredentialResponse) => {
		const decoded: GoogleDecodedProps = jwtDecode(JSON.stringify(res));
		const { name, email, picture } = decoded;
		console.log(name, email, picture);
		setUser({
			name,
			email,
			picture,
		});
	};

	return (
		<GoogleLogin
			onSuccess={(credentialResponse) => {
				onGoogleLogin(credentialResponse);
			}}
			onError={() => console.log("로그인 실패")}
			width="320px"
			size="large"
			type="standard"
			text="signin_with"
			shape="square"
			theme="filled_blue"
			logo_alignment="left"
		></GoogleLogin>
	);
};

export default GoogleLoginBtn;
