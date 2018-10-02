import React, { createRef, Component } from "react";
import Header from "./Header";
import "styles/ownerLogin.scss";

class OwnerLogin extends Component {
  constructor(props) {
    super(props);
    this.emailRef = createRef();
    this.pswRef = createRef();
  }
  onSubmit = () => {};
  render() {
    const { title } = this.props;
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
                ref={this.emailRef}
                type="email"
                name="email"
                placeholder="Email address"
              />
              <input
                tabIndex={2}
                ref={this.pswRef}
                type="password"
                name="psw"
                placeholder="Password"
              />
              <button
                tabIndex={3}
                type="button"
                className="btn-login"
                name="login"
                onClick={this.onSubmit}
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
