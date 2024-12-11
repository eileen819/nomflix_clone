import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { generateUniqueId, makeImagePath } from "../utils";
import { IResult } from "../api/interfaceData";

const Overlay = styled(motion.div)`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  z-index: 999;
  position: fixed;
  width: 60vw;
  height: 75vh;
  inset: 0;
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
  movies?: IResult[];
  queryName: string;
  queryId: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MovieModal({
  movies,
  queryName,
  queryId,
  setModalOpen,
}: IMovieModalProp) {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const bigTvMatch = useMatch("/tv/:tvShowId");
  const onOverlayClick = () => navigate(-1);

  const clickedMovie =
    (bigMovieMatch?.params.movieId || bigTvMatch?.params.tvShowId) &&
    movies?.find(
      (movie) =>
        String(movie.id) ===
        (bigMovieMatch?.params.movieId || bigTvMatch?.params.tvShowId)
    );

  return (
    <AnimatePresence onExitComplete={() => setModalOpen(false)}>
      {bigMovieMatch || bigTvMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, type: "tween" }}
          />
          <BigMovie
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, type: "tween" }}
            layoutId={generateUniqueId(
              queryId,
              +bigMovieMatch?.params.movieId! || +bigTvMatch?.params.tvShowId!
            )}
          >
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
  );
}

export default MovieModal;

// overview 내용이 많을 경우 스크롤이 동작할 수 있게 만들기
