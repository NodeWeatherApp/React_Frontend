import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import AppBar from "./components/AppBar/AppBar";
import LoginForm from "./views/LoginForm";
import SignupForm from "./views/SignupForm";
import HomePage from "./views/HomePage";
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

  render() {
    return (
      <div className="app">
        <AppBar />
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/logout" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default observer(App);
