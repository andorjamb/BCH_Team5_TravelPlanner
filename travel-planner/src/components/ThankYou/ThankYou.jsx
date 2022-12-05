import React from "react";
import thanks from "./thanks.png";
import "./ThankYou.css";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="thankyou">
      <img src={thanks} alt="" />
      <p>
        Your plan has been saved. You can view and make changes to your plan in
        the Plan view.
      </p>
      <p>Have a safe trip !</p>
      <Link to="/planner">
        <button>Back to planner</button>
      </Link>
    </div>
  );
};

export default ThankYou;
