import React, { useState, useEffect } from "react";
// import { IData } from "../types/types";
import Components from "../helpers/Components";

interface IData {
    imageURL: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    price: number;
}

interface IProps {
    type: string;
    products: IData[];
}

const useMapProductData = ({ type, products }: IProps) => {
    const [mapped, setMapped] = useState();
    useEffect(() => {
        if (mapped || !products || products.length < 1) {
            return;
        }
        const Component = Components[type];
        setMapped(
            products.map((item: IData, index: number) => (
                <Component
                    key={index}
                    index={index}
                    imageURL={item.imageURL}
                    name={item.name}
                    shortDescription={item.shortDescription}
                    longDescription={item.longDescription}
                    price={item.price}
                />
            ))
        );
    }, [mapped, setMapped, type, products]);

    return mapped;
};

export default useMapProductData;
