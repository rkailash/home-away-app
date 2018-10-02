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
      location: null
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
    console.log(predictions);
  };
  onChange = () => {
    this.state.service.addListener("place_changed", () => {
      const location = this.state.service.getPlace().place_id;
      this.setState({ location });
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
  openDropdown = () =>
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen });
  onClickSearch = () => {
    const { location } = this.state;
    this.props.onClick({
      location
    });
  };
  render() {
    const {
      guests,
      startDate,
      endDate,
      focusedInput,
      dropdownIsOpen
    } = this.state;
    return (
      <div className="search">
        <input
          className="location-search"
          ref={this.input}
          placeholder="Where do you want to go?"
          onChange={() => this.onChange()}
        />
        <div className="v-line" />
        <DateRangePicker
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          startDatePlaceholderText="Arrive"
          endDatePlaceholderText="Depart"
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
            onClick={this.openDropdown}
          >{`${guests.adults + guests.children} Guest${
            guests.adults + guests.children > 1 ? "s" : ""
          } ${guests.pets ? ", Pets" : ""}`}</button>
          <Dropdown isOpen={dropdownIsOpen} onClick={() => this.openDropdown()}>
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
              <button type="button" className="apply-guests">
                Apply
              </button>
            </div>
          </Dropdown>
        </div>
        <button type="button" className="submit" onClick={this.onClickSearch}>
          Search
        </button>
      </div>
    );
  }
}

Search.defaultProps = {
  onClick: () => {}
};

export default Search;
