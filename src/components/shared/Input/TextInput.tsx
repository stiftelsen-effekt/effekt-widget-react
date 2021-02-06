import React from "react";
import { ToolTip } from "../ToolTip/ToolTip";
import {
  TextInputField,
  TextInputLabel,
  TextInputProps,
  TextInputWrapper,
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
  return (
    <TextInputWrapper denomination={denomination}>
      {label && <TextInputLabel>{label}</TextInputLabel>}
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
