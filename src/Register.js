import React, { createRef, Component } from "react";
import Header from "./Header";
import axios from "axios";
import "styles/login.scss";
import { Link, Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    signUpFormIsOpen: false,
    loginForm: false,
    registerSuccess: false,
    account: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  };

  handleLogin = e => {
    e.preventDefault();
    this.setState({ loginForm: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Inside handle submit method");

    const data = { ...this.state.account };

    axios.defaults.withCredentials = true;

    axios.post("http://localhost:3001/Register", data).then(response => {
      console.log("Axios POST response:", response.status);
      if (response.status === 200) {
        console.log(response);
        this.setState({ registerSuccess: true });
      } else {
        console.log(response);
      }
    });
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    const { signUpFormIsOpen } = this.state;
    if (this.state.loginForm === true || this.state.registerSuccess === true) {
      return <Redirect to="/Home" />;
    } else {
      return (
        <div className="register">
          <Header />
          <h2>Sign up for HomeAway</h2>
          <p>
            Already have an account?
            <Link to="/Home" onClick={this.handleLogin}>
              Login
            </Link>
          </p>
          <form onSubmit={this.handleSubmit}>
            {signUpFormIsOpen ? (
              <fieldset>
                <input
                  autoFocus
                  tabIndex={1}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.handleChange}
                />
                <input
                  tabIndex={2}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                />
                <input
                  tabIndex={3}
                  ref={this.emailRef}
                  type="email"
                  name="email"
                  placeholder="Email address"
                  onChange={this.handleChange}
                />
                <input
                  tabIndex={4}
                  ref={this.pswRef}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <button
                  tabIndex={1}
                  autoFocus
                  type="button"
                  className="btn-register"
                  name="register"
                  onClick={this.handleSubmit}
                >
                  Sign Me Up
                </button>
              </fieldset>
            ) : (
              <button
                tabIndex={1}
                autoFocus
                type="button"
                className="btn-register"
                name="register"
                onClick={() => this.setState({ signUpFormIsOpen: true })}
              >
                Sign up with Email
              </button>
            )}
            <small>We don't post anything without your permission.</small>
            <small>
              By creating an account you are accepting our Terms and Conditions
              and Privacy Policy.
            </small>
          </form>
        </div>
      );
    }
  }
}

export default Register;
