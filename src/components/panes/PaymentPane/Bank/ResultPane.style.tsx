import styled from "styled-components";
import { gray18 } from "../../../../config/colors";

export const PaymentTitle = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
`;

export const UnderTitle = styled.p`
  margin: 15px;
  margin-left: 5px;
  font-size: 15px;
`;

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

export const InfoText = styled.div`
  margin-left: 5px;
  margin-top: 15px;
  font-size: 15px;
  white-space: pre-wrap;
`;
