import styled from "styled-components";
import { gray18 } from "../../../../config/colors";

export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RoundedBorder = styled.div`
  width: 92%;
  border: 1px solid ${gray18};
  border-radius: 5px;
  padding-left: 4%;
  padding-right: 4%;
`;

export const HorizontalLine = styled.div`
  height: 1px;
  background-color: ${gray18};
`;

export const TextWrapper = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  justify-content: space-between;
`;
