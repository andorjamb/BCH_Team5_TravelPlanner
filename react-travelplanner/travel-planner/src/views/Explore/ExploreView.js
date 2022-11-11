import React, { Component } from "react";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import SearchBar from "../../components/SearchBar/SearchBar";
import CityExplore from "../../components/CityExplore/CityExplore";
import Account from "../../components/Account/Account";
import "./ExploreView.css";
import AddCity from "../../adminActions/AddCity.jsx"


const ViewMode = {
  List: 1,
  Expand: 2,
  ExpandFull: 3,
};


class ExploreView extends Component {

  state = {
    search: "",
    viewMode: ViewMode.List,
    user:'Username'
  };
 
  searchHandler = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
   
    const viewMode = this.state.viewMode;
    let viewShown = null;
    switch (viewMode) {
      case ViewMode.Expand: {
        viewShown = <div className="view">ViewMode.Expand</div>;
        break;
      }
      case ViewMode.ExpandFull: {
        viewShown = <div className="view">ViewMode.ExpandFull</div>;
        break;
      }
      default: {
        viewShown = (
          <div className="view">

            <WelcomeUser userName={this.state.userName} />
            <div className="intro">
            
              Ready for an <br />
              adventure?
            </div>
            <SearchBar searchEvent={this.searchHandler} />
       
            <CityExplore />
            <AddCity />
          </div>
        );
        break;
      }
    }

    return <div className="explore-view">{viewShown}</div>;
  }
}

export default ExploreView;
