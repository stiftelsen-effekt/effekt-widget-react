import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function DonationPane(props: PaneProps) {

    const method = props.widget.state.method

    function showSumField() {
        if (method === "PayPal" || "Vipps") {
            return (
                <div>
                    <input type="tel" placeholder="sum"></input>kr
                </div>
            )
        }
    }

    function showRecurringField() {
        if (method === "PayPal") {
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
    
    return (
        <div>
            <h1>Om donasjonen</h1>
            {showSumField()}
            {showRecurringField()}
            <form>
                <label>
                    <input type="radio" name="selectShare" value="recommended"/>
                    Bruk vår anbefalte fordeling
                </label>
                <br></br>
                <label>
                    <input type="radio" name="selectShare" value="custom"/>
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