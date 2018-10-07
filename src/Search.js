import React, { Component, createRef } from "react";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import Select from "react-select";
import Counter from "templates/Counter";
import RadioGroup from "templates/RadioGroup";
import Dropdown from "templates/Dropdown";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "styles/search.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.state = {
      dropdownIsOpen: false,
      service: null,
      startDate: null,
      endDate: null,
      guests: {
        adults: 1,
        children: 0,
        pets: false
      },
      location: null,
      location_name: null
    };
  }
  componentDidMount() {
    this.setState({
      service: new google.maps.places.Autocomplete(this.input.current, {
        options: {
          types: ["(cities)"]
        }
      })
    });
  }
  displaySuggestions = (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }
  };
  onChange = () => {
    this.state.service.addListener("place_changed", () => {
      let place = this.state.service.getPlace();
      let location = place.location;
      let location_name = place.formatted_address;
      this.setState({ location, location_name });
    });
  };
  updateAdultGuests = i => {
    const guests = {
      ...this.state.guests,
      adults: i
    };
    this.setState({ guests });
  };
  updateChildrenGuests = i => {
    const guests = {
      ...this.state.guests,
      children: i
    };
    this.setState({ guests });
  };
  toggleDropdown = () =>
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen });
  onClickSearch = () => {
    const { location, startDate, endDate, guests } = this.state;
    this.props.onClick({
      location,
      startDate,
      endDate,
      guests
    });
  };
  render() {
    const {
      guests,
      startDate,
      endDate,
      focusedInput,
      dropdownIsOpen,
    } = this.state;
    const { query } = this.props;
    return (
      <div className="search">
        <input
          className="location-search"
          ref={this.input}
          placeholder={`${query.location_name !== undefined ? query.location_name : "Where do you want to go?"}`}
          onChange={() => this.onChange()}
        />
        <div className="v-line" />
        <DateRangePicker
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="listing_header_start_date" // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="listing_header_end_date" // PropTypes.string.isRequired,
          startDatePlaceholderText={query.startDate === null ? "Arrive": moment(query.startDate).format("YYYY-MM-DD")}
          endDatePlaceholderText={query.endDate === null ? "Depart": moment(query.endDate).format("YYYY-MM-DD")}
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
        <div className="v-line" />
        <div className="dropdown-group">
          <button
            type="button"
            className="guest-selector"
            onClick={this.toggleDropdown}
          >{`${guests.adults + guests.children} Guest${
            guests.adults + guests.children > 1 ? "s" : ""
            } ${guests.pets ? ", Pets" : ""}`}</button>
          <Dropdown isOpen={dropdownIsOpen} onClick={() => this.toggleDropdown()}>
            <p>Adults:</p>
            <Counter min={1} onIncrement={i => this.updateAdultGuests(i)} />
            <p>Children:</p>
            <Counter min={0} onIncrement={i => this.updateChildrenGuests(i)} />
            <p>Pets:</p>
            <RadioGroup
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" }
              ]}
              checked={guests.pets ? "yes" : "no"}
              onChange={i =>
                this.setState({
                  guests: {
                    ...guests,
                    pets: i === "yes" ? true : false
                  }
                })
              }
            />
            <div className="button-group">
              <button type="button" className="apply-guests" onClick={() => this.toggleDropdown()}>
                Apply
              </button>
            </div>
          </Dropdown>
        </div>
        <div className="v-line" />
        <button type="button" className="submit" onClick={this.onClickSearch}>
          Search
        </button>
      </div>
    );
  }
}

Search.defaultProps = {
  onClick: () => { },
  query: {
    startDate: null,
    endDate: null
  }
};

export default Search;
