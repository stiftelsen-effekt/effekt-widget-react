/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import "./CustomCheckBox.css";

interface CheckBoxProps {
  checked: boolean;
}

export const CustomCheckBox: React.FC<CheckBoxProps> = ({ checked }) => (
  <label className="container">
    <input type="checkbox" tabIndex={-1} checked={checked} readOnly />
    <span className="checkmark" />
  </label>
);
