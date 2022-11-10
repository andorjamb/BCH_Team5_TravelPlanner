import React, { Component } from "react";
import Welcome from "../../components/Welcome/Welcome";
import SearchBar from "../../components/SearchBar/SearchBar";
import CityExplore from "../../components/CityExplore/CityExplore";
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
    userName: "Homer",
    viewMode: ViewMode.List,
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
            <Welcome userName={this.state.userName} />
            <div className="intro">
              Ready for an <br />
              adventure?
            </div>
            <SearchBar searchEvent={this.searchHandler} />
            <></>
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
