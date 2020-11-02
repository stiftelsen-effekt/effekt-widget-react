import React, { useEffect, useState } from 'react'
import { getReferrals } from '../helpers/network'

interface Referral {
    ID: number;
    name: string;
    ordering: number;
}

export default function ReferralPane() {
    const [referrals, setReferrals] = useState<Referral[]>()

    useEffect(() => {
        getReferrals()
          .then(response => setReferrals(response))
          .catch((error) => console.log(error.message))
      }, [])

    function setupReferrals() {
        let referralsList: JSX.Element[] = []

        if (referrals) {
            referrals.forEach(ref => {
            referralsList.push(
                //TODO: Post referrals on onClick
                <button key={ref.ID} onClick={() => {}}>{ref.name}</button>
                )
            })
        }
        
        return referralsList
    }

    return (
        <div className="pane">
            <h1>Hvor hørte du om oss?</h1>
            <p>Valgfritt</p>
            <div className="pane">
                {setupReferrals()}
            </div>
            <button>Hopp over</button>
        </div>
    );
}