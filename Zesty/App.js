import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Login from '../Zesty/scenes/authentication/Login';
import Register from '../Zesty/scenes/authentication/Register';
import itsworks from '../Zesty/scenes/authentication/itsworks';
import { Router, Scene } from 'react-native-router-flux';


export default class App extends Component {
    render() {
        return (
            <Router>
            <Scene key='root'>
            <Scene
                key={'login'}
                component={Login}
                initial={true}
            />
            <Scene
                key={'Register'}
                component={Register}
            />
            <Scene
                key={'itsworks'}
                component={itsworks}
            />
            </Scene>
            </Router>
        )
    }
}