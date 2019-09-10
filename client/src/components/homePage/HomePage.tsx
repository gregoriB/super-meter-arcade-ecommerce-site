import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import queryDatabase from "../../helpers/queryDatabase";
import FeaturedCarousel from "./Carousel";
import HomeJumbotron from "./HomeJumbotron";
import { populateFeaturedProducts, updateSearch } from "../../store/actions/actionCreators";
import { IQueryDBArgs, IProduct } from "../../types/types";

interface IProps {
    populateFeaturedProducts(val: IProduct[]): void;
    updateSearch(val: string): void;
}

const HomePage: React.FC<IProps> = ({ populateFeaturedProducts, updateSearch }) => {
    useEffect(() => {
        (async () => {
            const dbQuery: IQueryDBArgs = { path: "home" };
            const data: IProduct[] = await queryDatabase(dbQuery);
            populateFeaturedProducts(data);
        })();
    }, [populateFeaturedProducts]);
    useEffect(() => {
        updateSearch("");
    });
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel />
        </HomeContainer>
    );
};

const actionCreators = {
    populateFeaturedProducts,
    updateSearch
};

export default connect(
    null,
    actionCreators
)(HomePage);

/* ~~~~~~ -- styling -- ~~~~~~ */

const HomeContainer = styled.div`
    width: 100%;
    max-width: 2000px;
    margin: 0 auto;
`;
