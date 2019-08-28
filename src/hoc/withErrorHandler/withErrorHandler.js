import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxel from '../Auxel/Auxel';

const withErrorHandler = ( WrappedComponent, axios ) => { //функцыя принимает обернутий компонент 
    return class extends Component {                      
        state = {
            error: null
        }
        componentWillMount () {                     // установка глобальных перехватчиков на ошибки
            this.reqInterceptor = axios.interceptors.request.use(req=> {  // на запрос
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {  // на ответ
                this.setState({error: error})
            });
        }

        componentWillUnmount () {    // Для удаления перехватчиков
            //console.log('Will Unmount', this.reqInterceptor, this.resInterceptor );
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render  () {
            return (                  // возвращает завернутий компонент
                <Auxel>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxel>     
            );
        }
    } 
}

export default withErrorHandler;