import React, { useEffect } from 'react';
import { PaneContainer } from '../Panes.style';
import { getOrganizations } from '../../helpers/network'
import { Organization } from './../../interfaces/Organization'
import { Share } from './../../interfaces/Share'

export default function SharesPane() {
    let organizations: Organization[];

    useEffect(() => {
        getOrganizations().then(result => {
            organizations = result
        })
    }, [])
    
    function setupSharesList() {
        let sharesList: JSX.Element[] = []
        if (organizations) {
            organizations.forEach(org => { 
                sharesList.push(<div key={org.id}> {org.name} 
                    <input 
                        type="number" 
                        inputMode="decimal" 
                        placeholder=""                         
                        name={org.name} 
                        value={isNaN(org.standardShare) ? "" : org.standardShare}>
                    </input>
                </div>)
            })
        }
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