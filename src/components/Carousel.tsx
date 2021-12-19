import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

import { State } from "../store/state";
import "./Carousel.style.css";

interface ICarouselProps {
  children: React.ReactNode[];
}

export const Carousel: React.FC<ICarouselProps> = ({ children }) => {
  const currentPaneNumber = useSelector(
    (state: State) => state.layout.paneNumber
  );

  return (
    <div id="carousel-wrapper">
      <div
        id="carousel"
        style={{
          transform: `translate3d(${currentPaneNumber * -100}%, 0px, 0px)`,
        }}
      >
        {children &&
          children
            .filter((child: ReactNode) => child !== false)
            .map((child: ReactNode, i: number) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="pane" key={i}>
                  {currentPaneNumber === i && child}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Carousel;
