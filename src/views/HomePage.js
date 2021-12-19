import { React, Component } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

import AddWeather from "../components/HomePage/WeatherModal";

class HomePage extends Component {
  state = {};

  componentDidMount() {
    function getLocations() {
      return axios.get(`location/`);
    }

    function getWeather(id) {
      const defaultLocation = 1;
      return axios.get(`weather/${defaultLocation}`);
    }
    // call requests and handle them
    axios
      .all([getLocations(), getWeather()])
      .then(
        axios.spread(function (locationsResponse, weatherResponse) {
          console.log(locationsResponse.data);
          console.log(weatherResponse.data);
          return {
            locations: locationsResponse.data.locations,
            weather: weatherResponse.data.weather,
          };
        })
      )
      .then((obj) => {
        this.setState({
          locations: obj.locations,
          weather: obj.weather,
          locationId: 1,
        });
      })
      .catch((err) => console.error(err));
  }

  handleSelect = (id) => {
    console.log("locationId: " + id);
    this.setState({ locationId: id });
  };

  fetchWeather = () => {
    axios
      .get(`weather/${this.state.locationId}`)
      .then((res) => {
        console.log(res.data.weather);
        this.setState({ weather: res.data.weather });
      })
      .catch((err) => console.error(err));
  };

  renderWeather = (weather, index) => {
    return (
      <tr key={index}>
        <td>{weather.forecast}</td>
        <td>{weather.temperature}</td>
        <td>{weather.date}</td>
        <td>{weather.locationId}</td>
      </tr>
    );
  };

  renderLocations = (location, index) => {
    return (
      <ReactBootStrap.Dropdown.Item
        key={index}
        eventKey={location.id}
        onClick={this.fetchWeather}
        href=""
      >
        {location.country}, {location.city}
      </ReactBootStrap.Dropdown.Item>
    );
  };

  render() {
    if (this.state.locations) {
      return (
        <div>
          <ReactBootStrap.Container fluid>
            <ReactBootStrap.Row>
              <ReactBootStrap.Col>
                <h2>Weather Data </h2>
              </ReactBootStrap.Col>
              <ReactBootStrap.Col>
                <AddWeather />
              </ReactBootStrap.Col>
            </ReactBootStrap.Row>
          </ReactBootStrap.Container>

          <div>
            <ReactBootStrap.DropdownButton
              id="dropdown-basic-button"
              title="Dropdown button"
              variant="primary"
              onSelect={this.handleSelect}
            >
              {this.state.locations.map(this.renderLocations)}
            </ReactBootStrap.DropdownButton>
          </div>
          <div>
            <ReactBootStrap.Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Forecast</th>
                  <th>Temperature</th>
                  <th>Date</th>
                  <th>Location Id</th>
                </tr>
              </thead>
              <tbody>{this.state.weather.map(this.renderWeather)}</tbody>
            </ReactBootStrap.Table>
          </div>
        </div>
      );
    }
    return <h3>You are not Logged in</h3>;
  }
}

export default HomePage;
