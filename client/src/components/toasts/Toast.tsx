import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Toast from "react-bootstrap/Toast";

import { removeToast } from "../../store/actions/actionCreators";

interface IProps {
    itemName: string;
    removeToast(): void;
}

const BSToast: React.FC<IProps> = ({ itemName, removeToast }) => {
    const [showToast, setShowToast] = useState(true);
    const [display, setDisplay] = useState("block");
    const timer = 3000;

    const handleOnClose = () => {
        cleanupToast();
    };

    //prevent toast from blocking UI and UI mouse events when it is closed
    const cleanupToast = () => {
        setShowToast(false);
        setDisplay("none");
        removeToast();
    };

    //automatically close toast after set amt of time
    useEffect(() => {
        let timeout = window.setTimeout(() => {
            cleanupToast();
        }, timer);

        return () => {
            clearTimeout(timeout);
        };
    });

    return (
        <StyledToast
            autohide={true}
            delay={timer}
            className="fade"
            transition={false}
            show={showToast}
            onClose={handleOnClose}
            style={{ display }}
        >
            <StyledToastHeader>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Added to Cart</strong>
            </StyledToastHeader>
            <Toast.Body>{itemName}</Toast.Body>
        </StyledToast>
    );
};

const actionCreators = {
    removeToast
};

export default connect(
    null,
    actionCreators
)(BSToast);

const StyledToastHeader = styled(Toast.Header)``;

const StyledToast = styled(Toast)``;
