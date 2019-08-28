import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {  // создатель синхронних действий
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {     // создатель синхронних действий
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {  // создатель Aсинхронних действий
    return dispatch => {
    dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)// отправляем заказ бургера на сервер
            .then( response => {                                  
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
               
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders //  и передать закази в качестве полезной загрузки
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo"' + userId + '"';
        axios.get('/orders.json' + queryParams)  // получяем ответ с сервера
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({// создаю новий обект и распредиляю свойства обекта ORDER
                    ...res.data[key],
                    id: key  // и добавляю новий идентификатор  с fierbase
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));;
        })
        .catch(err=> {
            dispatch(fetchOrdersFail(err));
        });
    };
};