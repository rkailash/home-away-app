import React, {Component} from 'react';
import Select from 'react-select';
import 'styles/header.scss';

const options = [
  {value: 'traveler', label: 'Traveler Login'},
  {value: 'owner', label: 'Owner Login'},
];

const menuStyles = {
  control: styles => ({ ...styles, width: '100px'}),
  container: styles => ({ ...styles, width: '200px'}),
};

class Header extends Component {
  onClickLogin = (option) => {
    this.props.onClick(option.value)
  };
  render() {
    const {showLogin} = this.props;
    return (
      <div className="header">
        <img className="logo" src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg" />
        {showLogin &&
          <Select onChange={(e) => this.onClickLogin(e)} styles={menuStyles} placeholder={'Login'} options={options} />
        }
      </div>
    );
  }
}

export default Header;