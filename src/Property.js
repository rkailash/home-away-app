import React, { Component } from "react";
import ImageGallery from "templates/ImageGallery";
import axios from "axios";
import PropertyDetails from "./PropertyDetails";
import "styles/productPage.scss";

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

const item = {
  price: 75,
  rating: 4,
  type: "apartment",
  area: 1200,
  bedrooms: 3,
  sleeps: 3,
  bathrooms: 3,
  halfBaths: 0
};

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      currentImagePos: 0,
      propertyDetails: undefined
    };
  }
  componentDidMount() {
    this.getPropertyDetails();
  }
  getPropertyDetails = () => {
    axios
      .get(`http://localhost:3001${this.props.location.pathname}`)
      .then(response => {
        console.log("GET response :", response.data);
        this.setState({ propertyDetails: response.data[0] });
      });
  };
  openFullScreen = () => {
    this.setState({ isFullScreen: true });
  };
  closeFullScreen = () => {
    this.setState({ isFullScreen: false });
  };
  render() {
    const { propertyDetails } = this.state;
    return (
      <div className="product-page">
        <div className="top-container">
          <ImageGallery
            onExpand={() => this.openFullScreen()}
            onToggle={i => this.setCurrentImagePos(i)}
            images={images}
            isExpandable
          />
          {propertyDetails === undefined ? (
            <div className="loading">Loading...</div>
          ) : (
            <PropertyDetails item={propertyDetails} />
          )}
        </div>
        {this.state.isFullScreen && (
          <div className="fullscreen-gallery">
            <ImageGallery images={images} openAt={this.state.currentImagePos} />
            <button
              type="button"
              className="close-gallery"
              onClick={() => this.closeFullScreen()}
            >
              +
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Property;
