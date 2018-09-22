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
  render() {
    return (
      <div className="owner-container">
        <div className="form-box">
          <ul className="nav-list">
            {
              navList.map((item, key) => (
                <li key={key}><Link to={`/${item.value}`}>{item.label}</Link></li>
              ))
            }
          </ul>
          <div className="form">
            <Route path="/location" component={Location} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/photos" component={Photos} />
            <Route path="/bookingoptions" component={BookingOptions} />
            <Route path="/details" component={Details} />
          </div>
        </div>
      </div>
    );
  }
}

export default Owner;