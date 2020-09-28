import React from 'react'
import {PaneProps} from '../interfaces/PaneProps'

export const donorPane: PaneProps  = {
    name: "DonorPane",
    title: "Om donasjonen",
    forwardButton: true,
    backwardButton: true,
    //nextPane and previousPane are overwritten in Widget.js
    nextPane: () => {},
    previousPane: () => {},
    content: (
        <div className="pane">
            <input type="text" placeholder="Navn" maxLength={100}></input>
            <input type="text" placeholder="Email" maxLength={100}></input>
            <div><input type="checkbox" id="check-tax-deduction"></input>Jeg ønsker skattefradrag</div>
            <div><input type="checkbox" id="check-privacy-policy"></input>Jeg godtar <a href="https://gieffektivt.no/samarbeid-drift#personvern">personvernerklæringen *</a></div>
            <div><input type="checkbox" id="check-newsletter"></input>Jeg ønsker å melde meg på nyhetsbrevet</div>
        </div>
    )
}