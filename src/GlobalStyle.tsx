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
    color:black;
    line-height: 1.2;
    /* background:linear-gradient(135deg,#e09,#d0e); */
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;
