import React, { useState } from 'react';
import Pane from './Pane';
import { WidgetProps } from '../interfaces/WidgetProps'
import { render } from '@testing-library/react';
import { methodPane} from '../panes/methodPane';
import { donorPane } from '../panes/donorPane';
import { donationPane} from '../panes/donationPane';

function Widget() {
  const [paneNumber, setPaneNumber] = useState(0);

  function nextPane() {
    setPaneNumber(paneNumber + 1)
  }

  function previousPane() {
    setPaneNumber(paneNumber - 1)
  }

  const panes: JSX.Element[] = [
    <Pane name="MethodPane" title="Betalingsmåte" content={methodPane} forwardButton={true} backwardButton={true} nextPane={nextPane} previousPane={previousPane}/>,
    <Pane name="DonorPane" title="Om deg" content={donorPane} forwardButton={true} backwardButton={true} nextPane={nextPane} previousPane={previousPane}/>,
    <Pane name="DonationPane" title="Om donasjonen" content={donationPane} forwardButton={true} backwardButton={true} nextPane={nextPane} previousPane={previousPane}/>
  ]

  function renderPane(pane: JSX.Element) {
    return pane
  }

  return (
    <div className="Widget">
      {renderPane(panes[paneNumber])}
    </div>
  );
}

export default Widget;
