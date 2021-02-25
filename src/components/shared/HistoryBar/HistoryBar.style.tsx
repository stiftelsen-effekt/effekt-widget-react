import styled from "styled-components";
import { orange15 } from "../../../config/colors";

export const HistoryBarWrapper = styled.div`
  width: 100%;
  display: inline;
  display: flex;
  align-items: center;
  background-color: white;
  padding-top: 5px;
  z-index: 2;
`;

export const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HistoryText = styled.p`
  display: inline-block;
  color: black;
  font-weight: 600;
  font-size: 14px;
  @media only screen and (max-width: 400px) {
    padding-left: 10px;
  }
`;

export const ResponsiveText = styled.span`
  display: inline-block;
  color: black;
  font-weight: 600;
  font-size: 14px;
  @media only screen and (max-width: 350px) {
    display: none;
  }
`;

export const BackArrowSVG = styled.svg`
  color: gray20;
  float: left;
  position: absolute;
  margin-left: 25px;

  &:active {
    box-shadow: none !important;
    outline: none !important;
  }

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }

  &:focus {
    outline: none;
    border-radius: 5px;
    box-shadow: 0px 0px 0px 2px ${orange15};
  }
`;
