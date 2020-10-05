import React, { useState } from 'react'
import MethodPane from './panes/MethodPane'
import DonorPane from './panes/DonorPane'
import DonationPane from './panes/DonationPane'
import SharesPane from './panes/SharesPane'
import ReferralPane from './panes/ReferralPane'
import ResultPane from './panes/ResultPane'
import PanesType from './interfaces/Panes'
import validateInputs from './helpers/inputValidation'
import { getOrganizations } from './helpers/network'

function Widget() {
  const [currentPane, setCurrentPane] = useState("MethodPane")
  const [donorName, setDonorName] = useState("navn") // For dev
  const [method, setMethod] = useState("")
  const [email, setEmail] = useState("navn@testeffekt.no") // For dev
  const [SSN, setSSN] = useState("")
  const [sum, setSum] = useState("")
  const [taxDeduction, setTaxDeduction] = useState(false)
  const [privacyPolicy, setPrivacyPolicy] = useState(true) // For dev
  const [newsletter, setNewsletter] = useState(false)
  const [recommendedShare, setRecommendedShare] = useState(true)
  const [recurring, setRecurring] = useState(true)
  const [shares, setShares] = useState()
  const [error, setError] = useState("")

  let widget = {
    state: {
      currentPane: currentPane,
      method: method,
      donorName: donorName,
      email: email,
      SSN: SSN,
      sum: sum,
      taxDeduction: taxDeduction,
      privacyPolicy: privacyPolicy,
      newsletter: newsletter,
      recommendedShare: recommendedShare,
      recurring: recurring,
      error: error,
      setCurrentPane: setCurrentPane,
      setMethod: setMethod,
      setDonorName: setDonorName,
      setEmail: setEmail,
      setSSN: setSSN,
      setSum: setSum,
      setTaxDeduction: setTaxDeduction,
      setPrivacyPolicy: setPrivacyPolicy,
      setNewsletter: setNewsletter,
      setRecommendedShare: setRecommendedShare,
      setRecurring: setRecurring,
      setError: setError
    },
    prevPane: prevPane,
    nextPane: nextPane,
    nextButton: nextButton,
    prevButton: prevButton,
    errorField: errorField
  }

  getOrganizations().forEach(element => {
    
  })

  function nextPane() { 
    const errorMessage = validateInputs(currentPane, method, donorName, email, SSN, taxDeduction, privacyPolicy, sum)
    if (errorMessage === "") {
      if (currentPane === "DonationPane" && recommendedShare) {
        setCurrentPane("ReferralPane")
      }
      else {
        setCurrentPane(Panes[currentPane].props.nextPane)
      }
    }
    setError(errorMessage)
  }

  function prevPane() {
    if (currentPane === "ReferralPane" && recommendedShare) {
      setCurrentPane("DonationPane")
    }
    else {
      setCurrentPane(Panes[currentPane].props.prevPane) 
    }
    setError("")
  }

  function nextButton() { return (<button onClick={() => { nextPane() }}>Fram</button>) }

  function prevButton() { return (<button onClick={() => { prevPane() }}>Tilbake</button>) }

  function errorField() { return (<p> {error} </p>) }

  const Panes: PanesType = {
    MethodPane:   <MethodPane   widget={widget} nextPane="DonorPane"    prevPane="MethodPane" />,
    DonorPane:    <DonorPane    widget={widget} nextPane="DonationPane" prevPane="MethodPane" />,
    DonationPane: <DonationPane widget={widget} nextPane="SharesPane"   prevPane="DonorPane" />,
    SharesPane:   <SharesPane   widget={widget} nextPane="ReferralPane" prevPane="DonationPane" />,
    ReferralPane: <ReferralPane widget={widget} nextPane="ResultPane"   prevPane="SharesPane" />,
    ResultPane:   <ResultPane   widget={widget} nextPane="ResultPane"   prevPane="ReferralPane" />,
  }

  return (
    <div className="Widget">
      {Panes[currentPane]}
    </div>
  );
}

export default Widget;
