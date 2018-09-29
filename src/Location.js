import React from "react";

import "styles/location.scss";

class Location extends React.Component {
  render() {
    return (
      <div>
        <div className="content-panel-container col-md-7" />
        <div className="panel-body">
          <h2>Location</h2>
          <form className="location-form">
            <div className="form-group">
              <label>Country</label>
              <input id="country" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Street Address</label>
              <input id="address" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Unit, Suite, Building, Etc.</label>
              <input id="unit" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>City</label>
              <input id="city" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>State</label>
              <input id="state" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Postal Code</label>
              <input id="postal" type="text" className="form-control" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Location;
