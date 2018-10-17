import React, { Component } from "react";
import Find from "lodash/find";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Property from "./Property";
import Login from "./containers/LoginContainer";
import OwnerLogin from "./OwnerLogin";
import Owner from "./Owner";
import Listing from "./Listing";
import Search from "./Search";
import "styles/app.scss";
import Register from "./Register";
import PropertyDetails from "./PropertyDetails";
import TravelerDashboard from "./TravelerDashboard";
import OwnerDashboard from "./OwnerDashboard";
import Logout from "./Logout";
import Error from "./Error";
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
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                userInfo={userInfo}
                saveSearchQuery={searchQuery => this.setState({ searchQuery })}
              />
            )}
          />
          <Route
            path="/TravellerLogin"
            render={() => (
              <Login setUserInfo={userInfo => this.setState({ userInfo })} />
            )}
          />
          <Route
            path="/OwnerLogin"
            render={props => (
              <OwnerLogin
                {...props}
                setUserInfo={userInfo => this.setState({ userInfo })}
              />
            )}
          />
          <Route path="/Register" component={Register} />
          <Route path="/Owner" component={Owner} />
          <Route
            path="/Listing"
            render={props => (
              <Listing {...props} userInfo={userInfo} query={searchQuery} />
            )}
          />
          <Route
            path="/Property"
            render={props => (
              <Property {...props} userInfo={userInfo} query={searchQuery} />
            )}
          />
          <Route
            path="/Traveler"
            render={props => (
              <TravelerDashboard {...props} userInfo={userInfo} />
            )}
          />
          <Route
            path="/od"
            render={props => <OwnerDashboard {...props} userInfo={userInfo} />}
          />
          <Route
            path="/Logout"
            render={props => (
              <Logout
                {...props}
                setUserInfo={userInfo => this.setState({ userInfo })}
              />
            )}
          />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default App;
