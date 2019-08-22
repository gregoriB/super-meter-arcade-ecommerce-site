import { IActionAdd } from "../actions/addToCart";

export interface IState {
    cart: {
        [key: number]: number;
    };
    productArr: number[];
}

const initialState: IState = {
    cart: {},
    productArr: []
};

const addToCart = (state = initialState, action: IActionAdd) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload]: state.cart[action.payload] + 1 || 1
                },
                productArr: [...state.productArr, action.payload]
            };
            break;
        default:
            break;
    }

    return state;
};

export default addToCart;