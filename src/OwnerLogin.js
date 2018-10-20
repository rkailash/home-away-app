import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import cookie from "react-cookies";
import Header from "./Header";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import axios from "axios";
import "styles/ownerLogin.scss";

class OwnerLogin extends Component {
  state = {
    account: { email: "", password: "" },
    authFlag: false,
    signUpFlag: false,
    showEmailError: false,
    showLoginError: false
  };
  validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleSignUp = e => {
    e.preventDefault();
    this.setState({ signUpFlag: true });
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log("Inside handlesubmit method");

    const data = { ...this.state.account };

    if (this.validateEmail(data.email)) {
      axios.defaults.withCredentials = true;
      axios.post("http://localhost:3001/Login", data).then(response => {
        console.log("Axios POST response:", response.status);

        if (response.status === 200) {
          this.setState({ authFlag: true });
          this.props.setUserInfo(response.data);
        } else {
          console.log("Login unsuccessful!");
          this.setState({ authFlag: false, showLoginError: true });
        }
      });
    } else {
      this.setState({ showEmailError: true });
    }
  };
  render() {
    const { account, showEmailError, showLoginError } = this.state;
    /*    if (this.state.signUpFlag === true) return <Redirect to="/Register" />;
  */
    if (this.state.signUpFlag === true) return <Redirect to="/Register" />;
    else if (this.state.authFlag === true && cookie.load("user_cookie")) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              referrer: {}
            }
          }}
        />
      );
    } else {
      return (
        <div className="owner-login">
          <Header hideLyp />
          <div className="container">
            <img
              className="banner"
              src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png"
            />
            <div className="login-container">
              <form>
                <h3>Owner Login</h3>
                <p>
                  Need an account?{" "}
                  <Link to="/Register" onClick={this.handleSignUp}>
                    Sign Up
                  </Link>
                </p>
                <div>
                  <input
                    autoFocus
                    tabIndex={1}
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={account.email}
                    onChange={this.handleChange}
                    onFocus={() => this.setState({ showEmailError: false })}
                    id="Popover3"
                  />
                  <Popover
                    placement="right"
                    isOpen={this.state.showEmailError}
                    target="Popover3"
                  >
                    <PopoverHeader>Error</PopoverHeader>
                    <PopoverBody>Invalid email address.</PopoverBody>
                  </Popover>
                </div>
                <input
                  tabIndex={2}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <button
                  tabIndex={3}
                  type="button"
                  className="btn-login"
                  name="login"
                  onClick={this.handleSubmit}
                >
                  Log in
                </button>
                {showLoginError && (
                  <small className="my-error">
                    Email or password is incorrect.
                  </small>
                )}
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default OwnerLogin;
