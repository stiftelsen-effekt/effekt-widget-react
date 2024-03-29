import styled from "styled-components";
import { gray20, orange20, orange15 } from "../../../config/colors";

export const MethodButtonWrapper = styled.button`
  padding: 20px 16px;
  height: 80px;
  border: none;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
  width: 100%;
  transition: all 90ms;
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding-right: 56px;
  color: ${gray20};
  position: relative;

  &:active {
    box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.15) !important;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 1.5px ${orange15};
  }

  &.bank {
    background-image: url("https://storage.googleapis.com/effekt-widget/assets/logos/bank.png");
    background-position: 16px 8px;
    background-size: 120px;
    background-repeat: no-repeat;
  }

  &.vipps {
    background-image: url("https://storage.googleapis.com/effekt-widget/assets/logos/vipps.png");
    background-position: 16px 25px;
    background-size: 120px;
    background-repeat: no-repeat;
  }

  &.paypal {
    background-image: url("https://storage.googleapis.com/effekt-widget/assets/logos/PayPal.png");
    background-position: 16px center;
    background-size: 120px;
    background-repeat: no-repeat;
  }

  &.method-button--highlighted {
    border: 1px solid ${orange20};
  }

  &::after {
    content: "";
    position: absolute;
    right: 16px;
    top: 0;
    height: 100%;
    width: 32px;
    background-image: url("https://storage.googleapis.com/effekt-widget/assets/next.svg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
