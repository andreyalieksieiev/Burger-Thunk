import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (  //один елемент навигацыи
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            exact={props.exact} // точный маршрут
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;
