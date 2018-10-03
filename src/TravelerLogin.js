import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import Header from "./Header";
import "styles/login.scss";

class Login extends Component {
  state = {
    account: { email: "", password: "" },
    authFlag: false,
    signUpFlag: false
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
    console.log(data);

    axios.defaults.withCredentials = true;

    axios.post("http://localhost:3001/Login", data).then(response => {
      console.log("Axios POST response:", response.status);

      if (response.status === 200) {
        this.setState({ authFlag: true });
      } else {
        console.log("Login unsuccessful!");
        this.setState({ authFlag: false });
      }
    });
  };

  handleSignUp = e => {
    e.preventDefault();
    this.setState({ signUpFlag: true });
  };
  render() {
    const { account } = this.state;
    const { title } = this.props;
    if (this.state.signUpFlag === true) return <Redirect to="/Register" />;
    if (this.state.authFlag === true && cookie.load("travel_cookie")) {
      return <Redirect to="/Home" />;
    } else {
      return (
        <div className="login">
          <Header />
          <h2>Login to HomeAway</h2>
          <p>
            Need an account?{" "}
            <Link to="/Register" onClick={this.handleSignUp}>
              Sign Up
            </Link>
          </p>
          <form onSubmit={this.handleSubmit}>
            <h3>Account Login</h3>
            <input
              autoFocus
              tabIndex={1}
              type="email"
              name="email"
              placeholder="Email address"
              value={account.email}
              onChange={this.handleChange}
            />
            <input
              tabIndex={2}
              type="password"
              name="password"
              placeholder="Password"
              value={account.password}
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
      );
    }
  }
}

export default Login;
