import React from "react";
import {  Modal, Button } from "react-bootstrap";


const NewModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTittle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewModal;
