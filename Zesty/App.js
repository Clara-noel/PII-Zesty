import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Login from '../Zesty/scenes/authentication/Login';
import Register from '../Zesty/scenes/authentication/Register';
import itsworks from '../Zesty/scenes/authentication/itsworks';
import { Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabIcon = ({ focused, title, iconName}) => {
    return (
    <View
    style={{borderBottomWidth: focused ? 25 : 25, borderBottomColor: 'transparent'}}> 
    <Icon name={iconName} color={focused ? '#ff4757' : '#747d8c'} size={35} /> 
    </View>
    )
};


export default class App extends Component {
    render() {
        return (
            <Router>
            <Scene key='root'>
            <Scene
                key={'login'}
                component={Login}
                initial={true}
                hideNavBar
            />
            <Scene
                key={'register'}
                title={' '}
                component={Register}
                hideNavBar
            />
            <Scene
                key="tabbar"
                tabs={true}
                tabBarStyle={{ backgroundColor: '#FFFFFF' }}
            >
            <Scene
                key={'calendar'}
                title={' '}
                component={itsworks}
                initial={true}
                iconName={'calendar'}
                icon={TabIcon}
                hideNavBar
            />
            <Scene
                key={'favorites'}
                title={' '}
                component={itsworks}
                iconName={'heart'}
                icon={TabIcon}
                hideNavBar
            />
            <Scene
                key={'recipes'}
                title={' '}
                component={itsworks}
                iconName={'rocket'}
                icon={TabIcon}
                hideNavBar
            />
            <Scene
                key={'shopping-list'}
                title={' '}
                component={itsworks}
                iconName={'shopping-cart'}
                icon={TabIcon}
                hideNavBar
            />
            <Scene
                key={'profil'}
                title={' '}
                component={itsworks}
                iconName={'user'}
                icon={TabIcon}
                hideNavBar
            />
            </Scene>
            </Scene>
            </Router>
        )
    }
}