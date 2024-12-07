import styled from "styled-components";
import Banner from "../components/Banner";
import requests from "../api/requests";

const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
  position: relative;
`;

function Home() {
  return (
    <Wrapper>
      <Banner
        queryName="movies"
        queryEndPointName="nowPlaying"
        queryUrl={requests.getNowPlayingMovies}
      />
    </Wrapper>
  );
}

export default Home;
