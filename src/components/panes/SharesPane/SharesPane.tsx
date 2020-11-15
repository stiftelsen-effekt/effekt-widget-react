import React from 'react';
import { PaneContainer } from '../Panes.style';

export default function SharesPane() {

    interface Organization {
        ID: string;
        full_name: string;
        share: number;
    }

    const shares: Organization[] = []
    
    function setupSharesList() {
        let sharesList: JSX.Element[] = []
        shares.forEach(org => { 
            sharesList.push(<div key={org.ID}> {org.full_name} 
                <input 
                    type="number" 
                    inputMode="decimal" 
                    placeholder=""                         
                    name={org.full_name} 
                    value={isNaN(org.share) ? "" : org.share}>
                </input>
            </div>)
        })
        return sharesList
    }

    function showPercentage() {
        return (
        <div>Du har fordelt {} av 100%</div>
        )
    }
    
    return (
        <PaneContainer>
            <h1>Velg fordeling</h1>
            <div className="pane">
                {setupSharesList()}
            </div>
            {showPercentage()}
            <div>
            </div>
        </PaneContainer>
    );
}