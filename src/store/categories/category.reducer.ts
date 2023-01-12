import { AnyAction } from 'redux';

import { Category } from "./category.types";

import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess  } from "./category.action";



export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE, 
    action = {} as AnyAction
    ): CategoriesState => {
    if(fetchCategoriesStart.match(action)){
        return {...state, isLoading: true};
    }

    if(fetchCategoriesSuccess.match(action)){
        return {...state, isLoading: false, categories: action.payload};
    }

    if(fetchCategoriesFailed.match(action)){
        return {...state, isLoading: false, error: action.payload};
    }

    return state;
    // switch(action.type) {
    //     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
    //         return {...state, isLoading: true};
    //     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
    //         return {...state, isLoading: false, categories: action.payload};
    //     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
    //         return {...state, isLoading: false, error: action.payload};
    //     default: 
    //         return state;
    
};
