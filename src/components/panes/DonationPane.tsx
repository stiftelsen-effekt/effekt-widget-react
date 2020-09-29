import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function DonationPane(props: PaneProps) {

    const widgetState = props.widget.state

    function showSumField() {
        if (widgetState.method === "PayPal" || widgetState.method === "Vipps") {
            return (
                <div>
                    <input type="tel" placeholder="sum"></input>kr
                </div>
            )
        }
    }

    function showRecurringField() {
        if (widgetState.method === "PayPal") {
            return (
                <form>
                    <label>
                        <input type="radio" name="selectRecurring" value="recommended"/>
                        Jeg vil gi en månedlig donasjon
                    </label>
                    <br></br>
                    <label>
                        <input type="radio" name="selectRecurring" value="custom"/>
                        Jeg vil velge fordeling selv
                    </label>
                </form>
            )
        }
    }

    function handleNext() {
        //Pane 4 is ReferralPane
        if (widgetState.recommendedShare) {
            widgetState.setPaneNumber(4)
        }
        //Pane 3 is SharesPane
        else {
            widgetState.setPaneNumber(3)
        }
    }

    function handleRecommended() {
        widgetState.setRecommendedShare(!widgetState.recommendedShare)
    }
    
    return (
        <div>
            <h1>Om donasjonen</h1>
            {showSumField()}
            {showRecurringField()}
            <form>
                <label>
                    <input type="radio" name="selectShare" value="recommended" onChange={handleRecommended} checked={widgetState.recommendedShare}/>
                    Bruk vår anbefalte fordeling
                </label>
                <br></br>
                <label>
                    <input type="radio" name="selectShare" value="custom" onChange={handleRecommended} checked={!widgetState.recommendedShare}/>
                    Jeg vil velge fordeling selv
                </label>
            </form>
            <div>
                {props.widget.prevButton()}
                <button onClick={handleNext}>Fram</button>
            </div>
        </div>
    );
}