import styled from "styled-components";
import { orange10, orange20 } from "../../../../../config/colors";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const DateBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const Datebox = styled.button`
  width: 26px;
  height: 26px;
  padding: 0;
  margin: 4px;
  font-family: "Roboto", Arial, sans-serif;
  border: none;
  box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 0px 1.5px ${orange20};
  background-color: white;
  cursor: pointer;

  @media only screen and (max-width: 355px) {
    width: 22px;
    height: 22px;
  }

  &:hover {
    background-color: ${orange10};
  }

  &:active {
    background-color: ${orange20} !important;
  }
`;

export const DateText = styled.p`
  margin: 0;
  font-size: 12px;
  font-family: "Roboto", Arial, sans-serif;
  padding-left: 3px;
  margin-bottom: 5px;
  margin-top: 5px;
  white-space: pre-wrap;
  line-height: 14px;
`;
