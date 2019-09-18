import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import queryDatabase from "../../helpers/queryDatabase";
import FeaturedCarousel from "./Carousel";
import HomeJumbotron from "./HomeJumbotron";
import { populateFeaturedProducts, updateSearch } from "../../store/actions/actionCreators";
import { IQueryDBArgs, IProduct } from "../../types/generalTypes";
import { stdBreakPoint } from "../../helpers/breakPoints";

interface IProps {
    windowWidth: number;
    populateFeaturedProducts(val: IProduct[]): void;
    updateSearch(val: string): void;
}

const HomePage: React.FC<IProps> = ({ populateFeaturedProducts, updateSearch, windowWidth }) => {
    useEffect(() => {
        (async () => {
            const dbQuery: IQueryDBArgs = { path: "home" };
            const data: IProduct[] = await queryDatabase(dbQuery);
            populateFeaturedProducts(data);
        })();
    }, [populateFeaturedProducts]);
    useEffect(() => {
        updateSearch("");
    }, [updateSearch]);

    useEffect(() => {}, [windowWidth]);
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel />
        </HomeContainer>
    );
};

interface IState {
    windowSize: {
        windowWidth: number;
    };
}

const mapStateToProps = (state: IState) => ({
    windowWidth: state.windowSize.windowWidth
});

const actionCreators = {
    populateFeaturedProducts,
    updateSearch
};

export default connect(
    mapStateToProps,
    actionCreators
)(HomePage);

/* ~~~~~~ -- styling -- ~~~~~~ */

const HomeContainer = styled.div`
    position: absolute;
    top: 52px;
    left: 0;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    @media (min-width: 1600px) {
        left: calc((100vw - 1600px) / 2);
    }
    @media (max-width: ${stdBreakPoint}px) {
        top: 60px;
    }
`;
