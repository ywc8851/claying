import styled from "styled-components";
import LogoHeader from "./../Landing/Components/LogoHeader";

const index = () => {
	return (
		<Container>
			<LogoHeader />
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
