import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

type Props = {
    text: string;
    variant: string;
    isSignupFlow: boolean;
};

const ErrorMessage = styled.p`
    color: red;
`;

const ModalComponent = ({ text, variant, isSignupFlow }: Props) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const Navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = async () => {
        try {
            let response;
            if (isSignupFlow) {
                const { data: signUpData } = await axios.post(
                    "http://localhost:8080/auth/signup",
                    {
                        email,
                        password,
                    }
                );
                response = signUpData;
                console.log("user signin...", signUpData);
            } else {
                const { data: loginData } = await axios.post(
                    "http://localhost:8080/auth/login",
                    {
                        email,
                        password,
                    }
                );
                response = loginData;
                console.log("user login...", loginData);
            }

            await localStorage.setItem("token", response.data.token);
            Navigate("/articles")
        } catch (error: any) {
            const { msg } = error.response.data.errors[0];
            console.log("error123....", error, msg);
            setErrorMsg(msg);
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
                    {errorMsg ? <ErrorMessage>{errorMsg}</ErrorMessage> : null}
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
