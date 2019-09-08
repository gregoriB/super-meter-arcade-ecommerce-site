import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { removeToast } from "../../store/actions/actionCreators";
import Toast from "react-bootstrap/Toast";

const BSToast: React.FC<any> = ({ itemName, removeToast }) => {
    const [showToast, setShowToast] = useState(true);
    const [display, setDisplay] = useState("block");
    const timer = 3000;

    const handleOnClose = () => {
        cleanupToast();
    };

    const cleanupToast = () => {
        setShowToast(false);
        setDisplay("none");
        removeToast();
    };

    useEffect(() => {
        let timeout = window.setTimeout(() => {
            cleanupToast();
        }, timer);

        return () => {
            clearTimeout(timeout);
        };
    });

    return (
        <Toast
            autohide={true}
            delay={timer}
            className="fade"
            transition={false}
            show={showToast}
            onClose={handleOnClose}
            style={{ display }}
        >
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Added to Cart</strong>
            </Toast.Header>
            <Toast.Body>{itemName}</Toast.Body>
        </Toast>
    );
};

const actionCreators = {
    removeToast
};

export default connect(
    null,
    actionCreators
)(BSToast);