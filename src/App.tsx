import { useEffect } from "react";
import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isDesktop } from "react-device-detect";
import styled from "styled-components";
import Landing from "@/pages/Landing/index";
import Detail from "@/pages/Detail/index";
import GlobalStyles from "./styles/GlobalStyled.ts";

function App() {
	return (
		<Router>
			<AppContainer $isDesktop={isDesktop}>
				<GlobalStyles />
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/detail/:id" element={<Detail />} />
				</Routes>
			</AppContainer>
		</Router>
	);
}

export default App;

const AppContainer = styled.div<{ $isDesktop: boolean }>`
	width: 100vw;
	max-width: ${(props) => (props.$isDesktop ? "420px" : "none")};
	min-height: 100vh;
	padding: 0;
	margin: 0;
	background-color: white;

	::-webkit-scrollbar {
		display: none;
	}
`;

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};
