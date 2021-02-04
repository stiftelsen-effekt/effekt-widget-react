import React from "react";
import {
  TextInputField,
  TextInputProps,
  TextInputWrapper,
} from "./TextInput.style";

export const TextInput: React.FC<TextInputProps> = ({
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
    <TextInputWrapper label={label} denomination={denomination}>
      <TextInputField
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
