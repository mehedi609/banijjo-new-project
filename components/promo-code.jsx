import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const PromoCode = () => {
  const [show, setShow] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const handleClose = () => {
    setShow(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPromoCode('');
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setPromoCode(e.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      {promoCode}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply Promo Code</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="formPromoCode">
              {/*<Form.Label>Email address</Form.Label>*/}
              <Form.Control
                type="text"
                placeholder="Enter Promo Code"
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleFormSubmit}>
              Apply
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default PromoCode;
