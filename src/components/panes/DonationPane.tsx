import React from 'react';
import { PaneProps } from './PaneProps';
import '../style/Pane.css'

export default function DonationPane(props: PaneProps) {

    const widgetState = props.widget.state

    function handleChange() {
        
    }

    // Allows only numbers and backspace
    // TODO: Fix bug: doesnt work with some special characters (*^`) and possibly more
    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        const numberRegex = new RegExp("[0-9]")
        if (!numberRegex.test(e.key) && e.keyCode !== 8) {
            e.preventDefault()
        }
    }

    function handleRecommended() {
        widgetState.setRecommendedShare(!widgetState.recommendedShare)
    }

    function handleRecurring() {
        widgetState.setRecurring(!widgetState.recurring)
    }

    function showSumField() {
        if (widgetState.method === "PayPal" || widgetState.method === "Vipps") {
            return (
                <div>
                    <input type="number" inputMode="numeric" placeholder="sum" onChange={handleChange} onKeyDown={handleKeyDown}></input>kr
                </div>
            )
        }
    }

    function showRecurringField() {
        if (widgetState.method === "PayPal") {
            return (
                <form>
                    <label>
                        <input type="radio" name="selectRecurring" onChange={handleRecurring} checked={widgetState.recurring}/>
                        Jeg vil gi en månedlig donasjon
                    </label>
                    <br></br>
                    <label>
                        <input type="radio" name="selectRecurring" onChange={handleRecurring} checked={!widgetState.recurring}/>
                        Jeg vil velge fordeling selv
                    </label>
                </form>
            )
        }
    }
    
    return (
        <div>
            <h1>Om donasjonen</h1>
            {showSumField()}
            {showRecurringField()}
            <form>
                <label>
                    <input type="radio" name="selectShare" onChange={handleRecommended} checked={widgetState.recommendedShare}/>
                    Bruk vår anbefalte fordeling
                </label>
                <br></br>
                <label>
                    <input type="radio" name="selectShare" onChange={handleRecommended} checked={!widgetState.recommendedShare}/>
                    Jeg vil velge fordeling selv
                </label>
            </form>
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}