import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "styles/header.scss";

const LoginDropdown = () => (
  <Fragment>
    <DropdownToggle caret>Login</DropdownToggle>
    <DropdownMenu>
      <DropdownItem>
        <Link to="/TravellerLogin">Traveler Login</Link>
      </DropdownItem>
      <DropdownItem>
        <Link to="/OwnerLogin">Owner Login</Link>
      </DropdownItem>
    </DropdownMenu>
  </Fragment>
);

const UserDropdown = ({ name }) => (
  <Fragment>
    <DropdownToggle caret>{name}</DropdownToggle>
    <DropdownMenu>
      <DropdownItem>
        <Link to="/Traveler/profile">My Profile</Link>
      </DropdownItem>
      <DropdownItem>
        <Link to="/Traveler/trips">My Trips</Link>
      </DropdownItem>
      <DropdownItem>
        <Link to="/OwnerLogin">Log Out</Link>
      </DropdownItem>
    </DropdownMenu>
  </Fragment>
);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }
  onClickLogin = option => {
    this.props.onClick(option.value);
  };
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
  render() {
    const { showLogin, design, userInfo } = this.props;
    return (
      <div className={`header ${design === "gradient" ? "gradient" : ""}`}>
        <Link className="logo" to="/">
          <img
            src={
              design === "gradient"
                ? "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"
                : "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"
            }
          />
        </Link>
        <div className="right-container">
          {showLogin && (
            <Dropdown
              className={`header-menu${userInfo === undefined ? '' : ' user-profile'}`}
              isOpen={this.state.dropdownOpen}
              toggle={() => this.toggle()}
            >
              {
                userInfo === undefined ? <LoginDropdown /> : <UserDropdown name={`${userInfo.firstname} ${userInfo.lastname.charAt(0)}`} />
              }
            </Dropdown>
          )}
          <button type="button" className="lyp">
            <Link to="/Owner">List your Property</Link>
          </button>
          <img
            className="logo-image"
            src={
              design === "gradient"
                ? "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"
                : "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"
            }
            alt="logo"
            title="logo"
          />
        </div>
      </div>
    );
  }
}

export default Header;
