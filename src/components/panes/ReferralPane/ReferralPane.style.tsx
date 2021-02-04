import styled from "styled-components";
import { gray18 } from "../../../config/colors";

export const ReferralsWrapper = styled.div``;

export const ReferralButtonsWrapper = styled.div`
  margin-top: 24px;
  white-space: normal;
  columns: 2;
`;

export const ReferralButton = styled.button`
  width: 100%;
  padding-top: 19px;
  padding-bottom: 19px;
  padding-left: 15px;
  margin-bottom: 15px;
  background-color: white;
  font-size: 14px;
  color: black;
  border: 1px solid ${gray18};
  border-radius: 5px;
  box-shadow: 3px;
  box-shadow: 0 0 5px lightgray;
  text-align: start;

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`;
