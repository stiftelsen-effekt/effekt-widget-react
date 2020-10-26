import React from 'react';

export default function DonationPane() {

    function showSumField() {
        return (
            <div>
                <input type="tel" placeholder="sum"></input>kr
            </div>
        )
    }

    function showPayPalField() {
        return (
            <form>
                <label>
                    <input type="radio" name="selectRecurring"/>
                    Jeg vil gi en månedlig donasjon
                </label>
                <br></br>
                <label>
                    <input type="radio" name="selectRecurring"/>
                    Jeg vil velge fordeling selv
                </label>
            </form>
        )
    }
    
    return (
        <div>
            <h1>Om donasjonen</h1>
            <form>
                <label>
                    <input type="radio" name="selectShare" />
                    Bruk vår anbefalte fordeling
                </label>
                <br></br>
                <label>
                    <input type="radio" name="selectShare" />
                    Jeg vil velge fordeling selv
                </label>
            </form>
            <div>
            </div>
        </div>
    );
}