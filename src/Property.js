import React, { Component } from "react";
import ImageGallery from "templates/ImageGallery";
import axios from "axios";
import PropertyDetails from "./PropertyDetails";
import Header from './Header';
import Search from './Search';
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
      "https://odis.homeaway.com/odis/listing/9ce4c483-36f1-436e-9759-e489ba48a1bb.c10.jpg"
  },
  {
    key: "3",
    value:
      "https://odis.homeaway.com/odis/listing/23edb030-24f4-492f-a5b6-b0d9227f5091.c10.jpg"
  },
  {
    key: "4",
    value:
      "https://odis.homeaway.com/odis/listing/8d7baf17-f578-4334-8061-7ea9f2279f66.c10.jpg"
  },
  {
    key: "5",
    value:
      "https://odis.homeaway.com/odis/listing/87499f18-75d6-4637-86ed-b072d7ce5825.c10.jpg"
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
  onBook = () => {
    axios.post("");
  };
  render() {
    const { propertyDetails, isFullScreen, currentImagePos } = this.state;
    return (
      <div className="product-page">
        <div className="headers">
          <Header />
          <Search query={this.props.query} />
        </div>
        <div className="top-container">
          <ImageGallery
            onExpand={() => this.openFullScreen()}
            onToggle={i => this.setState({ currentImagePos: i })}
            images={images}
            isExpandable
          />
          {propertyDetails === undefined ? (
            <div className="loading">Loading...</div>
          ) : (
              <PropertyDetails
                item={propertyDetails}
                onClickBook={() => this.onBook()}
              />
            )}
        </div>
        {isFullScreen && (
          <div className="fullscreen-gallery">
            <ImageGallery images={images} openAt={currentImagePos} />
            <button
              type="button"
              className="close-gallery"
              onClick={() => this.closeFullScreen()}>
              <svg id="Capa_1" viewBox="0 0 212.982 212.982" width="16px" height="16px">
              <g id="Close">
              <path style={{fillRule:"evenodd", clipRule:"evenodd"}} d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z" fill="#ccc" />
            </g>
              </svg>
          </button>
          </div>
    )
  }
      </div>
    );
  }
}

export default Property;
