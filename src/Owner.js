import React, {Component} from 'react';
import Location from './Location';
import Pricing from './Pricing';
import Photos from './Photos';
import BookingOptions from './BookingOptions';
import Details from './Details';
import {Route, Link} from 'react-router-dom';
import 'styles/owner.scss';

const navList = [
  {value: 'location' , label: 'Location'},
  {value: 'details' , label: 'Details'},
  {value: 'bookingoptions' , label: 'Booking Options'},
  {value: 'photos' , label: 'Photos'},
  {value: 'pricing' , label: 'Pricing'},
]

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 'location'
    };
  }
  renderActiveNav = () => {
    switch(this.state.activeNav) {
      case 'location':
        return <Location />;
      case 'details':
        return <Details />;
      case 'bookingoptions':
        return <BookingOptions />;
      case 'photos':
        return <Photos />;
      case 'pricing':
        return <Pricing />;
      default:
        return null;
    }
  }
  render() {
    const {activeNav} = this.state;
    return (
      <div className="owner-container">
        <div className="form-box">
          <ul className="nav-list">
            {
              navList.map((item, key) => (
                <li key={key} className={item.value === activeNav ? 'active': ''} onClick={() => this.setState({activeNav: item.value})}>{item.label}</li>
              ))
            }
          </ul>
          <div className="form">
            {this.renderActiveNav()}
          </div>
        </div>
      </div>
    );
  }
}

export default Owner;