import React from 'react';
import { PaneProps } from '../interfaces/PaneProps';
import { getOrganizations } from '../helpers/network'
import '../style/Pane.css'
 
export default function MethodPane(props: PaneProps) {
    //const [totalPercentage, setTotalPercentage] = useState(0)
    
    //const widgetState = props.widget.state

    function handleShare() {

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
                {getOrganizations().map(org => { return (
                    <div key={org.ID}> {org.full_name} 
                        <input 
                            type="number" 
                            inputMode="decimal"                              
                            placeholder="0" 
                            name={org.full_name} 
                            onChange={handleShare}>
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