import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {//  папка контактных даных
    state = {
        orderForm: {                 // ФОРМА ЗАКАЗА
                name: {
                    elementType: 'input',       // обичные html теги
                    elementConfig: {       
                        type: 'text',            // тип может бить текст
                        placeholder: 'Your Name' // заполнитель поля ввода
                    },
                    value: '',
                    validation: {        // проверка на валидность
                        required: true
                    },
                    valid: false,
                    touched: false                    //  значение для имени
                },
                street: {
                    elementType: 'input',       // обичные html теги
                    elementConfig: {       
                        type: 'text',            // тип может бить текст
                        placeholder: 'Street'  // заполнитель поля ввода
                    },
                    value: '',
                    validation: {        // проверка на валидность
                        required: true   // правило - как требуется
                    },
                    valid: false,
                    touched: false                      //  значение для имени
                },
                zipCode: {
                    elementType: 'input',       // обичные html теги
                    elementConfig: {       
                        type: 'text',            // тип может бить текст
                        placeholder: 'ZIP Code' // заполнитель поля ввода
                    },
                    value: '',
                    validation: {        // проверка на валидность
                        required: true,  // правило - как требуется ( поле не должно бить пустим )
                        minLength: 5,
                        maxLength: 5   
                    },
                    valid: false,
                    touched: false                      //  значение для имени
                },
                country: {
                    elementType: 'input',      // обичные html теги
                    elementConfig: {       
                        type: 'text',            // тип может бить текст
                        placeholder: 'Country' // заполнитель поля ввода
                    },
                    value: '',
                    validation: {        // проверка на валидность
                        required: true   // правило - как требуется
                    },
                    valid: false,
                    touched: false                      //  значение для имени
                },
                emale: {
                    elementType: 'input',        // обичные html теги
                    elementConfig: {       
                        type: 'email',            // тип может бить email
                        placeholder: 'Your E-Mail' // заполнитель поля ввода
                    },
                    value: '',
                    validation: {        // проверка на валидность
                        required: true   // правило - как требуется
                    },
                    valid: false,
                    touched: false                      //  значение для имени( дествительное свойство )
                },
                deliveryMethod: {
                    elementType: 'select',       // вибрать
                    elementConfig: {       
                       options: [                               // выбор опцый
                           {value: 'fastest', displyValue: 'Fastest'},  // самая бистрая
                           {value: 'cheapest', displyValue: 'Cheapest'} // самый дешовый
                        ]
                    },
                    value: 'fastest',                   //  значение для имени
                    validation: {},
                    valid: true
                }
        },
        formIsValid: false
    }

    orderHandler = (event) => {  // метод для создания заказа
        event.preventDefault();// по умолчянию запретит отправку ненужного запроса
       
        const formData = {};
        for (let formElementIdentifire in this.state.orderForm) {
            formData[formElementIdentifire] = this.state.orderForm[formElementIdentifire].value;
        }
        const order = {  // второй аргумент для ОТПРАВКИ заказа на сервер
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
        
    }
      //  метод проверки валидности                  
   
                                                         // 1. значение 2. входной индетификатор
    inputChangedHandler = (event, inputIdentifier) => {  // метод для изменения состояния значения
       
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm =  updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement 
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
      
    }

    render () { // масив ЕЛЕМЕНТОВ ФОРМ
        const formElementsArray = [];  // переберем обект со свойствами (ключю значение) и наполним его
        for (let key in this.state.orderForm) {  //  добираемся до ключей (формы заказа)
            formElementsArray.push({               // здесь наполняем масив (и получяем масив обектов)
                id: key,                           // ключ
                config: this.state.orderForm[key]  // значение
            });
        }
        let form = (                            // обработчик событий
            <form onSubmit={this.orderHandler}> 
                {formElementsArray.map(formElement => ( //перебираем масив елементов с помощю MAP и получ. новий масив (пользовательський компонент ввода)
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
   
};

export default connect(mapStateToProps,  mapDispatchToProps)(withErrorHandler(ContactData, axios));