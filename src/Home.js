import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 50vw;
  height: 50vw;
  margin: auto;
  text-align: center;
`;

const Home = () => {
    return (
        <Container>
            <h1>나만의 영화 리스트 만들기</h1>
            <Link to="/movieGet">박스오피스 순위 받아오기</Link>
        </Container>
    );
}
export default Home;