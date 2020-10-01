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
  const [taxDeduction, setTaxDeduction] = useState(false)
  const [privacyPolicy, setPrivacyPolicy] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [recommendedShare, setRecommendedShare] = useState(true)
  const [recurring, setRecurring] = useState(true)

  let widget = {
    state: {
      paneNumber: paneNumber,
      method: method,
      donorName: donorName,
      email: email,
      SSN: SSN,
      taxDeduction: taxDeduction,
      privacyPolicy: privacyPolicy,
      newsletter: newsletter,
      recommendedShare: recommendedShare,
      recurring: recurring,
      setPaneNumber: setPaneNumber,
      setMethod: setMethod,
      setDonorName: setDonorName,
      setEmail: setEmail,
      setSSN: setSSN,
      setTaxDeduction: setTaxDeduction,
      setPrivacyPolicy: setPrivacyPolicy,
      setNewsletter: setNewsletter,
      setRecommendedShare: setRecommendedShare,
      setRecurring: setRecurring
    },
    prevPane: prevPane,
    nextPane: nextPane,
    prevButton: prevButton,
    nextButton: nextButton
  }

  function nextPane() {
    if (paneNumber === 2 && recommendedShare === true) {
      setPaneNumber(paneNumber + 2)
    }
    else {
      setPaneNumber(paneNumber + 1)
    }
  }

  function prevPane() {
    if (paneNumber === 4 && recommendedShare === true) {
      setPaneNumber(paneNumber - 2)
    }
    else {
      setPaneNumber(paneNumber - 1)
    }
  }

  function prevButton() {
    return (
      <button onClick={() => { prevPane() }}>Tilbake</button>
    )
  }

  function nextButton() {
    return (
      <button onClick={() => { nextPane() }}>Fram</button>
    )
  }

  const panes: JSX.Element[] = [
    <MethodPane widget={widget} />,
    <DonorPane widget={widget} />,
    <DonationPane widget={widget} />,
    <SharesPane widget={widget} />,
    <ReferralPane widget={widget} />
  ]

  return (
    <div className="Widget">
      {panes[paneNumber]}
    </div>
  );
}

export default Widget;
