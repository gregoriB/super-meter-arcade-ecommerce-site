import { IFiltersRtn } from "../../types/actionTypes";

interface initialState {
    [key: string]: string[] | number[] | undefined[];
}

const initialState: initialState = {
    allCategories: [],
    selectedCategories: [],
    priceRange: [undefined, undefined]
};

export default function filters(state = initialState, action: IFiltersRtn) {
    switch (action.type) {
        case "NEW_CATEGORIES":
            return (state = {
                ...state,
                allCategories: action.payload
            });
        case "SELECTED_CATEGORIES":
            return (state = {
                ...state,
                selectedCategories: action.payload
            });
        case "PRICE_RANGE":
            return (state = {
                ...state,
                priceRange: action.payload
            });
        default:
            return state;
    }
}
