import React from "react";
import { ToolTip } from "../ToolTip/ToolTip";
import {
  TextInputField,
  ComputerInputLabel,
  TextInputProps,
  TextInputWrapper,
  MobileInputLabel,
} from "./TextInput.style";

export const TextInput: React.FC<TextInputProps> = ({
  tooltipText,
  label,
  denomination,
  name,
  type,
  inputMode,
  placeholder,
  defaultValue,
  innerRef,
  selectOnClick,
  value,
  onChange,
}) => {
  let mobileLabel;
  // Labels longer than 6 characters are abbreviated
  if (label && label.length > 6) {
    mobileLabel =
      label === "Drift av gieffektivt.no"
        ? "Egen drift"
        : label?.match(/[A-Z]/g)?.join("");
  } else {
    mobileLabel = label;
  }
  return (
    <TextInputWrapper denomination={denomination}>
      {label && <ComputerInputLabel>{label}</ComputerInputLabel>}
      {label && <MobileInputLabel>{mobileLabel}</MobileInputLabel>}
      {tooltipText && <ToolTip text={tooltipText} />}
      <TextInputField
        tooltipText={tooltipText}
        label={label}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        defaultValue={defaultValue}
        denomination={denomination}
        ref={innerRef}
        value={value}
        onChange={onChange}
        onClick={(e) => {
          if (selectOnClick) e.currentTarget.select();
        }}
      />
    </TextInputWrapper>
  );
};
