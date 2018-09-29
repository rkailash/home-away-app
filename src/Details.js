import React from "react";

class Details extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h2>Describe your property</h2>
          <hr />
          <form className="details-form">
            <div className="form-group">
              <label>Headline</label>
              <input id="headline" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Property description</label>
              <input id="pdescription" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Property type</label>
              <input id="ptype" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Bedrooms</label>
              <input id="bedrooms" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Accomodates</label>
              <input id="accomodates" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Bathrooms</label>
              <input id="bathrooms" type="text" className="form-control" />
            </div>
            <hr />
            <button className="btn btn-primary">Cancel</button>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Details;
