import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import clssses from './CheckoutSummary.css';

const checkoutSummary = (props) => { // свободный компонент оформления заказов
    return(
        <div className={clssses.CheckoutSummary}> 
            <h1>We hope it states well!</h1>
            <div stale={{width: '100px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/> 
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
    
}

export default checkoutSummary;