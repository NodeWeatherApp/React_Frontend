 function doLogout() {
    const url = "https://node-mysql-deploy-heroku.herokuapp.com/logout";
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
        console.log("jwt token deleted" + token);
      })
      .catch((error) => {
        console.log('err');
        console.log(error);
      });

    this.setState({
      buttonDisabled: false,
    });
  }

  export default doLogout;