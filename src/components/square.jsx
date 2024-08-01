import React from "react";
import "../App.css";

const square = ({ val, chooseSquare }) => {
  return (
    <div className="square" onClick={chooseSquare}>
        {val}
    </div>
  );
};

export default square;
