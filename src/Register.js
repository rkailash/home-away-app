import React, { createRef, Component } from "react";
import Header from "./Header";
import "styles/login.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpFormIsOpen: false
    };
    this.emailRef = createRef();
    this.pswRef = createRef();
  }
  onSubmit = () => {};
  render() {
    const { signUpFormIsOpen } = this.state;
    return (
      <div className="register">
        <Header />
        <h2>Sign up for HomeAway</h2>
        <p>Already have an account? Log In</p>
        <form>
          {signUpFormIsOpen ? (
            <fieldset>
              <input autoFocus tabIndex={1} type="text" name="firstname" placeholder="First Name"></input>
              <input tabIndex={2} type="text" name="lastname" placeholder="Last Name"></input>
              <input tabIndex={3} ref={this.emailRef} type="email" name="email" placeholder="Email address"></input>
              <input tabIndex={4} ref={this.pswRef} type="password" name="psw" placeholder="Password"></input>
              <button
                tabIndex={1}
                autoFocus
                type="button"
                className="btn-register"
                name="register"
                onClick={() => {}}
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

export default Register;
