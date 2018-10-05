import React, { Component } from "react";
import ImageGallery from "templates/ImageGallery";
import RatingDisplay from "templates/RatingDisplay";
import "styles/listing.scss";

const items = [
  {
    property_id: "123",
    property_type: "apartment",
    img_src: "",
    name: "Big spacious apartment",
    bedrooms: 1,
    bathrooms: 1,
    rating: 2,
    sleeps: 4,
    price: 100,
    area: 1500
  },
  {
    property_id: "124",
    property_type: "villa",
    img_src: "",
    name: "House in a nice area",
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 4,
    price: 100,
    rating: 4,
    area: 700
  }
];

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="listing">
        {this.props.items.map((item, key) => (
          <div className="list-item" key={item.property_id}>
            <ImageGallery showThumbnail={false} />
            <div className="right-container">
              <div className="top-container">
                <h4>{item.name}</h4>
                <div className="property-info">
                  <span>{`${
                    item.bedrooms === 0
                      ? "Studio"
                      : `${item.bedrooms} BR Apartment`
                  }`}</span>
                  <span>{`${item.bathrooms} Bath`}</span>
                  <span>{`${item.area} sq ft`}</span>
                  <span>{`Sleeps ${item.sleeps}`}</span>
                </div>
              </div>
              <div className="bottom-strip">
                <p>{`$${item.price} per night`}</p>
                <RatingDisplay rating={item.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Listing;
