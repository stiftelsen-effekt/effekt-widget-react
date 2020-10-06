import React from 'react';
import { PaneProps } from '../interfaces/PaneProps';
import { Share } from '../interfaces/Share'
import '../style/Pane.css'
 
export default function MethodPane(props: PaneProps) {
    //const [totalPercentage, setTotalPercentage] = useState(0)
    
    const widgetState = props.widget.state

    function handleShare(e: React.FormEvent<HTMLInputElement>, orgName: string) {
        let newShares: Share[] = widgetState.shares

        const orgShare: Share | undefined = newShares.find(share => share.full_name === orgName)
        
        if (orgShare !== undefined) {
            const isChangedOrg = (org: Share) => org === orgShare;
            newShares[newShares.findIndex(isChangedOrg)].share = parseInt(e.currentTarget.value)

            //TODO: Organisasjonslisten oppdateres ikke ved endringer
            //Hvorfor oppdateres ikke organisajonslisten når state oppdateres?
            widgetState.setShares(newShares)
        }
    }

    function showPercentage() {
        return (
        <div>Du har fordelt av 100%</div>
        )
    }
    
    return (
        <div className="pane">
            <h1>Velg fordeling</h1>
            <div className="pane">
                {widgetState.shares.map(org => { return (
                    <div key={org.ID}> {org.full_name} 
                        <input 
                            type="number" 
                            inputMode="decimal"                              
                            placeholder="0" 
                            name={org.full_name} 
                            value={org.share}
                            onChange={e => handleShare(e, org.full_name)}>
                        </input>
                    </div>
                )})}
            </div>
            {showPercentage()}
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}