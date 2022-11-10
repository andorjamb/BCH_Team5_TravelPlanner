import React, { Component } from "react";
import Welcome from "../../components/Welcome/Welcome";
import SearchBar from "../../components/SearchBar/SearchBar";
import CityExplore from "../../components/CityExplore/CityExplore";
import Account from "../../components/Account/Account";
import "./ExploreView.css";


const ViewMode = {
  List: 1,
  Expand: 2,
  ExpandFull: 3,
};




class ExploreView extends Component {

  state = {
    search: "",
    userName: "Homer",
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
        viewShown = <div className="view">ViewMoide.Excpand</div>;
        break;
      }
      case ViewMode.ExpandFull: {
        viewShown = <div className="view">ViewMoide.ExcpandFull</div>;
        break;
      }
      default: {
        viewShown = (
          <div className="view">
            <Welcome></Welcome>
            <div class="intro">
              Ready for an <br />
              adventure?
            </div>
            <SearchBar searchEvent={this.searchHandler} />
            <></>
            <CityExplore />
          </div>
        );
        break;
      }
    }

    return <div className="explore-view">{viewShown}</div>;
  }
}

export default ExploreView;
