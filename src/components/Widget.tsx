import React, { useState } from 'react'
import MethodPane from './panes/MethodPane'
import DonorPane from './panes/DonorPane'
import DonationPane from './panes/DonationPane'
import SharesPane from './panes/SharesPane'
import ReferralPane from './panes/ReferralPane'
import ResultPane from './panes/ResultPane'
import PanesType from './interfaces/Panes'
import EmailValidator from 'email-validator'

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
  const [error, setError] = useState("")

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
      error: error,
      setCurrentPane: setCurrentPane,
      setMethod: setMethod,
      setDonorName: setDonorName,
      setEmail: setEmail,
      setSSN: setSSN,
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

  const letters = /^[A-Za-z]+$/;
  const numbers = /^[0-9]+$/;

  function nextPane() { 
    if (currentPane === "DonorPane") {
      if (!donorName.match(letters)) { 
        setError("Ikke et gyldig navn")
        return 
      }
      else if (donorName.length < 3 || donorName.length > 32) { 
        setError("Ikke et gyldig navn")
        return 
      }
      else if (!EmailValidator.validate(email)) { 
        setError("Ikke en gyldig email")
        return 
      }
      else if (taxDeduction) {
        if (!SSN.match(numbers) || SSN.length !== 11) {
          setError("Ikke et gyldig fødselsnummer")
          return
        }
      }
      else if (!privacyPolicy) { 
        setError("Du må godkjenne personvernerklæringen")
        return
      }
    }
    else if (currentPane === "DonationPane" && recommendedShare) {
      setCurrentPane("ReferralPane")
      return
    }
    setError("")
    setCurrentPane(Panes[currentPane].props.nextPane) 
  }

  function prevPane() { 
    if (currentPane === "ReferralPane" && recommendedShare) {
      setCurrentPane("DonationPane")
    }
    else {
      setCurrentPane(Panes[currentPane].props.prevPane) 
    }
  }

  function nextButton() { return (<button onClick={() => { nextPane() }}>Fram</button>) }

  function prevButton() { return (<button onClick={() => { prevPane() }}>Tilbake</button>) }

  function errorField() { return (<p>{error}</p>) }

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
