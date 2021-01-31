import styled from "styled-components";

export const PayPalFormWrapper = styled.div`
  width: 100%;
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
