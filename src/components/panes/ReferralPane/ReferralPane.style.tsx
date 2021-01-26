import styled from "styled-components";

export const ReferralsWrapper = styled.div``;

export const ReferralButtonsWrapper = styled.div`
  white-space: normal;
  display: flex;
  align-items: space-between;
  flex-wrap: wrap;
  align-self: center;
`;

export const ReferralButton = styled.button`
  width: 48%;
  padding: 2%;
  padding-top: 3%;
  padding-bottom: 3%;
  margin: 1%;
  background-color: white;
  font-size: 14px;
  color: black;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 3px;
  box-shadow: 0 0 5px lightgray;
  text-align: start;

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`;

export const OtherInputWrapper = styled.div`
  width: 91%;
`;

export const OtherInput = styled.input`
  width: 100%;
  padding: 2%;
  padding-right: 5%;
  padding-top: 3%;
  padding-bottom: 3%;
  margin: 1%;
  background-color: white;
  font-size: 14px;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 3px;
  box-shadow: 0 0 5px lightgray;
  text-align: right;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const OtherLabel = styled.p`
  position: absolute;
  display: inline;
  margin-left: 15px;
  margin-top: 17px;
  color: black;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
`;
