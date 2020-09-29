import React, { useState } from 'react';
import MethodPane from './panes/MethodPane';
import DonorPane from './panes/DonorPane';
import DonationPane from './panes/DonationPane';
import SharesPane from './panes/SharesPane';
import ReferralPane from './panes/ReferralPane';

function Widget() {
  const [paneNumber, setPaneNumber] = useState(0)
  const [donorName, setDonorName] = useState("")
  const [method, setMethod] = useState("")
  const [email, setEmail] = useState("")
  const [SSN, setSSN] = useState("")

  let widget = {
    state: {
      paneNumber: paneNumber,
      donorName: donorName,
      method: method,
      email: email,
      SSN: SSN,
      setPaneNumber: setPaneNumber,
      setDonorName: setDonorName,
      setMethod: setMethod,
      setEmail: setEmail,
      setSSN: setSSN
    },
    prevPane: prevPane,
    nextPane: nextPane,
    prevButton: prevButton,
    nextButton: nextButton
  }

  function nextPane() {
    setPaneNumber(paneNumber + 1)
  }

  function prevPane() {
    setPaneNumber(paneNumber - 1)
  }

  function prevButton() {
    return (
      <button onClick={() => { prevPane() }}>Fram</button>
    )
  }

  function nextButton() {
    return (
      <button onClick={() => { nextPane() }}>Fram</button>
    )
  }

  const panes: JSX.Element[] = [
    <MethodPane   widget={widget} />,
    <DonorPane    widget={widget} />,
    <DonationPane widget={widget} />,
    <SharesPane   widget={widget} />,
    <ReferralPane widget={widget} />
  ]

  return (
    <div className="Widget">
      {panes[paneNumber]}
    </div>
  );
}

export default Widget;
