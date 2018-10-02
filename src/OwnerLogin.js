import React, { createRef, Component } from "react";
import Header from "./Header";
import axios from "axios";
import "styles/ownerLogin.scss";

class OwnerLogin extends Component {
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

    axios.defaults.withCredentials = true;

    axios.post("http://localhost:3001/OwnerLogin", data).then(response => {
      console.log("Axios POST response:", response.status);

      if (response.status === 200) {
        console.log("Login successful");
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
                name="psw"
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

export default OwnerLogin;
