import React, {Component} from 'react';
import Find from 'lodash/find';
import {Route, Redirect} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import ProductPage from './ProductPage';
import Login from './Login';
import Owner from './Owner';
import Listing from './Listing';
import 'styles/app.scss';

const routes = [
  {id: 'traveler_login', route: Login}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoute: ''
    };
  }
  setActiveRoute = (activeRoute) => {
    this.setState({activeRoute})
  }
  render() {
    const {activeRoute} = this.state;
    return (
      <div>
        {/* <Header showLogin onClick={(route) => this.setActiveRoute(route)} design="gradient" /> */}
        <div className="body-container">
          {/* <Route path="/" component={ProductPage} /> */}
          <Route path="/" component={Login} />
          {/* <Route path="/owner" component={Owner} /> */}
        </div>
      </div>
    );
  }
}

export default App;
