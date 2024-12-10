import styled from "styled-components";
import Banner from "../components/Banner";
import requests from "../api/requests";

const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
  position: relative;
`;

function Movies() {
  return (
    <Wrapper>
      <Banner
        queryName="movies"
        queryId="popularMovies"
        queryUrl={requests.getPopularMovies}
      />
    </Wrapper>
  );
}

export default Movies;
