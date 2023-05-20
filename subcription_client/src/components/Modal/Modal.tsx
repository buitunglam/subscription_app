import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

type Props = {
  text: string;
  variant: string;
  isSignupFlow: boolean;
};

const ModalComponent = ({ text, variant, isSignupFlow }: Props) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    try {
      if (isSignupFlow) {
        const { data: signUpData } = await axios.post(
          "http://localhost:8080/auth/signup",
          {
            email,
            password,
          }
        ); 
        console.log("user signin...", signUpData);
      } else {
        const { data: loginData } = await axios.post(
          "http://localhost:8080/auth/login",
          {
            email,
            password,
          }
        );
        console.log("user login...", loginData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size="lg"
        style={{ marginRight: "1rem", padding: "0.5rem 3rem" }}
        onClick={handleShow}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
