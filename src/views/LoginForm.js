import React from "react";
import InputField from "../components/Login/InputField";
import SubmitButton from "../components/Login/SubmitButton";
import UserStore from "../stores/UserStore";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "testswagger@getMaxListeners.com",
      password: "test123",
      buttonDisabled: false,
    };
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 22) {
      return;
    }
    this.setState({
      [property]: val,
    });
  }

  async doLogin() {
    if (!this.state.email) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });

    const url = "http://localhost:3000/user/login";
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };

    await fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          this.resetForm();
          throw new Error("Something went wrong");
        }
      })
      .then((responseJson) => {
        console.log(responseJson);
        UserStore.username = responseJson.username;
        const token = responseJson.token;
        localStorage.setItem("jwt", token);
        UserStore.isLoggedIn = true;
        LoginForm.forceUpdate();
      })
      .catch((error) => {
        console.log(error);
        this.resetForm();
      });
  }

  resetForm() {
    this.setState({
      email: "testswagger@getMaxListeners.com",
      password: "test123",
      buttonDisabled: false,
    });
  }

  render() {
    // if (UserStore.loading) {
    //   return (
    //     <div className="app">
    //       <div className="container">Loading, please wait..</div>
    //     </div>
    //   );
    // }

    if (UserStore.isLoggedIn) {
      return (
        <div className="app">
          <div className="container">
            Welcome {UserStore.username}
            <SubmitButton
              text={"Log out"}
              disabled={false}
              onClick={() => this.doLogout()}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="loginform">
            Log in
            <InputField
              type="email"
              placeholder="Email"
              value={this.state.email ? this.state.email : ""}
              onChange={(val) => this.setInputValue("email", val)}
            />
            <InputField
              type="password"
              placeholder="Password"
              value={this.state.password ? this.state.password : ""}
              onChange={(val) => this.setInputValue("password", val)}
            />
            <SubmitButton
              text="Login"
              disabled={this.state.buttonDisabled}
              onClick={() => this.doLogin()}
            />
          </div>
        </div>
      );
    }
  }
}

export default LoginForm;
