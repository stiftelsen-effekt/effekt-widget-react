import styled from "styled-components";
import { gray18 } from "../../../../config/colors";
import paypalbutton from "./paypal_button.png";

export const PayPalButton = styled.input`
  background-image: url(${paypalbutton});
  background-position: center;
  background-size: 95%;
  background-repeat: no-repeat;
  background-color: white;
  width: 250px;
  height: 100px;
  border: none;

  &:active {
    outline: none;
  }

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export const PayPalFormWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${gray18};
  border-radius: 5px;
`;

export const PayPalForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrangeSubmit = styled.input`
  background-color: #ffaa2b;
  border: none;
  width: 130px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 18px;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;
