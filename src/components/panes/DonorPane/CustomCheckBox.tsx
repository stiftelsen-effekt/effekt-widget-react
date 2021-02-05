/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { ToolTip } from "../../shared/ToolTip/ToolTip";
import {
  CheckBoxLabel,
  CheckBoxLabelWrapper,
  CheckMark,
  CustomCheckBoxWrapper,
  StyledInput,
} from "./CustomCheckBox.style";

interface CheckBoxProps {
  checked: boolean;
  label?: string;
  tooltipText?: string;
}

export const CustomCheckBox: React.FC<CheckBoxProps> = ({
  checked,
  label,
  tooltipText,
}) => (
  <CustomCheckBoxWrapper>
    <StyledInput type="checkbox" tabIndex={-1} checked={checked} readOnly />
    <CheckMark className="checkmark" />
    <CheckBoxLabelWrapper>
      <CheckBoxLabel>{label}</CheckBoxLabel>
      {tooltipText && <ToolTip text={tooltipText} />}
    </CheckBoxLabelWrapper>
  </CustomCheckBoxWrapper>
);
