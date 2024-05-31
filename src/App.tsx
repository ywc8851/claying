import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Landing from "@pages/Landing/index.tsx";
import Detail from "@pages/Detail/index.tsx";
import GlobalStyles from "./styles/GlobalStyled.ts";

function App() {
	return (
		<Router>
			<AppContainer>
				<GlobalStyles />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/detail" element={<Detail />} />
				</Routes>
			</AppContainer>
		</Router>
	);
}

export default App;

const AppContainer = styled.div`
	width: 100vw;
	max-width: 360px;
	min-height: 100vh;
	padding: 0;
	margin: 0;
	background-color: white;
`;
