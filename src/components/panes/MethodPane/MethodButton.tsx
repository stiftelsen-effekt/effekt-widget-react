import React from "react";
import { MethodButtonWrapper } from "./MethodButton.style";

interface MethodButtonProps {
  onClick: () => void;
  onKeyDown: () => void;
  className: string;
}

export const MethodButton: React.FC<MethodButtonProps> = ({
  onClick,
  onKeyDown,
  className,
}) => {
  return (
    <MethodButtonWrapper
      tabIndex={0}
      className={className}
      onClick={() => {
        onClick();
        (document.activeElement as HTMLElement).blur();
      }}
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && onKeyDown()}
    />
  );
};
