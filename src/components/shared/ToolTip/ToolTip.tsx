/* eslint-disable react/destructuring-assignment */
import React from "react";
import styled from "styled-components";
import { gray18 } from "../../../config/colors";
import { ToolTipIcon } from "./ToolTipIcon";

const ToolTipWrapper = styled.div`
  position: relative;
  display: inline;
  margin-left: -365px;
  top: -9px;
`;

const ToolTipText = styled.span`
  font-size: 14px;
  border: 1px solid ${gray18};
  border-radius: 5px;
  background-color: white;
  height: 70px;
  width: 210px;
  top: -100px;
  padding: 10px;
  margin-left: 100px;
  position: absolute;
  display: none;
  white-space: pre-wrap;
`;

interface ToolTipProps {
  text: string;
}

export const ToolTip: React.FC<ToolTipProps> = (props) => {
  return (
    <ToolTipWrapper>
      <ToolTipIcon />
      <ToolTipText>{props.text}</ToolTipText>
    </ToolTipWrapper>
  );
};
