import styled from "styled-components";
import Banner from "../components/Banner";
import requests from "../api/requests";
import Row from "../components/Row";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black};
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
          title="Trending Movies"
          queryName="movies"
          queryId="trending"
          queryUrl={requests.getTrendingMovies}
        />
        <Row
          title="Popular Movies"
          queryName="movies"
          queryId="popular"
          queryUrl={requests.getPopularMovies}
        />
        <Row
          title="Upcomig Movies"
          queryName="movies"
          queryId="upcoming"
          queryUrl={requests.getUpcomingMovies}
        />
        <Row
          title="Top Rated Movies"
          queryName="movies"
          queryId="topRated"
          queryUrl={requests.getTopRatedMovies}
        />
      </SlideWrapper>
    </Wrapper>
  );
}

export default Home;
