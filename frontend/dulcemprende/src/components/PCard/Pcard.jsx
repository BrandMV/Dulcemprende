import React from "react";
import "./style.css";

const PCard = (props) => {
  return (
    <div className="col-4" {...props}>
        

      {props.children}
    </div>
  );
};

export default PCard;