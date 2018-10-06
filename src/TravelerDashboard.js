import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import Header from "./Header";
import { Link, Route } from "react-router-dom";
import "styles/travelerDashboard.scss";

const routes = [
  { value: "trips", label: "My Trips" },
  { value: "profile", label: "Profile" }
];

const MyTrips = () => (
  <div className="mytrips">
    <p>You don't have any past or upcoming trips.</p>
    <button type="button" className="start-search main-btn">
      Start your search
    </button>
  </div>
);

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
      activeFormGroup: undefined
    };
  }
  render() {
    const { activeFormGroup } = this.state;
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
          <Route path="/Traveler/trips" component={MyTrips} />
          <Route
            path="/traveler/profile"
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
