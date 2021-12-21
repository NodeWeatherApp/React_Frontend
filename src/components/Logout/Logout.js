 function doLogout() {
    const url = "http://localhost:3000/user/logout";
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

    this.setState({
      buttonDisabled: false,
    });
  }

  export default doLogout;