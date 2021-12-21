import React from "react";
import InputField from "../components/Login/InputField";
import SubmitButton from "../components/Login/SubmitButton";
import UserStore from "../stores/UserStore";

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

  async doSignup(event) {
    if (!this.state.email || this.state.email.length < 6) {
      return ;
    }
    if (!this.state.password) {
      return;
    }
    if (!this.state.username) {
      return;
    }

    this.setState({
      buttonDisabled: true,
    });

    const url = "https://node-mysql-deploy-heroku.herokuapp.com/user/signUp";
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }),
    };
    console.log(requestOptions);

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
        const token = responseJson.token;
        UserStore.token = token;
        UserStore.username = this.username;
       
        localStorage.setItem("jwt", token);
        this.resetForm()
      })
      .catch((error) => {
        console.log(error);
        this.resetForm();
        event.preventDefault()
      });
  }

  resetForm() {
    this.setState({
      email: "",
      username: "",
      password: "",
      buttonDisabled: false,
    });
  }

  render() {
    return (
      <div align="Center" className="loginform">
        Sign Up
        <div></div>
        <InputField
          type="email"
          placeholder="Email"
          value={this.state.email ? this.state.email : ""}
          onChange={(val) => this.setInputValue("email", val)}
        />
        <InputField
          type="text"
          placeholder="Username"
          value={this.state.username ? this.state.username : ""}
          onChange={(val) => this.setInputValue("username", val)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={this.state.password ? this.state.password : ""}
          onChange={(val) => this.setInputValue("password", val)}
        />
        <SubmitButton
          text="Sign Up"
          // disabled={this.state.buttonDisabled}
          onClick={(event) => this.doSignup(event)}
        />
        <div>(Username must be at least 4 characters)</div>
        <div>(Password must be at least 6 characters)</div>
      </div>
    );
  }
}

export default SignupForm;
