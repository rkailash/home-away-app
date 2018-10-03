import React from "react";

class Pricing extends React.Component {
  render() {
    return (
      <div className="pricing">
        <h2>Pricing</h2>
        <form className="location-form">
          <div className="form-group">
            <label>Price</label>
            <input id="price" type="text" className="form-control" />
          </div>
          <button
            type="button"
            className="btn-primary"
            name="submit"
            onClick={this.handleSubmit}
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}

export default Pricing;
