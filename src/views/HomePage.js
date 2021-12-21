import { React, Component, Fragment } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

import AddWeather from "../components/HomePage/WeatherModal";
import WeatherRow from "../components/HomePage/WeatherRow";
import EditableWeatherRow from "../components/HomePage/EditableWeatherRow";

class HomePage extends Component {
  state = {
    weather: {
      forecast: null,
      temperature: null,
      date: null,
      locationId: null,
    },
    editWeatherId: null,
    location: null,
  };

  // state management
  handleSelect = (id) => {
    // console.log("locationId: " + id);
    this.setState({ locationId: id });
  };

  handleEdit = (event, id) => {
    event.preventDefault();
    this.setState({ editWeatherId: id });
  };

  // on page load
  componentDidMount() {
    function getLocations() {
      return axios.get(`location/`);
    }

    function getWeather() {
      const defaultLocation = 1;
      return axios.get(`weather/${defaultLocation}`);
    }
    // call requests and handle them
    axios
      .all([getLocations(), getWeather()])
      .then(
        axios.spread(function (locationsResponse, weatherResponse) {
          console.log(locationsResponse.data);
          // console.log(weatherResponse.data);
          // console.log(locationsResponse.data);
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

  // api calls
  fetchWeather = () => {
    axios
      .get(`weather/${this.state.locationId}`)
      .then((res) => {
        console.log(res.data.weather);
        this.setState({ weather: res.data.weather });
      })
      .catch((err) => console.error(err));
  };

  addWeather = (forecast, temperature) => {
    const body = {
      forecast,
      temperature,
      date: this.state.weather.date,
      locationId: this.state.locationId,
    };
    console.log('body:' + body);
    axios
      .post(`weather/create`, body)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.error(err));
  };

  editWeather = (forecast, temperature, index) => {
    const body = {
      forecast: forecast,
      temperature: temperature,
      date: this.state.weather[index].date,
    };
    console.log(body);

    axios
      .put(`weather/edit`, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  deleteWeather = (index) => {
    const id = this.state.weather[index].id;
    console.log("deleting weather row w/ id: " + id);

    axios
      .delete(`weather/delete/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  // render components
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
          <div>
            <ReactBootStrap.Container fluid="">
              <ReactBootStrap.Row>
                <ReactBootStrap.Col>
                  <h1 align="Center">Weather Data</h1>
                  <h3 align="Center">(Start By Selecting a Location)</h3>
                  <h3 align="Center">(State Issue, Click Twice on Location to change location)</h3>
                  <h3 align="Center">
                    (Edit or Delete Row by Clicking on Actions Cell)
                  </h3>
                </ReactBootStrap.Col>
              </ReactBootStrap.Row>
            </ReactBootStrap.Container>
          </div>

          <div>
            <ReactBootStrap.Container fluid>
              <ReactBootStrap.Row>
                <ReactBootStrap.Col>
                  <form>
                    <ReactBootStrap.Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>Forecast</th>
                          <th>Temperature</th>
                          <th>Date</th>
                          <th>Location Id</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.weather.map((weather, index) => (
                          <Fragment>
                            {this.state.editWeatherId === index ? (
                              <EditableWeatherRow
                                locationId={1}
                                api={this.editWeather}
                                date={this.state.weather[index].date}
                                index={index}
                                weather={this.state.weather}
                              />
                            ) : (
                              <WeatherRow
                                weather={weather}
                                index={index}
                                edit={this.handleEdit}
                                delete={this.deleteWeather}
                              />
                            )}
                          </Fragment>
                        ))}
                      </tbody>
                    </ReactBootStrap.Table>
                  </form>
                </ReactBootStrap.Col>
                <ReactBootStrap.Col>
                  <AddWeather api={this.addWeather} />
                  <ReactBootStrap.DropdownButton
                    id="dropdown-basic-button"
                    title="Select Location"
                    variant="primary"
                    onSelect={this.handleSelect}
                  >
                    {this.state.locations.map(this.renderLocations)}
                  </ReactBootStrap.DropdownButton>
                </ReactBootStrap.Col>
              </ReactBootStrap.Row>
            </ReactBootStrap.Container>
          </div>
          <div></div>
        </div>
      );
    }
    return <h3>You are not Logged in</h3>;
  }
}

export default HomePage;
