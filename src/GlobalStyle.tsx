import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
  box-sizing: border-box;
  }
  body {
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    /* background-color:${(props) => props.theme.bgColor}; */
    color: ${(props) => props.theme.white.darker};
    line-height: 1.2;
    background-color: black;
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;
