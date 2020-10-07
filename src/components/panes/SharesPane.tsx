import React, { useState } from 'react';
import { PaneProps } from '../interfaces/PaneProps';
import Share from '../interfaces/Share'
import '../style/Pane.css'
 
export default function MethodPane(props: PaneProps) {

    const widgetState = props.widget.state

    const [totalPercentage, setTotalPercentage] = useState(0)

    function handleShare(e: React.FormEvent<HTMLInputElement>, orgName: string) {
        let newShares: Share[] = [...widgetState.shares]

        const orgShare: Share | undefined = newShares.find(share => share.full_name === orgName)
        
        if (orgShare !== undefined) {
            const isChangedOrg = (org: Share) => org === orgShare;
            const value = e.currentTarget.value 
            newShares[newShares.findIndex(isChangedOrg)].share = parseInt(value)
 
            widgetState.setShares(newShares)
        }

        let newPercentage: number = 0
        widgetState.shares.forEach(org => {
            newPercentage += (isNaN(org.share) ? 0 : org.share)
        })
        setTotalPercentage(newPercentage)
    }
    
    function setupSharesList() {
        let sharesList: JSX.Element[] = []
        widgetState.shares.forEach(org => { 
            sharesList.push(<div key={org.ID}> {org.full_name} 
                <input 
                    type="number" 
                    inputMode="decimal" 
                    placeholder=""                         
                    name={org.full_name} 
                    value={isNaN(org.share) ? "" : org.share}
                    onChange={e => handleShare(e, org.full_name)}>
                </input>
            </div>)
        })
        return sharesList
    }

    function showPercentage() {
        return (
        <div>Du har fordelt {totalPercentage} av 100%</div>
        )
    }
    
    return (
        <div className="pane">
            <h1>Velg fordeling</h1>
            <div className="pane">
                {setupSharesList()}
            </div>
            {showPercentage()}
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}