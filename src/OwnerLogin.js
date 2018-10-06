import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import cookie from "react-cookies";
import Header from "./Header";
import axios from "axios";
import "styles/ownerLogin.scss";

class OwnerLogin extends Component {
  state = {
    account: { email: "", password: "" },
    authFlag: false,
    signUpFlag: false
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

    axios.defaults.withCredentials = true;

    axios.post("http://localhost:3001/Login", data).then(response => {
      console.log("Axios POST response:", response.status);

      if (response.status === 200) {
        console.log("Login successful");
        this.setState({ authFlag: true });
        console.log(response);
      } else {
        console.log("Login unsuccessful!");
        this.setState({ authFlag: false });
        this.setState({ signUpFlag: true });
      }
    });
  };
  render() {
    const { account } = this.state;
    /*    if (this.state.signUpFlag === true) return <Redirect to="/Register" />;
  */
    if (this.state.signUpFlag === true) return <Redirect to="/Register" />;
    else if (this.state.authFlag === true && cookie.load("user_cookie")) {
      return <Redirect to="/Owner" />;
    } else {
      return (
        <div className="owner-login">
          <Header />
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
                <input
                  autoFocus
                  tabIndex={1}
                  type="email"
                  name="email"
                  placeholder="Email address"
                  onChange={this.handleChange}
                />
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
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default OwnerLogin;
