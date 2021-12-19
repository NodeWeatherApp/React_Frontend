import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function AddWeather() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // {
  //     "forecast": "any",
  //     "temperature": "any",
  //     "date": "any",
  //     "locationId": "any"
  //   }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Weather
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Weather</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formForecast">
            <Form.Label>Forecast</Form.Label>
            <Form.Control type="text" placeholder="Sunny" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTemperature">
            <Form.Label>Temperature</Form.Label>
            <Form.Control type="text" placeholder="60" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date"/>
          </Form.Group>
          <Button variant="primary">Understood</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddWeather;
