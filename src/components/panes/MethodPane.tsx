import React, { useState } from 'react';
import { PaneProps } from '../interfaces/PaneProps';
import '../Pane.css'

export default function MethodPane(props: PaneProps) {

    const handleBackward = () => {
        props.previousPane()
    }
    const backwardButton = () => { return props.backwardButton ? <button onClick={handleBackward}>Tilbake</button> : null}
    const handleForward = () => {props.nextPane()}
    const forwardButton = () => { return props.backwardButton ? <button onClick={handleForward}>Fram</button> : null}

    return (
        <div className="pane">
            <h1>{props.title}</h1>
            {props.content}
            <div>{backwardButton()}{forwardButton()}</div>
        </div>
    );
}