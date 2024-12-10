import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useWindowDimensions from "../useWindowDimensions";
import { useState } from "react";
import { makeImagePath } from "../utils";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import MovieModal from "./MovieModal";
import { IResult } from "../api/interfaceData";

// styled-components
const Wrapper = styled.div`
  position: relative;
  /* top: -100px; */
  height: 200px;
`;

const Container = styled.div`
  /* width: 100%; */
  /* height: 150px; */
  /* padding: 0 60px; */
  position: relative;
`;

const SliderTitle = styled.div`
  padding: 5px 20px;
  font-weight: 500;
  font-size: 18px;
`;

const ArrowBtn = styled(motion.div)<{ $position: string }>`
  z-index: 1;
  font-size: 20px;
  width: 60px;
  height: 150px;
  position: absolute;
  top: 0;
  ${(props) => (props.$position === "left" ? "left: 0;" : "right: 0;")}
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled(motion.div)`
  width: 100%;
  position: absolute;
  /* top: 0;
  left: 0; */
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;

const Box = styled(motion.div)`
  height: 150px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left !important;
  }
  &:last-child {
    transform-origin: center right !important;
  }
`;

const BoxImg = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  height: 150px;
`;

const Info = styled(motion.div)<{ $isHovered: boolean }>`
  width: 100%;
  background-color: ${(props) => props.theme.black.lighter};
  padding: 10px;
  opacity: 0;
  pointer-events: ${(props) => (props.$isHovered ? "auto" : "none")};
  h4 {
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }
`;

// Variants
const btnVariants = {
  normal: { opacity: 0, backgroundColor: "rgba(0,0,0,0)" },
  hover: { opacity: 1, backgroundColor: "rgba(0,0,0,0.5)" },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "tween",
    },
  },
};

const infoVariants = {
  normal: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "tween",
    },
  },
};

interface ISliderProps {
  movies: IResult[];
  title: string;
}

function Slider({ movies, title }: ISliderProps) {
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => navigate(`/movies/${movieId}`);

  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const offset = 6;
  const width = useWindowDimensions();

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const changeIndex = (newDirection: number) => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setDirection(newDirection);

      const totalMovies = movies.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1; // index는 0부터 시작하기 때문에 -1 해줌

      setIndex((prev) => {
        if (newDirection > 0) {
          return prev === maxIndex ? 0 : prev + 1;
        } else {
          return prev === 0 ? maxIndex : prev - 1;
        }
      });
    }
  };

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? width + 5 : -width - 5,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -width - 5 : width + 5,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <Wrapper>
      <SliderTitle>{title}</SliderTitle>
      <Container>
        <ArrowBtn
          $position="left"
          variants={btnVariants}
          initial="normal"
          whileHover="hover"
          onClick={() => changeIndex(-1)}
        >
          <FaLessThan />
        </ArrowBtn>

        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={direction}
        >
          <Row
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={index}
          >
            {movies
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={`movie-detail-${movie.id}`}
                  onClick={() => onBoxClicked(movie.id)}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  transition={{ type: "tween" }}
                  key={movie.id}
                >
                  <BoxImg
                    $bgPhoto={makeImagePath(
                      movie.backdrop_path || movie.poster_path,
                      "w500"
                    )}
                  />
                  <Info variants={infoVariants} $isHovered={isHovered}>
                    <h4>{movie.title || movie.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>

        <ArrowBtn
          $position="right"
          variants={btnVariants}
          initial="normal"
          whileHover="hover"
          onClick={() => changeIndex(1)}
        >
          <FaGreaterThan />
        </ArrowBtn>
      </Container>
    </Wrapper>
  );
}

export default Slider;
