import React from "react";
import { MethodButtonWrapper } from "./MethodButton.style";

interface MethodButtonProps {
  onClick: () => void;
  className: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const MethodButton: React.FC<MethodButtonProps> = ({
  onClick,
  className,
  disabled,
  children,
}) => {
  return (
    <MethodButtonWrapper
      style={disabled ? { opacity: 0.5, cursor: "auto" } : {}}
      className={className}
      onClick={() => {
        onClick();
      }}
    >
      {children != null ? children : null}
    </MethodButtonWrapper>
  );
};
