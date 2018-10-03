import React, {createRef} from "react";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.headline = createRef();
    this.desc = createRef();
    this.type = createRef();
    this.bedrooms = createRef();
    this.bathrooms = createRef();
    this.accomodates = createRef();
  }
  componentWillUnmount() {
    this.props.onChange({
      headline: this.headline.current.value,
      description: this.desc.current.value,
      type: this.type.current.value,
      bedrooms: this.bedrooms.current.value,
      bathrooms: this.bathrooms.current.value,
      accomodates: this.accomodates.current.value
    });
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h2>Describe your property</h2>
          <hr />
          <form className="details-form">
            <div className="form-group">
              <label>Headline</label>
              <input ref={this.headline} id="headline" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Property description</label>
              <input ref={this.desc} id="pdescription" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Property type</label>
              <input ref={this.type} id="ptype" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Bedrooms</label>
              <input ref={this.bedrooms} id="bedrooms" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Accomodates</label>
              <input ref={this.accomodates} id="accomodates" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Bathrooms</label>
              <input ref={this.bathrooms} id="bathrooms" type="text" className="form-control" />
            </div>
            <hr />
          </form>
        </div>
      </div>
    );
  }
}

export default Details;
