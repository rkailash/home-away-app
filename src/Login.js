import React, {createRef, Component} from 'react';
import 'styles/login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailRef = createRef();
    this.pswRef = createRef();
  }
  onSubmit = () => {
    
  }
  render() {
    const { title } = this.props;
    return (
      <div>
        {title && <h2>{title}</h2>}
        <form>
          <input ref={this.emailRef} type="email" name="email" placeholder="Email address"></input>
          <input ref={this.pswRef} type="password" name="psw" placeholder="Password"></input>
          <button type="button" name="submit" onClick={this.onSubmit}>Log in</button>
        </form>
      </div>
    )
  }
}

export default Login;