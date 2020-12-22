import React, { useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { State } from '../store/state';
import "./Carousel.style.css"

//

function Carousel(props: any) {
  const [currentPaneNumber, setCurrentPaneNumber] = useState(0) // get from redux global state
  const reduxPaneNumber = useSelector((state: State) => state.layout.paneNumber);
  const [numberOfPanes, setNumberOfPanes] = useState(0)
  const [renderedPanes, setRenderedPanes] = useState([1])
  const renderedPanesRef = useRef(renderedPanes)
  renderedPanesRef.current = renderedPanes
  const currentPaneNumberRef = useRef(currentPaneNumber)
  currentPaneNumberRef.current = currentPaneNumber

  useEffect(() => {
    const panes = document.getElementById("carousel")?.childNodes.length
    setNumberOfPanes(panes ? panes : 0)
  }, [])

  // This hook detects when paneNumber changes in the Redux store
  useEffect(() => {
    if (reduxPaneNumber > currentPaneNumber) {
      changePaneByOffset(1)
    }
    else if (reduxPaneNumber < currentPaneNumber) {
      changePaneByOffset(-1)
    }
  }, [reduxPaneNumber])

  const changePaneByOffset = (offset: number) => {
    let newRenderedPanes = [...renderedPanes]
    newRenderedPanes[currentPaneNumber + offset] = 1
    setRenderedPanes(newRenderedPanes)
    
    setCurrentPaneNumber(currentPaneNumber + offset)

    setTimeout(() => {
      let newRenderedPanes = [...renderedPanesRef.current]
      newRenderedPanes[currentPaneNumberRef.current - offset] = 0
      setRenderedPanes(newRenderedPanes)
    }, 200)
  }

  //TODO: Remove
  const prevPane = () => {
    if (currentPaneNumber > 0) {
      changePaneByOffset(-1)
    }
  }

  //TODO: Remove
  const nextPane = () => {
    if (currentPaneNumber < numberOfPanes - 1) {
     changePaneByOffset(1)
    }
  }
 
  return (
    <div id="carousel-wrapper">
      <div id="carousel" style={{transform: `translate3d(${(currentPaneNumber * -100)}%, 0px, 0px)`}}>
        {props.children.map((child: any, i: number) => {
          return <div className="pane" key={i}>{renderedPanes[i] === 1 && child}</div>
        })}
      </div>
    </div>
  )
}

export default Carousel;
