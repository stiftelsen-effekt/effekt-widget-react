import React from 'react';

export default function ReferralPane() {

    

    function setupReferrals() {
        let referralsList: JSX.Element[] = []
        referrals.forEach(ref => {
            referralsList.push(
                <button key={ref.ID} onClick={() => {}>{ref.name}</button>
            )
        })
        return referralsList
    }

    return (
        <div className="pane">
            <h1>Hvor hørte du om oss?</h1>
            <p>Valgfritt</p>
            <div className="pane">
                {/* {pretendDatabase.map(ref => { return (<button key={ref.ID} onClick={() => {} }>{ref.name}</button>)})} */}
            </div>
            <div>
            </div>
        </div>
    );
}