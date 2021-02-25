import styled from "styled-components";
import { gray18 } from "../../../../config/colors";

export const VippsButtonWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${gray18};
  border-radius: 5px;
`;

export const VippsButton = styled.div`
  width: 250px;
  height: 70px;
  background-image: url(https://storage.googleapis.com/effekt-widget/assets/vipps/vipps-btn.svg);
  background-size: 95%;
  background-position: center;
  background-repeat: no-repeat;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;
