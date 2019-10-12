import React from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth"

class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  state= {
    creds: {
      username:"",
      password:""
    }
  }

  handleChange = event => {
    this.setState({
      creds: {
        ...this.state.creds,
        [event.target.name]:event.target.value
      }
    })
  }

  login = event => {
    event.preventDefault();
    axiosWithAuth()
    .post("http://localhost:5000/api/login", this.state.creds)
    .then(res => {
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(error => console.log("Login:",error));
  };

  render() {
  return (
    <div className="login-form">
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.creds.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.creds.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
    </div>
  );
};
}

export default Login;
