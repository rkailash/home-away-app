import React, { Component } from "react";
import axios from "axios";
import Location from "./Location";
import Pricing from "./Pricing";
import Photos from "./Photos";
import Details from "./Details";
import { Route, Link } from "react-router-dom";
import "styles/owner.scss";

const navList = [
  { value: "location", label: "Location" },
  { value: "details", label: "Details" },
  { value: "photos", label: "Photos" },
  { value: "pricing", label: "Pricing" }
];

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: "location",
      details: undefined,
      location: undefined,
      price: undefined
    };
  }
  renderActiveNav = () => {
    switch (this.state.activeNav) {
      case "location":
        return (
          <Location
            onChange={location => this.setState({ ...this.state, location })}
          />
        );
      case "details":
        return (
          <Details
            onChange={details => this.setState({ ...this.state, details })}
          />
        );
      case "photos":
        return <Photos />;
      case "pricing":
        return (
          <Pricing
            handleSubmit={() => this.handleSubmit()}
            onChange={price => this.setState({ price })}
          />
        );
      default:
        return null;
    }
  };
  handleSubmit = () => {
    const data = {
      location: this.state.location,
      details: this.state.details,
      price: this.state.price
    };

    console.log(data);
    axios.post("http://localhost:3001/Owner", data).then(response => {
      console.log("Axios POST response:", response.status);

      if (response.status === 200) {
        console.log("Property details posted!");
        console.log(response);
      } else {
        console.log("Property details not posted!");
      }
    });
  };
  render() {
    const { activeNav } = this.state;
    return (
      <div className="owner-container">
        <div className="form-box">
          <ul className="nav-list">
            {navList.map((item, key) => (
              <li
                key={key}
                className={item.value === activeNav ? "active" : ""}
                onClick={() => this.setState({ activeNav: item.value })}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div className="form">{this.renderActiveNav()}</div>
        </div>
      </div>
    );
  }
}

export default Owner;
