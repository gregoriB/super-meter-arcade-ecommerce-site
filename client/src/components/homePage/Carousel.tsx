import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";

import mapProductData from "../../helpers/mapProductData";
import { stdBreakPoint } from "../../helpers/breakPoints";
import { IProduct } from "../../types/generalTypes";

interface IProps {
    products: IProduct[];
    windowWidth: number;
}

const FeaturedCarousel: React.FC<IProps> = ({ products, windowWidth }) => {
    const [items, setItems] = useState();

    //populate carousel products from redux store
    useEffect(() => {
        const mapFeatured = () => {
            const featured = mapProductData({ component: "FeaturedCard", products });
            featured &&
                setItems(
                    featured.map((product: React.ReactChild, index: number) => {
                        //if on mobile or small display, map 1 featured item per carousel item, otherwise map 2.
                        if (index % 2 !== 0 && window.innerWidth > 992) return null;
                        return (
                            <StyledCarouselItem key={index}>
                                {product}
                                {window.innerWidth > 992 &&
                                    index + 1 <= featured.length &&
                                    featured[index + 1]}
                            </StyledCarouselItem>
                        );
                    })
                );
        };
        mapFeatured();
        window.addEventListener("resize", mapFeatured);
        return () => {
            window.removeEventListener("resize", mapFeatured);
        };
    }, [setItems, products, windowWidth]);

    if (!items) return null;
    return <StyledCarousel interval={3500}>{items}</StyledCarousel>;
};

interface IState {
    products: { [key: string]: IProduct[] };
    windowSize: { windowWidth: number };
}

const mapStateToProps = (state: IState) => ({
    products: state.products.featured,
    windowWidth: state.windowSize.windowWidth
});

export default connect(mapStateToProps)(FeaturedCarousel);

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledCarousel = styled(Carousel)`
    &.carousel {
        display: flex;
        margin-top: 7vh;
    }

    .carousel-inner {
        display: flex;
        width: 100%;
    }

    .carousel-item {
        display: none;
    }

    .carousel-item-left,
    .carousel-item-right {
        display: inline-flex;
        width: 100%;
    }

    .carousel-item.active,
    .carousel-item-next,
    .carousel-item-prev {
        transition: -webkit-transform 0.6s ease;
        transition: transform 0.6s ease;
        transition: transform 0.6s ease, -webkit-transform 0.6s ease;
        width: 100%;
        display: inline-flex;
        justify-content: center;
    }

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
        padding: 2rem;
        background-color: #6c757d;
        background-size: 50%;
        background-position: 45%;
        border-radius: 50%;
        opacity: 0.6;
        @media (max-width: ${stdBreakPoint}px) {
            display: none;
        }
    }

    .carousel-indicators li {
        background: rgba(0, 0, 0, 0.4);
        height: 10px;
        border: none;
    }
`;

const StyledCarouselItem = styled(Carousel.Item)`
    width: 100%;
    justify-content: center;
    align-items: center;
    height: unset;
    .card {
        height: 500px;
        @media (max-width: ${stdBreakPoint}px) {
            height: unset;
            max-height: 350px;
        }
    }
`;
