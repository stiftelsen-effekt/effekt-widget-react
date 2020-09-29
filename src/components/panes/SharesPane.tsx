import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function MethodPane(props: PaneProps) {

    const pretendDatabase = [
        {ID: 1, full_name: "Against malaria foundation", short_desc: "hfdj fgiljd sglkjgfdg"},
        {ID: 2, full_name: "GiveWell", short_desc: "mapjdqmk qpldm e,m,s"},
        {ID: 3, full_name: "Malaria Consortium", short_desc: "dmkjkvsaj uhjnwqk sde",}
    ]

    return (
        <div className="pane">
            <h1>Velg fordeling</h1>
            <div className="pane">
                {pretendDatabase.map(org => { return (<div key={org.ID}>{org.full_name}<input type="tel"></input></div>)})}
            </div>
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}