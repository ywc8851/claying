import styled from "styled-components";
import LogoHeader from "./../Landing/Components/LogoHeader";
import YouTube, { YouTubeProps } from "react-youtube";

const index = () => {
	const onPlayerReady: YouTubeProps["onReady"] = (event) => {
		event.target.pauseVideo();
	};

	const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
		// event.data 값 => 1 재생 중, 2 일시중지, 0 종료
		if (!event.data) {
			const player = event.target;
			player.seekTo(5);
			player.playVideo();
		}
	};

	const opts: YouTubeProps["opts"] = {
		height: "202",
		width: "360",
		playerVars: {
			autoplay: 0,
			rel: 0,
			start: 5,
			end: 10,
			controls: 0,
			disablekb: 1,
		},
	};

	return (
		<Container>
			<LogoHeader />
			<YouTube videoId="6Af6b_wyiwI" opts={opts} onReady={onPlayerReady} onStateChange={onPlayerStateChange} />
		</Container>
	);
};

export default index;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Pretendard Variable";
	padding-top: 76px;
`;
