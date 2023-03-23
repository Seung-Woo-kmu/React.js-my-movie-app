import styled from "styled-components";
import axios from "axios";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const A = styled.a`
  text-decoration: none;
  &:link {
    color: navy;
  }
  &:visited {
    color: navy;
  }
`;

const HR = styled.hr`
  margin-top: 5vh;
`;

const List = styled.h1`
  text-align: center;
`;

const DeleteButton = styled.button`
  background-color: aliceblue;
  border-width: thin;
  border-radius: 3px;
  & + & {
    margin-top: 1vh;
  }
`;

const MyMovieList = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  list-style-type: decimal;
`;

const MyApp = styled.div`
  background-color: mistyrose;
  width: 40vw;
  min-height: 40vh;
  height: auto;
  margin: auto;
  margin-top: 5vh;
  padding: 10px 10px;
`;

const AlignCenter = styled.div`
  margin-top: 10vh;
  text-align: center;
`;

const Button = styled.button`
  background-color: #ffe4e1;
  border-width: thin;
  border-radius: 3px;
  & + & {
    margin-top: 1vh;
  }
`;

const Title = styled.h3``;

const Outside = styled.div`
  width: 50vw;
  min-height: 50vw;
  height: auto;
  margin: auto;
  margin-bottom: 20vh;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FloatRight = styled.div`
  float: right;
`;

const MovieShow = () => {
  const link =
    "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=";

  const [myMovies, setMyMovies] = useState([]);

  const [state, setState] = useState();

  const [titleState, setTitleState] = useState("");

  const [movies, setMovies] = useState(null);

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(null);

  const [titleShow, setTitleShow] = useState(null);

  const changeDate = useRef();

  const selectCountry = useRef();

  const handleChange = (e) => {
    setState(e.target.value)
  }

  const onClick = async () => {
    const country = selectCountry.current.value;
    setTitleShow(date);
    if (state === "K") {
      setTitleState("한국 영화");
    }
    else {
      if (state === "F") {
        setTitleState("외국 영화");
      }
      else {
        setTitleState("전체 영화");
      }
    }
    const formatDate = date.replace(/-/gi, "");
    try {
      setLoading(true);
      if (date) {
        const response = await axios.get(
          "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=9342b65c8c3e6c5fc2517cd6c2becba8&targetDt=" +
            formatDate +
            "&repNationCd=" +
            country
        );
        setMovies(response.data.boxOfficeResult.dailyBoxOfficeList);
      } else {
        setMovies(null);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const add = (e) => {
    const myMovie = movies.filter((movie) => movie.movieNm === e.target.id);
    if (!myMovies.includes(...myMovie)) {
      setMyMovies([...myMovies, ...myMovie]);
      alert("영화가 목록에 추가되었습니다.");
      console.log(myMovies);
    } else {
      alert("이미 추가된 영화입니다.");
      setMyMovies([...myMovies]);
    }
  };
  const deleteMovie = (e) => {
    setMyMovies(myMovies.filter((movie) => movie.movieNm !== e.target.id));
    alert("영화가 목록에서 삭제되었습니다.");
  };

  if (loading)
    return (
      <Outside>
        {" "}
        {date ? (
          <p>{date}일 박스오피스 로딩 중...</p>
        ) : (
          <p>날짜를 입력하세요.</p>
        )}{" "}
      </Outside>
    );

  return (
    <Outside>
      <Title>영화 박스오피스 순위</Title>
      <FloatRight>
        <input
          type="date"
          ref={changeDate}
          onChange={(event) => setDate(event.target.value)}
          value={date}
        ></input>
        <select ref={selectCountry} defaultValue={state} onChange={(e) => handleChange(e)}>
          <option value="">
            전체
          </option>
          <option value="K">한국 영화</option>
          <option value="F">외국 영화</option>
        </select>
        <Button onClick={onClick}>확인</Button>
      </FloatRight>
      {titleShow ? <p>{titleShow}일 {titleState} 박스오피스</p> : <p>날짜를 선택해주세요</p>}
      <Flex>
        <Box>
          <div>순위</div>
          {movies && movies.map((movie) => <div>{movie.rank}위</div>)}
        </Box>
        <Box>
          <div>제목</div>
          {movies &&
            movies.map((movie) => (
              <A href={link + movie.movieNm} target="_blank" rel="noopener noreferrer">{movie.movieNm}</A>
            ))}
        </Box>
        <Box>
          <div>당일 관객 수</div>
          {movies &&
            movies.map((movie) => (
              <div>
                {movie.audiCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                명
              </div>
            ))}
        </Box>
        <Box>
          <div>누적 관객 수</div>
          {movies &&
            movies.map((movie) => (
              <div>
                {movie.audiAcc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                명
              </div>
            ))}
        </Box>
        <Box>
          <div>버튼</div>
          {movies &&
            movies.map((movie) => (
              <Button id={movie.movieNm} onClick={add}>
                추가
              </Button>
            ))}
        </Box>
      </Flex>
      <AlignCenter>
        <Link to="/">홈으로 돌아가기</Link>
        <HR></HR>
      </AlignCenter>
      <List>나만의 영화 리스트</List>
      <MyApp>
        <Flex>
        <MyMovieList>
          <div>제목</div>
          {myMovies.map((movie, index) => (
            <div>
              {index + 1}.
              {movie.movieNm}
            </div>
          ))}
        </MyMovieList>
        <MyMovieList>
          <div>개봉일</div>
          {myMovies.map((movie, index) => (
            <div>
              {movie.openDt}
            </div>
          ))}
        </MyMovieList>
        <MyMovieList>
          <div>버튼</div>
          {myMovies.map((movie, index) => (
          <DeleteButton id={movie.movieNm} onClick={deleteMovie}>
              삭제
            </DeleteButton>))}
          </MyMovieList>
        </Flex>
      </MyApp>
    </Outside>
  );
};

const MovieGet = () => {
  return <MovieShow></MovieShow>;
};

export default MovieGet;
