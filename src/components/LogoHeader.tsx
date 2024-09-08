import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import { isDesktop } from "react-device-detect";
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
	const [logoutBtnVisible, setLogoutBtnVisible] = useState(false);
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

	const handleClickProfile = () => setLogoutBtnVisible(!logoutBtnVisible);

	return (
		<>
			<Container $isDetailPage={isDetailPage} $isDesktop={isDesktop}>
				<PageInfo>
					{isDetailPage && <BackIcon onClick={goHome} />}
					{title === "" ? (
						<span onClick={goHome} className="logo">
							YouTicle
						</span>
					) : (
						<Title>{title}</Title>
					)}
				</PageInfo>
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
				{title === "" && user.picture !== "" && (
					<ProfileImage onClick={handleClickProfile}>
						{user.picture !== "" && <img src={user.picture} alt="User profile" />}
						{logoutBtnVisible && <LogoutBtn onClick={logOut}>로그아웃</LogoutBtn>}
					</ProfileImage>
				)}
			</Container>
			<Toast message="링크가 복사되었습니다" visible={toastVisible} />
		</>
	);
};
export default LogoHeader;

const Container = styled.header<{ $isDetailPage: boolean; $isDesktop: boolean }>`
	width: 100%;
	max-width: ${({ $isDesktop }) => ($isDesktop ? "420px" : "none")};
	height: 52px;
	padding: 0 20px !important;
	position: fixed;
	top: 0;
	background-color: ${(props) => (props.$isDetailPage ? "rgba(244, 244, 244, 1)" : "rgba(0, 123, 255, 1)")};
	font-family: "Pretendard Variable";

	display: flex;
	justify-content: ${(props) => (props.$isDetailPage ? "space-between" : "space-between")};
	align-items: center;
	z-index: 1000;

	.logo {
		margin-left: 8px;
		color: ${(props) => (props.$isDetailPage ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)")};
		font-family: Inter;
		font-size: 18px;
		font-weight: 700;
		line-height: 18px;
		text-align: center;
	}
`;

const PageInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	flex-grow: 1;
`;

const Title = styled.span`
	font-size: 16px;
	font-weight: 400;
	line-height: 19.09px;
	width: 200px;
	flex-grow: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const ProfileImage = styled.div`
	position: relative;
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

const LogoutBtn = styled.button`
	width: 62px;
	height: 30px;
	padding: 6px;
	border-radius: 4px;
	background: #ffffff;
	box-shadow: 0px 4px 4px 0px #00000040;

	font-family: var(--font-Pretendard);
	font-size: 14px;
	font-weight: 600;
	line-height: 16.71px;

	position: absolute;
	bottom: -35px;
	right: 0px;
`;
