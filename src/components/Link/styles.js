import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const LinkStyle = css`
  color: black;
  text-decoration: none;

  &:hover {
    color: darkred;
    text-decoration: underline;
  }
`;

export const SimpleLink = styled(Link)`${LinkStyle}`;

export const NavigationLink = styled(NavLink)`${LinkStyle}`;
