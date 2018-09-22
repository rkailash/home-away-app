import React, { Component, createRef } from "react";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import Select from "react-select";
import Counter from "templates/Counter";
import RadioGroup from "templates/RadioGroup";
import Modal from "react-modal";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "styles/search.scss";

const customStyles = {
  content: {
    // top: "50%",
    // left: "50%",
    right: "auto",
    bottom: "auto"
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)"
  }
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.mapAttribution = createRef();
    this.state = {
      modalIsOpen: false,
      service: null,
      startDate: null,
      endDate: null,
      guests: {
        adults: 1,
        children: 0,
        pets: false
      },
      location: ''
    };
  }
  componentDidMount() {
    this.setState({
      service: new google.maps.places.PlacesService(this.mapAttribution.current)
    });
  }
  onChange = () => {
    const request = {
      query: this.input.current.value
    };
    const { service } = this.state;
    service.findPlaceFromQuery(request, function(response) {
      console.log(response);
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
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  render() {
    const {
      guests,
      startDate,
      endDate,
      focusedInput,
      modalIsOpen
    } = this.state;
    console.log(startDate);
    return (
      <div className="search">
        <input ref={this.input} onChange={this.onChange} />
        <label ref={this.mapAttribution} />
        <DateRangePicker
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
        <button type="button" onClick={this.openModal}>{`${guests.adults +
          guests.children} Guest${
          guests.adults + guests.children > 1 ? "s" : ""
        } ${guests.pets ? ", Pets" : ""}`}</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick
          contentLabel="Example Modal"
        >
          <p>Adults:</p>
          <Counter
            min={guests.adults}
            onIncrement={i => this.updateAdultGuests(i)}
          />
          <p>Children:</p>
          <Counter
            min={guests.children}
            onIncrement={i => this.updateChildrenGuests(i)}
          />
          <p>Pets:</p>
          {/* <RadioGroup checked options onChange={()} */}
        </Modal>
        <button type="button" className="submit">
          Search
        </button>
      </div>
    );
  }
}

export default Search;
