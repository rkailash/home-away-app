import React, { Component } from "react";
import Find from "lodash/find";
import { Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Property from "./Property";
import Login from "./TravelerLogin";
import OwnerLogin from "./OwnerLogin";
import Owner from "./Owner";
import Listing from "./Listing";
import Search from "./Search";
import "styles/app.scss";
import Register from "./Register";
import PropertyDetails from "./PropertyDetails";
import TravelerDashboard from "./TravelerDashboard";
import { userInfo } from "os";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: undefined,
      searchQuery: undefined
    };
  }
  render() {
    const { userInfo, searchQuery } = this.state;
    return (
      <div>
        <div className="body-container">
          <Route exact path="/" render={() => (<Home userInfo={userInfo} saveSearchQuery={(searchQuery) => this.setState({ searchQuery })} />)} />
          <Route path="/TravellerLogin" render={() => (<Login setUserInfo={(userInfo) => this.setState({ userInfo })} />)} />
          <Route path="/OwnerLogin" component={OwnerLogin} />
          <Route path="/Home" render={() => (<Home userInfo={userInfo} saveSearchQuery={(searchQuery) => this.setState({ searchQuery })} />)} />
          <Route path="/Register" component={Register} />
          <Route path="/Owner" component={Owner} />
          <Route path="/Listing" render={(props) => (<Listing {...props} query={searchQuery} />)} />
          <Route path="/Property"  render={(props) => (<Property {...props} query={searchQuery} />)} />
          <Route path="/Traveler" render={(props) => (<TravelerDashboard {...props} userInfo={userInfo} />)} />
        </div>
      </div>
    );
  }
}

export default App;
