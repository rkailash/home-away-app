import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "styles/header.scss";

// const options = [
//   {value: 'traveler', label: 'Traveler Login'},
//   {value: 'owner', label: 'Owner Login'},
// ];

// const menuStyles = {
//   control: styles => ({
//     ...styles,
//     width: '100px',
//     backgroundColor: 'transparent',
//     height: '100%',
//     border: 0
//   }),
//   container: styles => ({ ...styles, width: '200px'}),
//   placeholder: styles => ({...styles, color: 'white', fontFamily: 'inherit'}),
//   dropdownIndicator: styles => ({...styles, color: 'white'}),
//   indicatorSeparator: styles => ({...styles, display: 'none'})
// };

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
    const { showLogin, design } = this.props;
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
        {showLogin && (
          <Dropdown
            className="header-menu"
            isOpen={this.state.dropdownOpen}
            toggle={() => this.toggle()}
          >
            <DropdownToggle caret>Login</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link to="/auth/traveler">Traveler Login</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/auth/owner">Owner Login</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        <button type="button" className="lyp">
          List your Property
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
    );
  }
}

export default Header;
