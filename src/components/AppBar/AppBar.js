import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import UserStore from "../../stores/UserStore";

class AppBar extends React.Component {
  async doLogout() {
    console.log('logging out');
    const url = "https://node-mysql-deploy-heroku.herokuapp.com/user/logout";
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    await fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong with Logout");
        }
      })
      .then((responseJson) => {
        console.log(responseJson);
        const token = responseJson.token;
        console.log(token);
        localStorage.setItem("jwt", token);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="/">
            {"Welcome"}
            {UserStore.username}
          </Navbar.Brand>
          <Navbar.Brand href="/home">
            <button>Home</button>
          </Navbar.Brand>
          <Navbar.Brand href="/login">
            <button>Login</button>
          </Navbar.Brand>
          <Navbar.Brand href="/logout">
            <button onClick={(event) => {event.preventDefault(); this.doLogout()}}>Logout</button>
          </Navbar.Brand>
          <Navbar.Brand href="/signUp">
            <button>SignUp</button>
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default AppBar;
