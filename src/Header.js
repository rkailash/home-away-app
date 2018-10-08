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

const UserDropdown = ({ type, name }) => (
  <Fragment>
    <DropdownToggle caret>{name}</DropdownToggle>
    <DropdownMenu>
      <DropdownItem>
        <svg x="0px" y="0px" viewBox="0 0 512 512" width="16px" height="16px">
          <g>
            <g>
              <path d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148    C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962    c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216    h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40    c59.551,0,108,48.448,108,108S315.551,256,256,256z" fill="#5e6d77" />
            </g>
          </g>
        </svg>
        <Link to="/Traveler/profile">My Profile</Link>
      </DropdownItem>
      <DropdownItem>
        <svg id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" width="16px" height="16px">
          <path d="M56.99,13.5H55v-3H45v3h-4V7.706C41,5.938,39.562,4.5,37.794,4.5H22.206C20.438,4.5,19,5.938,19,7.706V13.5h-4v-3H5v3H3.01  C1.351,13.5,0,14.851,0,16.51v35.98c0,1.659,1.351,3.01,3.01,3.01h53.98c1.659,0,3.01-1.351,3.01-3.01V16.51  C60,14.851,58.649,13.5,56.99,13.5z M47,12.5h6v1h-6V12.5z M21,7.706C21,7.041,21.541,6.5,22.206,6.5h15.588  C38.459,6.5,39,7.041,39,7.706V13.5H21V7.706z M19,15.5h22h4h5v38H10v-38h5H19z M7,12.5h6v1H7V12.5z M2,52.49V16.51  c0-0.557,0.453-1.01,1.01-1.01H5h3v38H3.01C2.453,53.5,2,53.047,2,52.49z M58,52.49c0,0.557-0.453,1.01-1.01,1.01H52v-38h3h1.99  c0.557,0,1.01,0.453,1.01,1.01V52.49z" fill="#5e6d77" />
        </svg>
        <Link to="/Traveler/trips">My Trips</Link>
      </DropdownItem>
      {
        type === 'owner' &&
        <Fragment>
          <DropdownItem divider />
          <DropdownItem>
            <svg id="Capa_1" x="0px" y="0px" viewBox="0 0 512.106 512.106" width="16px" height="16px">
              <g transform="translate(-1)">
                <g>
                  <g>
                    <path d="M128.686,37.216c-4.761-4.067-11.789-4.012-16.486,0.128L77.853,68.081v-4.028c0-4.713-3.82-8.533-8.533-8.533     s-8.533,3.82-8.533,8.533v19.311L46.561,96.096c-3.459,3.155-3.73,8.508-0.607,11.997s8.473,3.809,11.99,0.718l62.575-56.013     l62.575,56.013c2.266,2.067,5.468,2.759,8.385,1.812c2.918-0.947,5.102-3.387,5.722-6.392c0.62-3.004-0.42-6.11-2.724-8.135     L128.686,37.216z" fill="#5e6d77" />
                    <path d="M171.72,119.52c-4.713,0-8.533,3.82-8.533,8.533v59.733H77.853v-59.733c0-4.713-3.82-8.533-8.533-8.533     s-8.533,3.82-8.533,8.533v65.152c0.084,6.515,5.432,11.729,11.947,11.648h95.573c6.519,0.066,11.862-5.155,11.947-11.674v-65.126     C180.253,123.34,176.432,119.52,171.72,119.52z" fill="#5e6d77" />
                    <path d="M120.52,221.92c-32.99,0-59.733,26.744-59.733,59.733s26.744,59.733,59.733,59.733s59.733-26.744,59.733-59.733     C180.215,248.679,153.494,221.957,120.52,221.92z M77.853,281.653c0.026-20.268,14.281-37.731,34.133-41.813v36.975     L80.413,295.75C78.76,291.232,77.894,286.464,77.853,281.653z M89.207,310.382l29.99-17.994l24.815,24.815     C126.579,328.833,103.257,325.93,89.207,310.382z M156.078,305.137l-27.025-27.017V239.84     c13.892,2.815,25.474,12.357,30.895,25.454C165.368,278.391,163.918,293.327,156.078,305.137z" fill="#5e6d77" />
                    <path d="M461.853,153.653v-29.21c-0.005-7.43-6.027-13.452-13.457-13.457H424.11c-7.43,0.005-13.452,6.027-13.457,13.457v29.21     h-17.067v-53.504c-0.009-8.149-6.613-14.753-14.763-14.763h-21.675C349,85.396,342.396,92,342.386,100.149v53.504H325.32V59.786     c0-9.426-7.641-17.067-17.067-17.067h-17.067c-9.426,0-17.067,7.641-17.067,17.067v93.867h-8.533     c-4.713,0-8.533-3.821-8.533-8.533V42.72c0-4.713-3.821-8.533-8.533-8.533s-8.533,3.82-8.533,8.533v102.4     c0,14.138,11.461,25.6,25.6,25.6h196.267c4.713,0,8.533-3.82,8.533-8.533S466.566,153.653,461.853,153.653z M308.253,153.653     h-17.067V59.786h17.067V153.653z M376.52,153.653h-17.067v-51.2h17.067V153.653z M444.786,153.653H427.72v-25.6h17.067V153.653z" fill="#5e6d77" />
                    <path d="M461.853,324.32H265.586c-4.713,0-8.533-3.82-8.533-8.533v-13.534l28.1-28.1c3.371-3.236,8.695-3.236,12.066,0     l10.001,10.001c9.997,9.994,26.202,9.994,36.198,0l35.601-35.601c3.371-3.236,8.695-3.236,12.066,0l10.001,10.01     c10.008,9.966,26.19,9.966,36.198,0l30.601-30.601c3.234-3.348,3.188-8.671-0.104-11.962c-3.292-3.292-8.614-3.338-11.962-0.104     l-30.601,30.592c-3.332,3.331-8.734,3.331-12.066,0l-10.001-10.001c-10.13-9.668-26.069-9.668-36.198,0l-35.601,35.601     c-3.332,3.331-8.734,3.331-12.066,0l-9.992-10.001c-10.132-9.669-26.075-9.669-36.207,0l-16.034,16.034v-64.734     c0-4.713-3.821-8.533-8.533-8.533s-8.533,3.821-8.533,8.533v102.4c0,14.138,11.461,25.6,25.6,25.6h196.267     c4.713,0,8.533-3.821,8.533-8.533C470.386,328.14,466.566,324.32,461.853,324.32z" fill="#5e6d77" />
                    <path d="M513.053,396.46V47.37c1.187-24.814-17.863-45.94-42.667-47.317H43.72C18.916,1.431-0.134,22.557,1.053,47.37v349.09     c-1.191,24.817,17.859,45.948,42.667,47.326h136.533v17.067H146.12c-18.851,0-34.133,15.282-34.133,34.133v8.533     c0,4.713,3.82,8.533,8.533,8.533h273.067c4.713,0,8.533-3.82,8.533-8.533v-8.533c0-18.851-15.282-34.133-34.133-34.133h-34.133     v-17.067h136.533C495.194,442.409,514.244,421.277,513.053,396.46z M367.986,477.92c9.426,0,17.067,7.641,17.067,17.067h-256     c0-9.426,7.641-17.067,17.067-17.067H367.986z M197.32,460.853v-17.067h119.467v17.067H197.32z M470.386,426.72H43.72     c-15.361-1.41-26.754-14.877-25.6-30.259V375.52h477.867v20.941C497.141,411.843,485.748,425.31,470.386,426.72z M495.986,47.37     v311.083H18.12V47.37c-1.154-15.381,10.24-28.845,25.6-30.251h426.667C485.746,18.525,497.141,31.989,495.986,47.37z" fill="#5e6d77" />
                  </g>
                </g>
              </g>
            </svg>
            <Link to="/OD">Owner Dashboard</Link>
          </DropdownItem>
          <DropdownItem divider />
        </Fragment>
      }
      <DropdownItem>
        <svg id="Capa_1" x="0px" y="0px" viewBox="0 0 471.2 471.2" width="16px" height="16px">
          <g>
            <g>
              <path d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5    s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5    S235.019,444.2,227.619,444.2z" fill="#5e6d77" />
              <path d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5    s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8    C455.319,239.9,455.319,231.3,450.019,226.1z" fill="#5e6d77" />
            </g>
          </g>
        </svg>
        <Link to="/Logout">Log Out</Link>
      </DropdownItem>
    </DropdownMenu>
  </Fragment >
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
    const { showLogin, hideLyp, design, userInfo, renderDropdown } = this.props;
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
          {
            userInfo !== undefined && <Link className="trips" to="/Traveler/trips">My Trips</Link>
          }
          {showLogin && (
            <Dropdown
              className={`header-menu${userInfo === undefined ? '' : ' user-profile'}`}
              isOpen={this.state.dropdownOpen}
              toggle={() => this.toggle()}
            >
              {
                userInfo === undefined ? <LoginDropdown /> : <UserDropdown type={userInfo.type} name={`${userInfo.firstname} ${userInfo.lastname.charAt(0)}`} />
              }
            </Dropdown>
          )}
          {renderDropdown && renderDropdown(this.toggle, this.state.dropdownOpen)}
          {
            hideLyp || <Link to="/od" className="lyp"><button type="button">
              List your Property
            </button></Link>
          }
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
