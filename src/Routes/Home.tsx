import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useWindowDimensions from "../useWidowDimensions";

const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 50%;
`;

const SliderWrapper = styled.div`
  width: 100vw;
  height: 150px;
  position: relative;
  top: -100px;
  padding: 0 60px;
`;

const Back = styled(motion.div)`
  z-index: 1;
  font-size: 40px;
  width: 120px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Front = styled(motion.div)`
  z-index: 1;
  font-size: 40px;
  width: 120px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  position: relative;
  /* top: -100px;
  margin: 0 10px; */
`;

const Row = styled(motion.div)`
  width: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;

const Box = styled(motion.div)``;

const BoxImg = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  height: 150px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  width: 100%;
  background-color: ${(props) => props.theme.black.lighter};
  padding: 10px;
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 12px;
  }
`;

const btnVariants = {
  normal: { opacity: 0 },
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
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "tween",
    },
  },
};
function Home() {
  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });
  const offset = 6;
  const width = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  // const [back, setBack] = useState(false);
  const [direction, setDirection] = useState(0);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  /*   const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1; // 배너에 사용한 영화 제외
      const maxIndex = Math.floor(totalMovies / offset) - 1; // -1 해주는 이유는 인덱스가 0부터 시작하기 때문
      setBack(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1; // 배너에 사용한 영화 제외
      const maxIndex = Math.floor(totalMovies / offset) - 1; // -1 해주는 이유는 인덱스가 0부터 시작하기 때문
      setBack(true);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  }; */

  const changeIndex = (newDirection: number) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setDirection(newDirection);

      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;

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
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            <Back
              variants={btnVariants}
              initial="normal"
              whileHover="hover"
              onClick={() => changeIndex(1)}
            >
              {"<"}
            </Back>
            <Front
              variants={btnVariants}
              initial="normal"
              whileHover="hover"
              onClick={() => changeIndex(-1)}
            >
              {">"}
            </Front>

            <Slider>
              <AnimatePresence
                initial={false}
                onExitComplete={toggleLeaving}
                custom={direction}
              >
                <Row
                  // initial={{ opacity: 0, x: back ? -width : width }}
                  // animate={{ opacity: 1, x: 0 }}
                  // exit={{ opacity: 0, x: back ? width : -width }}
                  // transition={{
                  //   type: "tween",
                  //   duration: 1,
                  // }}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key={index}
                >
                  {data?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        variants={boxVariants}
                        initial="normal"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        key={movie.id}
                      >
                        <BoxImg
                          $bgPhoto={makeImagePath(
                            movie.backdrop_path || movie.poster_path,
                            "w500"
                          )}
                        />
                        <Info variants={infoVariants}>
                          <h4>{movie.title}</h4>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
