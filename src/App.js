import React, {Component} from 'react';
import Find from 'lodash/find';
import {Route, Redirect} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Login from './Login';
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
    if (activeRoute === 'traveler') {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <Header showLogin onClick={(route) => this.setActiveRoute(route)} />
        <div>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    );
  }
}

export default App;