import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react";
import AppBar from "./components/AppBar/AppBar";
import LoginForm from "./views/LoginForm";
import SignupForm from "./views/SignupForm";
import HomePage from "./views/HomePage";
import "./App.css";

class App extends React.Component {
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
