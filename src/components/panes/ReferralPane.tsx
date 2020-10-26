import React from 'react';

export default function ReferralPane() {

    const pretendDatabase = [
        {ID: 1, name: "Anbefaling av en bekjent"},
        {ID: 2, name: "Twitter"},
        {ID: 3, name: "Facebook"}
    ]

    return (
        <div className="pane">
            <h1>Hvor hørte du om oss?</h1>
            <p>Valgfritt</p>
            <div className="pane">
                {pretendDatabase.map(ref => { return (<button key={ref.ID} onClick={() => {} }>{ref.name}</button>)})}
            </div>
            <div>
            </div>
        </div>
    );
}