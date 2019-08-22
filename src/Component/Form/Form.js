import React, { useState } from 'react';
import UserOutput from '../UserOutput/UserOutput';
import UserInput from '../UserInput/UserInput';
import './Form.css'


const Form = () => {
  const [username, setUsername] = useState("");
 
  const handleChangedUsername = (event) =>{
    let newUsername = event.target.value;
    setUsername(newUsername);
  }

  return (
   <div className="wrapper">
     <div className="innerWrapper">
     <UserInput onChange={handleChangedUsername} currentName={username}/>
     <hr/>
        <div className="bg">
        <UserOutput userName={username}/>
        </div>
        <hr/>
        <div className="bg">
        <UserOutput userName="daisy"/>
        </div>
        </div>
   </div>
  );
}

export default Form;