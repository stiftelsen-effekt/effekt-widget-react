import React from 'react'
import {PaneProps} from '../interfaces/PaneProps'

export const donationPane: PaneProps  = {
    name: "DonorPane",
    title: "Om donasjonen",
    forwardButton: true,
    backwardButton: true,
    //nextPane and previousPane are overwritten in Widget.js
    nextPane: () => {},
    previousPane: () => {},
    content: (
        <div>
            <form>
                <label>
                    <input type="radio" value="recommended"/>
                    Bruk vår anbefalte fordeling
                </label>
                <label>
                    <input type="radio" value="custom"/>
                    Jeg vil velge fordeling selv
                </label>
            </form>
        </div>
    )
}
