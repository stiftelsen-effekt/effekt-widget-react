/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import "./CustomCheckBox.css";

interface CheckBoxProps {
  checked: boolean;
}

export const CustomCheckBox: React.FC<CheckBoxProps> = (props) => (
  <label className="container">
    {props.checked ? (
      <input type="checkbox" checked />
    ) : (
      <input type="checkbox" />
    )}
    <span className="checkmark" />
  </label>
);
