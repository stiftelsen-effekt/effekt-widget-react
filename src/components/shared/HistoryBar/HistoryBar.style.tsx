import styled from "styled-components";

export const HistoryBarWrapper = styled.div`
  width: 100%;
  display: inline;
  height: 40px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HistoryText = styled.p`
  color: black;
  font-weight: 600;
  font-size: 14px;
`;

export const BackArrowSVG = styled.svg`
  color: gray20;
  float: left;
  position: fixed;
  margin-left: 12px;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;
