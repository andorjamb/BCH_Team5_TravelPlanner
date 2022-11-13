import React, { Component } from "react";
import "./PlannerView.css";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";

class PlannerView extends Component {
  render() {
    return (
      <>
        <WelcomeUser />
        <h1>This is PlannerView</h1>
      </>
    )
  }
}

export default PlannerView;
