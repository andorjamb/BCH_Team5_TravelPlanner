import React, { Component } from "react";
import "./FlightView.css";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";

class FlightView extends Component {
  render() {

    return (
      <>
        <WelcomeUser />
        <h1>This is FlightView</h1>
      </>
    )
  }
}

export default FlightView;
