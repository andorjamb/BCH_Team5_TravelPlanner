import React, { Component } from "react";
import "./PlannerView.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SavedPlaces from "../../components/SavedPlaces/SavedPlaces";

class PlannerView extends Component {
  render() {
    return (
      <div className="planner-view">
        <div className="cover-img"></div>
        <div className="plan-title">
          <div className="plan-info">
            <h1>Trip 1</h1>
            <div>
              <span class="material-symbols-outlined">calendar_month</span>{" "}
              <input type="date" placeholder="add dates"></input>
            </div>
          </div>
          <div className="edit-button">
            <span class="material-symbols-outlined">edit_square</span>
          </div>
        </div>
        <div className="plan-content">
          <h1>Places to visit</h1>
          <SearchBar />

          <h2>Saved places</h2>
          <div className="saved-places-wrapper">
            <SavedPlaces />
            <SavedPlaces />
            <SavedPlaces />
            <SavedPlaces />
            <SavedPlaces />
          </div>
          <h1>Notes</h1>
          <textarea
            className="plan-note"
            cols="50"
            rows="10"
            placeholder="Write anything here: tips and tricks, how to get around, budgeting, etc."
          ></textarea>
          <div className="plan-button">
            <button className="delete">Delete</button>
            <button className="save">Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PlannerView;
