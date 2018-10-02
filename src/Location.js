import React, { createRef } from "react";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.state = {
      service: null,
      location: null
    };
  }
  componentDidMount() {
    this.setState({
      service: new google.maps.places.Autocomplete(this.input.current, {
        options: {
          types: ["(cities)"]
        }
      })
    });
  }
  onChange = () => {
    this.state.service.addListener("place_changed", () => {
      const location = this.state.service.getPlace().place_id;
      this.setState({ location });
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      location: this.state.location
      
    };
    // axios.post("http://localhost:3001/Owner", data).then(response => {
    //   console.log("Axios POST response:", response.status);
  };
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
              <input
                id="city"
                type="text"
                className="form-control"
                placeholder=""
                autoComplete="off"
                ref={this.input}
                onChange={() => this.onChange()}
              />
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
