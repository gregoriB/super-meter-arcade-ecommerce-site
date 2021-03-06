import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { stdBreakPoint } from "../../helpers/breakPoints";
import { IShoppingCart, IModalToggle } from "../../types/generalTypes";

import CartItems from "./CartItems";
import TotalPrice from "./TotalPrice";

interface IProps {
    windowWidth: number;
    shoppingCart: IShoppingCart;
    hideNav(): void;
}

const ShoppingCartModal: React.FC<IProps & IModalToggle & RouteComponentProps> = ({
    shoppingCart,
    onHide,
    show,
    hideNav,
    history,
    windowWidth
}) => {
    const [isCartPopulated, setIsCartPopulated] = useState(false);

    const navigateToCheckoutPage = () => {
        onHide();
        hideNav();
        history.push(`/checkout`);
    };

    //ref used for styling body in <CartItems />
    const cartRef = useRef<HTMLDivElement | null>(null);

    return (
        <StyledModal
            show={show}
            onHide={onHide}
            size={windowWidth > 992 ? (Object.values(shoppingCart).length ? "xl" : "lg") : null}
            aria-labelledby="contained-modal-title-right"
            centered
        >
            <Modal.Header closeButton>
                <StyledModalTitle id="contained-modal-title-vcenter">
                    <StyleCartIcon icon="shopping-cart" />
                    <div>Shopping Cart</div>
                </StyledModalTitle>
            </Modal.Header>
            <StyledModalBody ref={cartRef}>
                <CartItems setIsCartPopulated={setIsCartPopulated} cartRef={cartRef} />
                {isCartPopulated && <TotalPrice />}
            </StyledModalBody>
            <Modal.Footer>
                {isCartPopulated ? (
                    <LinkToCheckout onClick={navigateToCheckoutPage}>Go to checkout</LinkToCheckout>
                ) : (
                    <Button variant="outline-secondary" onClick={onHide}>
                        Close
                    </Button>
                )}
            </Modal.Footer>
        </StyledModal>
    );
};

interface IState {
    shoppingCart: IShoppingCart;
    windowSize: { windowWidth: number };
}

const mapStateToProps = (state: IState) => ({
    shoppingCart: state.shoppingCart,
    windowWidth: state.windowSize.windowWidth
});

export default connect(mapStateToProps)(withRouter(ShoppingCartModal));

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledModal = styled(Modal)`
    &.modal {
        @media (max-width: ${stdBreakPoint}px) {
            padding: 0 !important;
        }
        .modal-dialog {
            transition: 0.2s !important;
            @media (max-width: ${stdBreakPoint}px) {
                margin: 0 auto;
                width: 98%;
                min-width: 98%;
                max-width: 98%;
            }
        }
        .modal-content {
            min-height: 45vh;
        }
    }
`;

const StyledModalTitle = styled(Modal.Title)`
    display: flex;
    position: relative;
    align-items: center;
    color: #42484d;
    div {
        margin: 0 2rem;
        @media (max-height: ${stdBreakPoint}px) {
            font-size: 1.2rem;
        }
    }
`;

const StyledModalBody = styled(Modal.Body)`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const LinkToCheckout = styled.button`
    background: none;
    border: none;
    color: #007bff;
    padding: 0.2rem 0.5rem;
`;

const StyleCartIcon = styled(FontAwesomeIcon)`
    opacity: 0.7;
    color: #42484d;
`;
