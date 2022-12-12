import React, { Component } from "react";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import CityExplore from "../../components/CityExplore/CityExplore";
//import Account from "../../components/Account/Account";
import "./ExploreView.css";



class ExploreView extends Component {

  state = {
    user: 'Username'
  };

  render() {
    const viewShown = (
      <div className="view">
        <WelcomeUser userName={this.state.userName} />
        <div className="explore-intro"> {/* explore component contains searchBar */}
          <h2>Ready for an adventure?</h2>
        </div>
        <CityExplore />
      </div>
    );

    return <div className="explore-view">{viewShown}</div>

  }

}

export default ExploreView;