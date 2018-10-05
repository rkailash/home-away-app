import React, { Component } from "react";
import Search from "./Search";
import RecentActivity from "./RecentActivity";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import "styles/home.scss";

const items = [
  {
    property_id: "123",
    property_type: "apartment",
    img_src: "",
    name: "Big spacious apartment",
    bedrooms: 1,
    bathrooms: 1,
    rating: 2,
    sleeps: 4,
    price: 100,
    area: 1500
  },
  {
    property_id: "124",
    property_type: "villa",
    img_src: "",
    name: "House in a nice area",
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 4,
    price: 100,
    rating: 4,
    area: 700
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToListing: false,
      items: []
    };
  }
  onClickSearch = i => {
    //SHOULD GO INSIDE AXIOS RESPONSE
    //insert axios get call
    this.setState({ goToListing: true });
  };
  render() {
    if (this.state.goToListing) {
      return (
        <Redirect
          to={{
            pathname: "/Listing",
            state: {
              referrer: {
                items
              }
            }
          }}
        />
      );
    } else {
      return (
        <div className="home">
          <div className="hero-container">
            <Header design="gradient" showLogin />
            <h1>
              Book beach houses, cabins,
              <br />
              condos and more, worldwide.
            </h1>
            <Search onClick={i => this.onClickSearch(i)} />
            <ul className="message-container">
              <li>
                <h4>Your whole vacation starts here</h4>
                <small>Choose a rental from the world's best selection.</small>
              </li>
              <li>
                <h4>Book and stay with confidence</h4>
                <small>Secure payments, peace of mind</small>
              </li>
              <li>
                <h4>Your vacation your way</h4>
                <small>More space, more privacy, no compromises</small>
              </li>
            </ul>
          </div>
          <RecentActivity />
        </div>
      );
    }
  }
}

export default Home;
