/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import styled from "styled-components";

const TooltipIconButton = styled.button.attrs({
  name: "Info om skattefradrag",
  type: "button",
})`
  z-index: 4;
  pointer-events: all;
  background: transparent;
  border: none;
  padding: 5px 7.5px;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
interface ToolIconProps {
  handleTouch: () => void;
  handleHover: (open: boolean) => void;
}
export function ToolTipIcon({ handleTouch, handleHover }: ToolIconProps) {
  return (
    <TooltipIconButton
      onTouchStart={handleTouch}
      onClick={handleTouch}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <svg
        onPointerOut={() => (document.activeElement as HTMLElement).blur()}
        tabIndex={0}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth={0}
        viewBox="0 0 16 16"
        height="14px"
        width="14px"
      >
        <path
          fillRule="evenodd"
          d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
          clipRule="evenodd"
        />
        <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
      </svg>
    </TooltipIconButton>
  );
}
