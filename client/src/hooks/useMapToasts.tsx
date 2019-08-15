import React, { useEffect, useState } from "react";
import Toast from "../components/Toast";

const useMapToasts = (props: any) => {
    const [activeToasts, setActiveToasts] = useState();
    useEffect(() => {
        props.productArr &&
            setActiveToasts(
                props.productArr.map((item: number, index: number) => (
                    <Toast item={Number(item)} key={index} />
                ))
            );
    }, [props.productArr]);
    return activeToasts;
};

export default useMapToasts;