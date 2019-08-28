import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxel from '../../hoc/Auxel/Auxel';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component {  //строитель гамбургера
    // constructor(props) {
    //     super(props);
    //     this.state = {...} 
    // }
    state = {
        purchasing: false // покупка
    }
   
    componentDidMount () { // загрузка ингредиентов с сервера
            this.props.onInitIngredients();
           
    }
  
    updatePurchaseState (ingredients) {   //кнопка ORDEN NOW Пподключается    добавляем ингредиенти
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }


    purchaseHandler = () => {   ///метод покупки
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        }  else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {  // закрить фон чтоби отменить покупку
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => { // обрабативаем продолжения покупки
        //alert('You continue!');
        //this.props.history.push('/checkout');// эта опора позволяет нам толкать нас на новую страницу 
        // const queryParams = [];
        // for ( let i in this.state.ingredients) {// перебераем свойства ингредиентов
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));// кодирует елементи так что они могут бить использовани в URL
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');// строка хороших ингридиентов
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    render () {
        const disabledInfo = {
            ...this.props.ings  // ето свойство устонавливаетсяв mapStateToProps
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Auxel>
                    <Burger ingredients={this.props.ings}/>                    
                    <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                    price={this.props.price} />
                </Auxel>
            );
            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>;   
        } 
        // {salad: true, meat: false, bacon: false, cheese: false}
        return (
            <Auxel>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxel>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: (error) => dispatch(actions.initIngredients(error)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));