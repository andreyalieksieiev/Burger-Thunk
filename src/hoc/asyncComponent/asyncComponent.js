import React, { Component } from 'react';

const asyncComponent = (importComponent) => {  // принимает функцию на вход 
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importComponent()  //  динамический синтаксис импортиа
                .then(cmp => { // обещание что в конечном етоге будет component
                    this.setState({component: cmp.default});
                });
        }

        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null
        }
    }
}

export default asyncComponent;