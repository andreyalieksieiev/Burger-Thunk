import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {  // свойство елементов управления
            email: {
                elementType: 'input',       
                elementConfig: {       
                    type: 'email',            
                    placeholder: 'Mail Adress' 
                },
                value: '',
                validation: {        
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false                    
            },
            password: {
                elementType: 'input',       
                elementConfig: {       
                    type: 'password',            
                    placeholder: 'Password' 
                },
                value: '',
                validation: {        
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false                    
            }
        },
        isSignup: true  // - должни бить в режиме регистрацыи
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }    

    

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName] : updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault(); // - визвать чтоб предотвратить перезагрузку страницы 
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }                                               // 

    switchAuthModelHandler = () => {
        this.setState(pervState => {              // получяю предидущее состояние
            return {isSignup: !pervState.isSignup};// получяю обект которий сливается в старое состояние(! чтоби переключять значения)
        })
    }

    render () {
        const formElementsArray = [];  // переберем обект со свойствами (ключю значение) и наполним его
        for (let key in this.state.controls) {  //  добираемся до ключей (формы заказа)
            formElementsArray.push({               // здесь наполняем масив (и получяем масив обектов)
                id: key,                           // ключ
                config: this.state.controls[key]  // значение
            });
        }

        let form = formElementsArray.map(formElement => (  // получяем каждий елемент форми и возвращаю <Input />
            <Input 
                key={formElement.id}  // --- использую индетефикатор елементов форми
                elementType={formElement.config.elementType}  
                elementConfig={formElement.config.elementConfig} // - ключ конфигурацыи
                value={formElement.config.value}  // - ключ значения
                invalid={!formElement.config.valid} 
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMassage = null;

        if (this.props.error) {
            errorMassage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMassage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>        
                <Button 
                    clicked={this.switchAuthModelHandler}    // - при нажатии кнопку она меняется
                    btnType ="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }</Button>             
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
