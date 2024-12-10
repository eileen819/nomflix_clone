import styled from "styled-components";
import Banner from "../components/Banner";
import requests from "../api/requests";
import Row from "../components/Row";

const Wrapper = styled.div`
  background-color: black;
  /* height: 100%; */
  position: relative;
  overflow-x: hidden;
`;

const SlideWrapper = styled.div`
  position: relative;
  bottom: 100px;
  left: 0;
`;

function Home() {
  return (
    <Wrapper>
      <Banner
        queryName="movies"
        queryId="nowPlaying"
        queryUrl={requests.getNowPlayingMovies}
      />
      <SlideWrapper>
        <Row
          title="Popular Movies"
          queryName="movies"
          queryId="popular"
          queryUrl={requests.getPopularMovies}
        />
        <Row
          title="Upcoimg Movies"
          queryName="movies"
          queryId="upcoming"
          queryUrl={requests.getUpcomingMovies}
        />
        <Row
          title="On The Air TV"
          queryName="tv"
          queryId="upcoming"
          queryUrl={requests.getOnTheAirTv}
        />
        <Row
          title="Popular TV"
          queryName="tv"
          queryId="popular"
          queryUrl={requests.getpopularTv}
        />
      </SlideWrapper>
    </Wrapper>
  );
}

export default Home;
