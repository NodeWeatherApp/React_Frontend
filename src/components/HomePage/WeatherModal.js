import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class WeatherModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.forecast = React.createRef();
    this.temperature = React.createRef();
    this.date = React.createRef();
  }


  handleSubmit(event) {
      const forecast = this.forecast.current.value;
      const temperature = this.temperature.current.value;
      const date = this.date.current.value;
    alert(
      `Weather Data Submitted: \n
      forecast: ${forecast}, \n 
      temperature: ${temperature}, \n 
      date: ${date}`
    );
    // call api
    this.props.api(forecast,temperature,date);
    event.preventDefault();
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add New Weather
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Weather</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="formForecast">
                <Form.Label>Forecast</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Sunny, Foggy, Rainy..."
                  ref={this.forecast}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTemperature">
                <Form.Label>Temperature</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Farenheit Temperature. Ex. 61.0"
                  ref={this.temperature}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date of Temperature Reading"
                  ref={this.date}
                />
              </Form.Group>
              <Button variant="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default WeatherModal;
