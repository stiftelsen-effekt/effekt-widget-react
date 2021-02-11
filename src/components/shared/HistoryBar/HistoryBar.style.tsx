import styled from "styled-components";

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

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;
