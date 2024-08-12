import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Landing from "@/pages/Landing/index";
import Detail from "@/pages/Detail/index";
import GlobalStyles from "./styles/GlobalStyled.ts";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
	return (
		<Router>
			<AppContainer>
				<GlobalStyles />
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/detail/:id" element={<Detail />} />
					{/* <Route path="/detail" element={<Detail />} /> */}
				</Routes>
			</AppContainer>
		</Router>
	);
}

export default App;

const AppContainer = styled.div`
	width: 100vw;
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
