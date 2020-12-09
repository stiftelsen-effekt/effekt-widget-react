import styled from "styled-components";

export const ReferralsWrapper = styled.div`
  width: 240px;
  white-space: normal;
  display: flex;
  align-items: space-between;
  width: 240px;
  flex-wrap: wrap;
`;

export const OtherInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const OtherInput = styled.textarea`
  margin-top: 10px;
  width: 200px;
  height: 100px;
  padding: 5px;
`;

export const ReferralButton = styled.button`
  width: 110px;
  padding: 5px;
  margin: 5px;
  background: #f8f1e5;
  border: 1px solid #dfd2c5;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
