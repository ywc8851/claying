import styled from "styled-components";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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
	const onGoogleLogin = async (res: CredentialResponse) => {
		const decoded: GoogleDecodedProps = jwtDecode(JSON.stringify(res));

		console.log(decoded);
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
			shape="square" //버튼 shape 지정
			theme="filled_blue" //테마 blue 또는 black
			logo_alignment="left" //로고 정렬 위치
		></GoogleLogin>
	);
};

export default GoogleLoginBtn;
