import styled from "styled-components";

export const VippsButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const VippsButton = styled.div`
  width: 250px;
  height: 50px;
  background-image: url(https://storage.googleapis.com/effekt-widget/assets/vipps/vipps-btn.svg);
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;

  &:active {
    outline: none;
  }

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;
