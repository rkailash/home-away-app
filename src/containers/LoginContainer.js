import { connect } from "react-redux";
import React, { Component } from "react";
import { handleChange, handleSubmit } from "actions";
import TravelerLogin from "../TravelerLogin";

const mapStateToProps = state => {
  console.log(state);
  return {
    account: state.account,
    authFlag: state.authFlag,
    showLoginError: state.showLoginError,
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange: e => dispatch(handleChange(e)),
  handleSubmit: i => dispatch(handleSubmit(i))
});

class LoginContainer extends Component {
  state = {};
  render() {
    return (
      <TravelerLogin
        handleSubmit={this.props.handleSubmit}
        handleChange={this.props.handleChange}
        account={this.props.account}
        authFlag={this.props.authFlag}
        showLoginError={this.props.showLoginError}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
