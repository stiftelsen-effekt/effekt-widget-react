import React, { useEffect, useState } from 'react';
import { PaneProps } from '../interfaces/PaneProps';
import Referral from '../interfaces/Referral'
import { getReferrals} from '../helpers/network'
import '../style/Pane.css'

const defaultReferral: Referral = {ID: 0, name: "", ordering: 0}

export default function ReferralPane(props: PaneProps) {
    const [referrals, setReferrals] = useState([defaultReferral])

    useEffect(() => {
        getReferrals().then( (result) => {
            setReferrals(result)
        } )
      }, []);

    function setupReferrals() {
        let referralsList: JSX.Element[] = []
        referrals.forEach(ref => {
            referralsList.push(
                <button key={ref.ID} onClick={() => {props.widget.nextPane()} }>{ref.name}</button>
            )
        })
        return referralsList
    }

    return (
        <div className="pane">
            <h1>Hvor hørte du om oss?</h1>
            <p>Valgfritt</p>
            <div>
                {setupReferrals()}
            </div>
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}