import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IResult } from "../api/interfaceData";

const Wrapper = styled.div``;

const Overlay = styled(motion.div)`
  z-index: 2;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  z-index: 2;
  position: fixed;
  width: 60vw;
  height: 75vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 350px;
  background-image: linear-gradient(
      transparent 50%,
      ${(props) => props.theme.black.darker}
    ),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 28px;
  font-weight: 400;
  position: relative;
  top: -60px;
  padding: 0 20px;
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  position: relative;
  top: -40px;
  padding: 0 20px;
`;

interface IMovieModalProp {
  movies: IResult[];
}

function MovieModal({ movies }: IMovieModalProp) {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const onOverlayClick = () => navigate("/");

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    movies.find((movie) => String(movie.id) === bigMovieMatch.params.movieId);

  return (
    <Wrapper>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie layoutId={`movie-detail-${bigMovieMatch.params.movieId}`}>
              {clickedMovie && (
                <>
                  <BigCover
                    $bgPhoto={makeImagePath(clickedMovie.backdrop_path)}
                  />
                  <BigTitle>{clickedMovie.title || clickedMovie.name}</BigTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default MovieModal;
