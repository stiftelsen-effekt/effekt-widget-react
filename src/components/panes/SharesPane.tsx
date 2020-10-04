import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function MethodPane(props: PaneProps) {

    const pretendDatabase = [
        {ID: 1, full_name: "Against malaria foundation", short_desc: "Against Malaria Foundation driver preventivt arbeid gjennom distribusjon av impregnerte malarianett. Studier viser at for 8kr beskyttes én person i minst ett år."},
        {ID: 2, full_name: "GiveWell", short_desc: "GiveWell gjør en kontinuerlig vurdering av saksområder for å finne de mest trengende sakene, pengene utdeles så kvartalsvis til de mest effektive organisasjonene."},
        {ID: 3, full_name: "Malaria Consortium", short_desc: "Malaria Consortium utfører seasonal malaria chemoprevention (SMC) som forhindrer smitte  i Afrika, studier viser at denne metoden er svært kostnadseffektiv.",}
    ]

    return (
        <div className="pane">
            <h1>Velg fordeling</h1>
            <div className="pane">
                {pretendDatabase.map(org => { return (<div key={org.ID}>{org.full_name}<input type="text" maxLength={3} inputMode="numeric"></input></div>)})}
            </div>
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}