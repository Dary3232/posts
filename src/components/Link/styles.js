import { Link } from "react-router-dom";
import styled from "styled-components";

export const SimpleLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    color: darkred;
    text-decoration: underline;
  }
`;
