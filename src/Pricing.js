import React, { createRef } from "react";

class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.price = createRef();
  }
  render() {
    return (
      <div className="pricing">
        <h2>Pricing</h2>
        <form className="location-form">
          <div className="form-group">
            <label>Price</label>
            <input
              ref={this.price}
              onChange={() => this.props.onChange(this.price.current.value)}
              id="price"
              type="number"
              className="form-control"
            />
          </div>
          <button
            type="button"
            className="btn-primary"
            name="submit"
            onClick={this.props.handleSubmit}
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}

export default Pricing;
