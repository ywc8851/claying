import { useSetRecoilState } from "recoil";
import { userState } from "@/store/user";
import { auth } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const GoogleLoginBtn = () => {
	const setUser = useSetRecoilState(userState);

	const provider = new GoogleAuthProvider();

	const signInGoole = async () => {
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

	return <button onClick={signInGoole}>구글로 로그인 하기</button>;
};

export default GoogleLoginBtn;
