import React, { useState } from 'react'
import MethodPane from './panes/MethodPane'
import DonorPane from './panes/DonorPane'
import DonationPane from './panes/DonationPane'
import SharesPane from './panes/SharesPane'
import ReferralPane from './panes/ReferralPane'
import ResultPane from './panes/ResultPane'

function Widget() {
  const [currentPane, setCurrentPane] = useState("MethodPane")
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
      currentPane: currentPane,
      method: method,
      donorName: donorName,
      email: email,
      SSN: SSN,
      taxDeduction: taxDeduction,
      privacyPolicy: privacyPolicy,
      newsletter: newsletter,
      recommendedShare: recommendedShare,
      recurring: recurring,
      setCurrentPane: setCurrentPane,
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

  function prevPane() { setCurrentPane(paneObjects[currentPane].props.prevPane) }

  function nextPane() { setCurrentPane(paneObjects[currentPane].props.nextPane) }

  function prevButton() { return (<button onClick={() => { prevPane() }}>Tilbake</button>) }

  function nextButton() { return (<button onClick={() => { nextPane() }}>Fram</button>) }

  interface Panes {
    [paneName: string]: JSX.Element
  }

  const paneObjects: Panes = {
    MethodPane:   <MethodPane widget={widget} nextPane="DonorPane" prevPane="MethodPane" />,
    DonorPane:    <DonorPane widget={widget} nextPane="DonationPane" prevPane="MethodPane" />,
    DonationPane: <DonationPane widget={widget} nextPane={"SharesPane"} prevPane="DonorPane" />,
    SharesPane:   <SharesPane widget={widget} nextPane="ReferralPane" prevPane="DonationPane" />,
    ReferralPane: <ReferralPane widget={widget} nextPane="ResultPane" prevPane={"SharesPane"} />,
    ResultPane:   <ResultPane widget={widget} nextPane="ResultPane" prevPane="ReferralPane" />,
  }

  return (
    <div className="Widget">
      {paneObjects[currentPane]}
    </div>
  );
}

export default Widget;
