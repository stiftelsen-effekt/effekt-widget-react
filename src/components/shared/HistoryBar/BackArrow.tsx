import React from "react";
import { gray20 } from "../../../config/colors";
import { BackArrowSVG } from "./HistoryBar.style";

interface BackArrowProps {
  onClick: () => void;
}

export const BackArrow: React.FC<BackArrowProps> = ({ onClick }) => {
  return (
    <BackArrowSVG
      tabIndex={0}
      stroke={gray20}
      fill={gray20}
      strokeWidth="0"
      version="1.1"
      viewBox="0 0 16 16"
      height="1.6em"
      width="1.6em"
      xmlns="http://www.w3.org/2000/svg"
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") onClick();
      }}
      onClick={onClick}
    >
      <path d="M6.293 13.707l-5-5c-0.391-0.39-0.391-1.024 0-1.414l5-5c0.391-0.391 1.024-0.391 1.414 0s0.391 1.024 0 1.414l-3.293 3.293h9.586c0.552 0 1 0.448 1 1s-0.448 1-1 1h-9.586l3.293 3.293c0.195 0.195 0.293 0.451 0.293 0.707s-0.098 0.512-0.293 0.707c-0.391 0.391-1.024 0.391-1.414 0z" />
    </BackArrowSVG>
  );
};
