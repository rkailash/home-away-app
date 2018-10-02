import React, { Component } from "react";
import Find from "lodash/find";
import { Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import ProductPage from "./ProductPage";
import Login from "./TravelerLogin";
import OwnerLogin from "./OwnerLogin";
import Owner from "./Owner";
import Listing from "./Listing";
import Search from "./Search";
import "styles/app.scss";
import Register from "./Register";
import PropertyDetails from "./PropertyDetails";

class App extends Component {
  render() {
    return (
      <div>
        <div className="body-container">
          <Route path="/" component={Login} />
          <Route path="/Owner" component={OwnerLogin} />
          <Route path="/Home" component={Home} />
          <Route path="/Register" component={Register} /> */}
          <Route path="/owner" component={Owner} />
        </div>
      </div>
    );
  }
}

export default App;
