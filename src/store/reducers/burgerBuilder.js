import * as actionTypes from '../actions/actionsTypes'; // импорт типизацыю с отдельной папки     (actions.js)
import { updateObject } from  '../../shared/utility';

const initialState = {   // начальное состояния для построения бургера
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updateIngredient);
    const updataState = { 
        ingredients: updatedIngredients ,                                                 // а затем ми распредиляем все ингридиенти в наш новий обект
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true
    }
        
    return updateObject(state, updataState);                                                     // ТАК МИ ДОБАВЛЯЕМ ИНГРИДИЕНТИ
          // копируем все старое состояние 
        // ми устон. общ. цену равную старую общей цене + цени на ингридиенти
};

const removeIngredient = (state, action) => {
    const updateIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updateIngs = updateObject(state.ingredients, updateIng);
            const updataSt = { 
                ingredients: updateIngs ,                                                 // а затем ми распредиляем все ингридиенти в наш новий обект
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            }
                return updateObject(state,updataSt); 
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    }); 
};

const fetchIngredientFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {     //   переключаю тип действия
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state, action); 
        case actionTypes.SET_INGREDIENT: return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action);
        default: return state;        
    }
};

export default reducer;