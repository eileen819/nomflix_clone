import styled from "styled-components";
import Banner from "../components/Banner";
import requests from "../api/requests";

const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
  position: relative;
`;

function Tv() {
  return (
    <Wrapper>
      <Banner
        queryName="tv"
        queryId="airingToday"
        queryUrl={requests.getAiringTodayTv}
      />
    </Wrapper>
  );
}

export default Tv;
