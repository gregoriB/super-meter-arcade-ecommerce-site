import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { stdBreakPoint, maxWidth } from "../../helpers/breakPoints";

import ShoppingCartModal from "../shoppingCart/ShoppingCartModal";
import SearchForm from "./SearchForm";
import LoginForm from "./login/LoginForm";

const NavBar: React.FC<RouteComponentProps> = ({ history }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleNav = () => {
        setIsExpanded(prevState => !prevState);
    };

    const navigateToHomePage = () => {
        setIsExpanded(false);
        history.push(`/`);
    };

    return (
        <NavContainer isExpanded={isExpanded}>
            <StyledNavbar bg="light" expand="lg" expanded={isExpanded}>
                <StyledNavbarToggle aria-controls="basic-navbar-nav" onClick={toggleNav} />
                <StyledNavbarCollapse id="basic-navbar-nav">
                    <BrandSearchContainer>
                        <HomeButton onClick={navigateToHomePage}>
                            <StyledNavbarBrand>Super Meter Arcade</StyledNavbarBrand>
                            <HomeLink>Home</HomeLink>
                        </HomeButton>
                        <SearchForm hideNav={() => setIsExpanded(false)} />
                    </BrandSearchContainer>
                    <LoginForm />
                </StyledNavbarCollapse>
                <ShoppingCartModal
                    show={isModalOpen}
                    hideNav={() => setIsExpanded(false)}
                    onHide={() => setIsModalOpen(false)}
                />
            </StyledNavbar>
            <ShoppingCartButton onClick={() => setIsModalOpen(true)} variant="outline-secondary">
                <StyledShoppingCartIcon icon="shopping-cart" size="1x" />
            </ShoppingCartButton>
        </NavContainer>
    );
};

export default withRouter(NavBar);

/* ~~~~~~ -- styling -- ~~~~~~ */

type isExpanded = { isExpanded: boolean };

const NavContainer = styled.div<isExpanded>`
    position: fixed;
    margin: 0 auto;
    padding: 0;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    max-width: ${maxWidth}px;
    background: #f8f9fa;
    transition: height 0.2s;
    height: 60px;
    @media (max-width: ${stdBreakPoint}px) {
        height: ${props => (props.isExpanded ? "100vh" : "60px")};
    }
    @media (min-width: ${maxWidth}px) {
        left: calc((100vw - ${maxWidth}px) / 2);
    }
`;

const StyledNavbar = styled(Navbar)`
    &.navbar {
        box-sizing: border-box;
        width: 100%;
        max-width: ${maxWidth}px;
        margin: 0 auto;
        height: 52px;
        @media (min-width: ${stdBreakPoint + 1}px) {
            padding: 0.375rem 4rem;
            padding-top: 0.75rem;
        }
    }
`;

const HomeButton = styled.button`
    background: none;
    border: none;
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
    &.navbar-brand {
        font-family: "Lexend Exa", sans-serif;
        margin: 0;
        @media (max-width: ${stdBreakPoint}px) {
            display: none;
            margin: 0;
        }
    }
`;

const HomeLink = styled.div`
    margin: 1rem 0;
    display: none;
    @media (max-width: ${stdBreakPoint}px) {
        display: block;
        width: unset;
    }
`;

const BrandSearchContainer = styled.div`
    margin-right: auto;
    max-width: 70%;
    display: flex;
    @media (max-width: ${stdBreakPoint}px) {
        flex-direction: column;
        align-items: flex-start;
        margin: 1rem 0;
    }
`;

const ShoppingCartButton = styled(Button)`
    &.btn {
        border: none;
        width: 3rem;
        height: 2.5rem;
        margin: 0 2rem;
        align-self: center;
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        margin: 0;
    }
`;

const StyledShoppingCartIcon = styled(FontAwesomeIcon)``;

const StyledNavbarCollapse = styled(Navbar.Collapse)`
    &.navbar-collapse {
        justify-content: flex-start;
    }
`;

const StyledNavbarToggle = styled(Navbar.Toggle)``;
