import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import AppBar from "./components/AppBar/AppBar";
import LoginForm from "./views/LoginForm";
import SignupForm from "./views/SignupForm";
import "./App.css";

class App extends React.Component {
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <AppBar />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path ="/signup" element={<SignupForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default observer(App);
