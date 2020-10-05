import React from 'react';
import { PaneProps } from '../interfaces/PaneProps';
import '../style/Pane.css'

export default function DonationPane(props: PaneProps) {

    const widgetState = props.widget.state

    function handleSum(e: React.FormEvent<HTMLInputElement>) { widgetState.setSum(e.currentTarget.value) }

    function handleRecommended() { widgetState.setRecommendedShare(!widgetState.recommendedShare) }

    function handleRecurring() { widgetState.setRecurring(!widgetState.recurring) }

    function showSumField() {
        if (widgetState.method === "PayPal" || widgetState.method === "Vipps") {
            return (
                <div>
                    <input type="number" inputMode="numeric" placeholder="sum" onChange={handleSum} value={widgetState.sum}></input>kr
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
                        Jeg vil gi en engangsdonasjon
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
            {props.widget.errorField()}
        </div>
    );
}