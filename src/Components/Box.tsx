import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { generateUniqueId, makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Card = styled(motion.div)`
  height: 150px;
  cursor: pointer;
`;

const CardImg = styled(motion.div)<{ $bgPhoto: string }>`
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

const boxVariants = {
  normal: (index: number) => ({
    scale: 1,
    originX: index % 6 === 0 ? 0 : index % 6 === 5 ? 1 : 0.5,
  }),
  hover: (index: number) => ({
    scale: 1.2,
    y: -25,
    originX: index % 6 === 0 ? 0 : index % 6 === 5 ? 1 : 0.5,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "tween",
    },
  }),
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

interface IBoxProps {
  id: number;
  index: number;
  queryId: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  children: React.ReactNode;
}

function Box({
  id,
  index,
  queryId,
  backdrop_path,
  poster_path,
  title,
  name,
  setModalOpen,
}: IBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const onBoxClicked = (id: number) => {
    navigate(`/movies/${id}`);
    setModalOpen(true);
  };
  return (
    <AnimatePresence custom={index}>
      <Card
        custom={index}
        layoutId={generateUniqueId(queryId, id)}
        onClick={() => onBoxClicked(id)}
        variants={boxVariants}
        initial="normal"
        whileHover="hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ type: "tween" }}
      >
        <CardImg
          $bgPhoto={makeImagePath(backdrop_path || poster_path, "w500")}
        />
        <Info variants={infoVariants} $isHovered={isHovered}>
          <h4>{title || name}</h4>
        </Info>
      </Card>
    </AnimatePresence>
  );
}

export default Box;
