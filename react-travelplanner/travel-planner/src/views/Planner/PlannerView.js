import React, { Component } from "react";
import "./PlannerView.css";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";

class PlannerView extends Component {
  render() {
    return (
      <div className="planner-view">
        {/* <WelcomeUser /> */}
        <div className="cover-img"></div>
        <div className="plan-title">
          <div>
            <h1>Trip 1</h1>
            <h2>Add trip dates</h2>
            <input type="date"></input>
          </div>
          <div>
            <span class="material-symbols-outlined">edit_square</span>
          </div>
        </div>
      </div>
    );
  }
}

export default PlannerView;
