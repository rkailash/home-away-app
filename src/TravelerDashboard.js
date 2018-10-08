import React, { Component, Fragment } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import Header from "./Header";
import { Link, Route } from "react-router-dom";
import ImageGallery from 'templates/ImageGallery';
import axios from 'axios';
import moment from 'moment';
import "styles/travelerDashboard.scss";

const routes = [
  { value: "trips", label: "My Trips" },
  { value: "profile", label: "Profile" }
];
const navList = [
  { value: "upcoming", label: "Upcoming Trips", imgUrl: '/arrow.svg' },
  { value: "past", label: "Past Trips", imgUrl: '/arrow.svg' },
];

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

const MyTrips = ({ trips, activeNav, setActiveNav }) => {
  // bathrooms: 3
  // bedrooms: 3
  // bookedflag: 1
  // enddate: "2018-10-09T18:30:00.000Z"
  // location: "san jose"
  // name: "hhsghgfjjh"
  // ownerid: 2
  // price: 123
  // propertyid: 1
  // sleeps: 3
  // startdate: "2018-10-07T18:30:00.000Z"
  // type: "gfghfhgjjhg"
  return (
    <div className="mytrips">
      <ul className="nav-list">
        {navList.map((item, key) => (
          <li
            key={key}
            className={`${item.value}${item.value === activeNav ? " active" : ""}`}
            onClick={() => setActiveNav(item)}
          >
            <img src={`/images/${item.imgUrl}`} alt={item.value} title={item.value} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      {
        trips.length === 0 ?
          <Fragment>
            <p>You don't have any past or upcoming trips.</p>
            <button type="button" className="start-search main-btn">
              Start your search
        </button>
          </Fragment> :
          <ul className="trip-list">
            {
              trips.map((item, key) => (
                <div className="list-item" key={key}>
                  <ImageGallery showThumbnail={false} images={images} />
                  <div className="right-container">
                    <div className="top-container">
                      <Link to={`/Property/${item.propertyid}`}>
                        <h4>{item.name}</h4>
                      </Link>
                      <div className="property-info">
                        <div className="location">
                          <img src={`/images/placeholder.svg`} />
                          <span>{item.location}</span>
                        </div>
                        <div className="reservation">
                          <img src={`/images/calendar.svg`} />
                          <span>Your reservation is from <em>{moment(item.startdate).format('LL')}</em> to <em>{moment(item.enddate).format('LL')}.</em></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </ul>
      }
    </div>
  );
};

const Profile = ({ activeItem, onFocus, userInfo }) => (
  <div className="profile">
    <h1>{`${userInfo.firstname} ${userInfo.lastname}`}</h1>
    <div className="profile-info">
      <h3>Profile Information</h3>
      <Form>
        <FormGroup
          className={`small${activeItem === "firstname" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("firstname")}
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "lastname" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("lastname")}
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
          />
        </FormGroup>
        <FormGroup className={`${activeItem === "about-me" ? " active" : ""}`}>
          <Input
            onFocus={() => onFocus("about-me")}
            type="textarea"
            name="about-me"
            id="about-me"
            placeholder="About me"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "city-country" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("city-country")}
            type="text"
            name="city-country"
            id="city-country"
            placeholder="My city, country"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "company" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("company")}
            type="text"
            name="company"
            id="company"
            placeholder="Company"
          />
        </FormGroup>
        <FormGroup className={`small${activeItem === "school" ? " active" : ""}`}>
          <Input
            onFocus={() => onFocus("school")}
            type="text"
            name="school"
            id="school"
            placeholder="School"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "hometown" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("hometown")}
            type="text"
            name="hometown"
            id="hometown"
            placeholder="Howetown"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "languages" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("languages")}
            type="text"
            name="languages"
            id="languages"
            placeholder="Languages"
          />
        </FormGroup>
        <FormGroup
          className={`gender${activeItem === "gender" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("gender")}
            type="select"
            name="gender"
            id="gender"
            defaultValue={null}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Input>
        </FormGroup>
        <FormGroup className={`small${activeItem === "phone" ? " active" : ""}`}>
          <Input
            onFocus={() => onFocus("phone")}
            type="phone"
            name="phone"
            id="phone"
            placeholder="Phone"
          />
        </FormGroup>
        <Button className="save-changes">Save changes</Button>
      </Form>
    </div>
  </div>
);

class TravelerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFormGroup: undefined,
      trips: [],
      activeNav: 'upcoming'
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3001/Trips`)
      .then(response => {
        console.log("GET response :", response.data);
        this.setState({ trips: response.data })
      });
  }
  setActiveNav = item => this.setState({ activeNav: item.value })
  render() {
    const { activeFormGroup, trips, activeNav } = this.state;
    const { userInfo } = this.props;
    const activePath = this.props.location.pathname.split('/Traveler/')[1];
    return (
      <div className="traveler">
        <Header />
        <ul className="nav">
          {routes.map((item, key) => (
            <li key={key} className={activePath === item.value ? 'active' : ''}>
              <Link to={`/Traveler/${item.value}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="results">
          <Route path="/Traveler/trips" render={() => (<MyTrips trips={trips} activeNav={activeNav} setActiveNav={this.setActiveNav} />)} />
          <Route
            path="/Traveler/profile"
            render={() => (
              <Profile
                activeItem={activeFormGroup}
                onFocus={activeFormGroup => this.setState({ activeFormGroup })}
                userInfo={userInfo}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default TravelerDashboard;
