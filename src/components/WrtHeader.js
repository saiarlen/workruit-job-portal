import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WrtJobPostForm from './WrtJobPostForm';


export default function WrtHeader(props) {

  const [formShow, setFormShow] = useState(false);

  const handleFormClose = () => setFormShow(false);
  const handleFormShow = () => setFormShow(true);



  return (
    <>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">JPWorkrouit</Navbar.Brand>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="!#">About</Nav.Link>
            <Nav.Link href="!#">Contact</Nav.Link>
          </Nav>
          <Button variant="outline-success" onClick={handleFormShow} >Post A Job</Button>
        </Container>
      </Navbar>

      <Modal
        size="lg"
        show={formShow}
        onHide={handleFormClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Create A New Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WrtJobPostForm
            modalClose={handleFormClose}
            type={'post'}
            refreshList={props.refreshEvent} />
        </Modal.Body>

      </Modal>
    </>

  )
}
