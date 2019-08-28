import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxel from '../Auxel/Auxel';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {  // компонент Макета
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => { // установка состояния зависит от старого состояния
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render () {
        return (
            <Auxel>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxel>
        )
    }  
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    };
};

export default connect(mapStateToProps)(Layout);
