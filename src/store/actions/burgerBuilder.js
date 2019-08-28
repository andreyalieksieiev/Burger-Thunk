import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {  // создатель действий
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {  // создатель действий
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return  {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {  // функцыя отправки
        axios.get('https://react-my-bigburger.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch( fetchIngredientsFailed());
        });
    };
};