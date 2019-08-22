import React from "react";

const userInput = props => {
  return (
    <div>
        <label> Username: &nbsp; 
      <input type="text" onChange={props.onChange} value={props.currentName} />
      </label>
    </div>
  );
};

export default userInput;
