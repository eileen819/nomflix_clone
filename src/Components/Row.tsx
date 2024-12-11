import { useQuery } from "@tanstack/react-query";
import { IGetResults } from "../api/interfaceData";
import { getMovies } from "../api/api";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { useRef, useState } from "react";
import Box from "./Box";
import MovieModal from "./MovieModal";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-bottom: 30px;
  position: relative;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const StyledSwiper = styled(Swiper)`
  overflow: visible;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  position: static;
`;

const NavBtn = styled(motion.div)<{ $position: string }>`
  z-index: 1;
  font-size: 25px;
  border: 1px solid ${(props) => props.theme.white.darker};
  background-color: rgba(0, 0, 0, 0.5);
  width: 20px;
  height: 20px;
  padding: 15px;
  margin: 0 10px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  ${(props) => (props.$position === "prev" ? "left: 0;" : "right: 0;")}
  transform: translateY(90px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 0;
  &:hover {
    opacity: 1;
    background-color: ${(props) => props.theme.black.lighter};
  }
`;

interface IRowProps {
  title: string;
  queryName: string;
  queryId: string;
  queryUrl: string;
}

type TypeNavigation = "NEXT" | "PREV";

function Row({ title, queryName, queryId, queryUrl }: IRowProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const { isLoading, data } = useQuery<IGetResults>({
    queryKey: [queryName, queryId],
    queryFn: () => getMovies(queryUrl),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const handleNavigation = (newDirection: TypeNavigation) => {
    if (data?.results && swiperRef.current) {
      if (newDirection === "NEXT") {
        swiperRef.current?.slideNext(1000);
      } else {
        swiperRef.current.slidePrev(1000);
      }
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <Title>{title}</Title>
          <StyledSwiper
            slidesPerView={6}
            slidesPerGroup={6}
            spaceBetween={5}
            onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
          >
            {data?.results.slice(0, 18).map((movie, i) => (
              <StyledSwiperSlide key={`${queryId}_${i}_${movie.id}`}>
                <Box
                  index={i}
                  {...movie}
                  queryName={queryName}
                  queryId={queryId}
                  setModalOpen={setModalOpen}
                >
                  {movie.title || movie.name}
                </Box>
              </StyledSwiperSlide>
            ))}
          </StyledSwiper>
          <NavBtn $position="prev" onClick={() => handleNavigation("PREV")}>
            {"<"}
          </NavBtn>
          <NavBtn $position="next" onClick={() => handleNavigation("NEXT")}>
            {">"}
          </NavBtn>
          {modalOpen && (
            <MovieModal
              movies={data?.results!}
              queryName={queryName}
              queryId={queryId}
              setModalOpen={setModalOpen}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Row;

// const [index, setIndex] = useState(0);
// const itemsPerPage = 6;
// const handleIndex = (newDirection: TypeNavigation) => {
//   if (data?.results && swiperRef.current) {
//     const maxIndex = Math.floor(data?.results.length / itemsPerPage) - 1;
//     if (
//       (newDirection === "NEXT" && index >= maxIndex) ||
//       (newDirection === "PREV" && index <= 0)
//     )
//       return;
//     setIndex((prev) => {
//       if (newDirection === "NEXT") {
//         return prev + 1;
//       } else {
//         return prev - 1;
//       }
//     });
//   }
// };
// useEffect(() => {
//   swiperRef.current?.slideTo(index * itemsPerPage, 500); // Swiper 이동
// }, [index]);
