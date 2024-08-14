import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, signOut } from "@/firebase";
import { userState } from "@/store/user";
import { playerState } from "@/store/player";
import BackIcon from "@/assets/back.svg?react";
import YoutubeOffIcon from "@/assets/youtubeOff.svg?react";
import YoutubeOnIcon from "@/assets/youtubeOn.svg?react";
import ShareIcon from "@/assets/share.svg?react";
import Toast from "./Toast";

interface LogoHeaderProps {
	title?: string;
}

const LogoHeader = ({ title = "" }: LogoHeaderProps) => {
	const user = useRecoilValue(userState);
	const setUser = useSetRecoilState(userState);
	const player = useRecoilValue(playerState);
	const setPlayer = useSetRecoilState(playerState);
	const [toastVisible, setToastVisible] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const isDetailPage = location.pathname.includes("/detail");

	const copyUrlToClipboard = () => {
		const currentUrl = window.location.href;

		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(currentUrl)
				.then(() => {
					setToastVisible(true);
					setTimeout(() => setToastVisible(false), 2000);
				})
				.catch((err) => {
					console.error("URL 복사에 실패했습니다.", err);
				});
		} else {
			console.warn("이 브라우저는 Clipboard API를 지원하지 않습니다.");
		}
	};

	const togglePlayerVisible = () => {
		setPlayer(!player);
	};

	const goBack = () => {
		navigate(-1);
	};

	const goHome = () => {
		navigate("/");
	};

	const logOut = async () => {
		try {
			await signOut(auth);
			setUser({
				name: "",
				email: "",
				picture: "",
			});
		} catch (e) {
			console.error("Error loggin out: ", e);
		}
	};

	return (
		<>
			<Container $isDetailPage={isDetailPage}>
				<div>
					{isDetailPage && <BackIcon onClick={goBack} />}
					{title === "" ? (
						<span onClick={goHome} className="logo">
							로고
						</span>
					) : (
						<Title>{title}</Title>
					)}
					{isDetailPage && title !== "" && (
						<IconSection>
							{player ? (
								<YoutubeOffIcon onClick={togglePlayerVisible} />
							) : (
								<YoutubeOnIcon onClick={togglePlayerVisible} />
							)}
							<ShareIcon onClick={copyUrlToClipboard} />
						</IconSection>
					)}
				</div>
				{title === "" && user.picture !== "" && (
					<ProfileImage onClick={logOut}>
						{user.picture !== "" && <img src={user.picture} alt="User profile" />}
					</ProfileImage>
				)}
			</Container>
			<Toast message="링크가 복사되었습니다" visible={toastVisible} />
		</>
	);
};
export default LogoHeader;

const Container = styled.header<{ $isDetailPage: boolean }>`
	width: 100%;
	height: 52px;
	padding: 0 20px;
	position: fixed;
	top: 0;
	background-color: ${(props) => (props.$isDetailPage ? "rgba(244, 244, 244, 1)" : "rgba(0, 123, 255, 1)")};
	font-family: "Pretendard Variable";

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	z-index: 1000;

	div {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.logo {
		color: ${(props) => (props.$isDetailPage ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)")};
	}
`;

const Title = styled.span`
	font-size: 16px;
	font-weight: 400;
	line-height: 19.09px;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const ProfileImage = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
	}
`;

const IconSection = styled.div`
	display: flex;
	gap: 12px !important;
	align-items: center;
`;
