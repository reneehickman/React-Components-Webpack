import React from 'react';
import './UserOutput.css'

const userOutput = (props) =>{



    return (
        <div>
            <p><span>Username:</span> {props.userName}</p>
            <p>This shows the username for <strong>{props.userName}</strong></p>
        </div>
    )
};

export default userOutput;