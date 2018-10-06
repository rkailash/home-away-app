import React, { Component } from "react";
import ImageGallery from "templates/ImageGallery";
import RatingDisplay from "templates/RatingDisplay";
import { Link } from "react-router-dom";
import Header from './Header';
import Search from './Search';
import "styles/listing.scss";

const images = [
  {
    key: "1",
    value:
      "https://odis.homeaway.com/odis/listing/c64e4758-21ad-40c3-98f2-62343335315c.c10.jpg"
  },
  {
    key: "2",
    value:
      "https://cdn1.caratlane.com/media/queldorei/shopper/revolution/Encircle_Hp-02-rc1-1600.jpg"
  },
  {
    key: "3",
    value:
      "https://cdn13.caratlane.com/media/queldorei/shopper/revolution/BLUE-butterfly-banner_HP-rc1-1600.jpg"
  },
  {
    key: "4",
    value:
      "https://cdn1.caratlane.com/media/queldorei/shopper/revolution/Save_Upto25_3-rc1-1600.jpg"
  },
  {
    key: "5",
    value:
      "https://cdn13.caratlane.com/media/queldorei/shopper/revolution/RTS_Hp-rc1-1600.jpg"
  }
];

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { items } = this.props.location.state.referrer;
    return (
      <div className="listing">
        <Header />
        <Search query={this.props.query} />
        {items.map((item, key) => (
          <div className="list-item" key={key}>
            <ImageGallery showThumbnail={false} images={images} />
            <div className="right-container">
              <div className="top-container">
                <Link to={`/Property/${item.propertyid}`}>
                  <h4>{item.name}</h4>
                </Link>
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
