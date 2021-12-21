import React from "react";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

class WeatherRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <tr key={this.props.locationId}>
        <td>{this.props.weather.forecast}</td>
        <td>{this.props.weather.temperature}</td>
        <td>{this.props.weather.date}</td>
        <td>{this.props.weather.locationId}</td>
        <td>
          <Button
            size="lg"
            variant="blank"
            onClick={(event) => this.props.edit(event, this.props.index)}
          >
            <PencilFill color="royalblue" />
          </Button>
          <Button
            size="lg"
            variant="blank"
            onClick={(event) => this.props.delete(this.props.index)}
          >
            <TrashFill color="red" />
          </Button>
        </td>
      </tr>
    );
  }
}

export default WeatherRow;
