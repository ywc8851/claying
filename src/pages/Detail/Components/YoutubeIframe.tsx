import { useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface YoutubeIframeProps {
	onSeekToChange: (seekTo: (num: number) => void) => void;
}

const YoutubeIframe = ({ onSeekToChange }: YoutubeIframeProps) => {
	const playerRef = useRef<any>(null);

	const onPlayerReady: YouTubeProps["onReady"] = (event) => {
		playerRef.current = event.target;
		event.target.pauseVideo();
	};

	const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
		if (event.data === 0) {
			const player = event.target;
			// player.seekTo(5);
			player.playVideo();
		}
	};

	const opts: YouTubeProps["opts"] = {
		height: "202",
		width: "360",
		playerVars: {
			autoplay: 0,
			rel: 0,
			disablekb: 1,
		},
	};

	useEffect(() => {
		onSeekToChange((num: number) => {
			if (playerRef.current) {
				playerRef.current.seekTo(num);
				playerRef.current.playVideo();
			}
		});
	}, [onSeekToChange]);

	return <YouTube videoId="6Af6b_wyiwI" opts={opts} onReady={onPlayerReady} onStateChange={onPlayerStateChange} />;
};

export default YoutubeIframe;
