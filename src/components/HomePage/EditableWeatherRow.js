import React from "react";
import { Button } from "react-bootstrap";
import { SendFill, XCircleFill } from "react-bootstrap-icons";

class EditableWeatherRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleEdit = this.handleEdit.bind(this);
    this.forecast = React.createRef();
    this.temperature = React.createRef();
  }

  handleEdit(event) {
    const forecast = this.forecast.current.value;
    const temperature = this.temperature.current.value;
    const date = this.props.date;
    console.log(
      `Weather Data Edit: \n
      forecast: ${forecast}, \n 
      temperature: ${temperature}, \n 
      date: ${date}, \n
      index: ${this.props.index}`
    );
    // call api
    this.props.api(forecast, temperature, this.props.index);
    window.location.reload(false);
  }

  render() {
    return (
      <tr key={this.props.index}>
        <td>
          <input
            size="8"
            type="text"
            required="required"
            placeholder={this.props.weather[this.props.index].forecast}
            ref={this.forecast}
          ></input>
        </td>
        <td>
          <input
            size="10"
            type="text"
            required="required"
            placeholder="85.0"
            name="temperature"
            placeholder={this.props.weather[this.props.index].temperature}
            ref={this.temperature}
          ></input>
        </td>
        <td>
          <input
            type="text"
            required="required"
            placeholder={this.props.weather[this.props.index].date}
            name="date"
            disabled
          />
        </td>
        <td>
          <input
            size="5"
            type="id"
            required="required"
            placeholder={this.props.weather[this.props.index].locationId}
            name="locationId"
            disabled
          ></input>
        </td>
        <td>
          <Button
            size="lg"
            variant="blank"
            onClick={(event) => this.handleEdit(event)}
          >
            <SendFill color="green" />
          </Button>
          <Button
            size="lg"
            variant="blank"
            onClick={(event) => {
              window.location.reload(false);
            }}
          >
            <XCircleFill color="red" />
          </Button>
        </td>
      </tr>
    );
  }
}

export default EditableWeatherRow;
