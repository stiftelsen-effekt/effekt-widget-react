/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { ToolTip } from "../../shared/ToolTip/ToolTip";
import {
  CheckBoxLabel,
  CheckBoxLabelWrapper,
  CheckMark,
  CustomCheckBoxWrapper,
  OrangeLink,
  StyledInput,
} from "./CustomCheckBox.style";

interface HyperLink {
  text: string;
  url: string;
}
interface CheckBoxProps {
  checked: boolean;
  label?: string;
  tooltipText?: string;
  hyperlink?: HyperLink;
}

export const CustomCheckBox: React.FC<CheckBoxProps> = ({
  checked,
  label,
  tooltipText,
  hyperlink,
}) => (
  <CustomCheckBoxWrapper>
    <StyledInput type="checkbox" tabIndex={-1} checked={checked} readOnly />
    <CheckMark className="checkmark" />
    <CheckBoxLabelWrapper>
      <CheckBoxLabel>
        {`${label} `}
        {hyperlink && (
          <OrangeLink target="_blank" href={hyperlink.url}>
            {hyperlink.text}
          </OrangeLink>
        )}
      </CheckBoxLabel>
      {tooltipText && <ToolTip text={tooltipText} />}
    </CheckBoxLabelWrapper>
  </CustomCheckBoxWrapper>
);
