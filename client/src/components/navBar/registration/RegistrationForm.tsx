import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";

import * as validate from "../../../helpers/formValidation";

const initialFieldsState = {
    username: { text: "", isValid: null, borderColor: "#dfdfdf" },
    email: { text: "", isValid: null, borderColor: "#dfdfdf" },
    password: { text: "", isValid: null, borderColor: "#dfdfdf" }
};

interface ILocalUserData {
    [key: string]: {
        text: string;
        isValid: boolean | null;
        borderColor: string;
    };
}

interface IProps {
    showWarning(): void;
    setUserData(val: ILocalUserData): void;
}

const RegistrationPage: React.FC<IProps> = ({ showWarning, setUserData }) => {
    const [fields, setFields] = useState(initialFieldsState);
    const { username, email, password } = fields;

    type FormElem = React.ChangeEvent<HTMLFormElement>;
    const handleSubmit = (e: FormElem) => {
        e.preventDefault();
        if (username.isValid && email.isValid && password.isValid) {
            setUserData(fields);
            showWarning(); //warn user that website is not a real store before creating a new account
            setFields(initialFieldsState);
        }
    };

    type keyboardEvent = React.ChangeEvent<EventTarget>;
    //controlled inputs
    const handleChange = (e: keyboardEvent) => {
        const target = e.currentTarget as HTMLInputElement;
        const { validateUsername, validateEmail, validatePassword } = validate;
        const { name, value } = target;
        let isValid = null;

        if (value) {
            switch (name) {
                case "username":
                    isValid = validateUsername(value);
                    break;
                case "email":
                    isValid = validateEmail(value);
                    break;
                case "password":
                    isValid = validatePassword(value);
                    break;
                default:
                    break;
            }
        }
        setFields({
            ...fields,
            [name]: {
                text: value,
                isValid,
                borderColor: isValid ? "green" : isValid === null ? "#dfdfdf" : "red"
            }
        });
    };
    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        value={username.text}
                        onChange={handleChange}
                        autoComplete="username"
                        style={{ borderBottomColor: username.borderColor }}
                    />
                    <ToolTip
                        visibility={username.isValid === null || username.isValid ? "hidden" : "visible"}
                    >
                        username can only include numbers, letters, and _
                    </ToolTip>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="email"
                        name="email"
                        value={fields.email.text}
                        onChange={handleChange}
                        autoComplete="email"
                        style={{ borderBottomColor: email.borderColor }}
                    />
                    <ToolTip visibility={email.isValid === null || email.isValid ? "hidden" : "visible"}>
                        please enter a valid email address
                    </ToolTip>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="password"
                        value={fields.password.text}
                        onChange={handleChange}
                        autoComplete="new-password"
                        style={{ borderBottomColor: password.borderColor }}
                    />
                    <ToolTip
                        visibility={password.isValid === null || password.isValid ? "hidden" : "visible"}
                    >
                        password must contain '!' or '?', and at least one capitalized letter
                    </ToolTip>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create new account
                </Button>
            </Form>
        </FormContainer>
    );
};

export default RegistrationPage;

/* ~~~~~~ -- styling -- ~~~~~~ */

const FormContainer = styled.div`
    margin: 0 auto;
    width: 100%;
    background: white;
    padding: 2rem;
    div {
        margin: 0;
    }
    button {
        margin: 3rem 0;
        margin-bottom: 1rem;
    }
    input {
        margin-top: 2rem;
        border: 1px solid #dfdfdf;
        background: #f8f9fa;
    }
`;

type visibility = { visibility?: string };

const ToolTip = styled.div<visibility>`
    position: absolute;
    text-align: justify;
    padding: 0.2rem;
    width: 100%;
    color: #41688a;
    background: #fff3cd;
    border-radius: 5px;
    font-family: monospace;
    font-size: 12px;
    letter-spacing: 1px;
    visibility: ${props => props.visibility};
    z-index: 1000;
    border: 1px solid #f8d7da;
`;
