import React, { useState } from 'react';
import Pane from './Pane';
import { WidgetProps } from '../interfaces/WidgetProps'
import { methodPane} from '../panes/methodPane';
import { donorPane } from '../panes/donorPane';
import { donationPane} from '../panes/donationPane';
import { PaneProps } from '../interfaces/PaneProps';

function Widget() {
  const [paneNumber, setPaneNumber] = useState(0);
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("")

  function nextPane() {
    setPaneNumber(paneNumber + 1)
  }

  function previousPane() {
    setPaneNumber(paneNumber - 1)
  }

  const panes: PaneProps[] = [
    methodPane,
    donorPane,
    donationPane
  ]

  function renderPane(pane: PaneProps) {
    return (
      <Pane 
        name={pane.name} 
        title={pane.title} 
        content={pane.content} 
        forwardButton={pane.forwardButton} 
        backwardButton={pane.backwardButton} 
        nextPane={nextPane} 
        previousPane={previousPane}
      />
    )
  }

  return (
    <div className="Widget">
      {renderPane(panes[paneNumber])}
    </div>
  );
}

export default Widget;
