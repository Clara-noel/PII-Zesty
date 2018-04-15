import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Login from '../Zesty/scenes/authentication/Login';
import Subscribe from '../Zesty/scenes/authentication/Subscribe';
import SubscribeFinal from '../Zesty/scenes/authentication/SubscribeFinal';
import itsworks from '../Zesty/scenes/authentication/itsworks';
import Profil from './scenes/main/profil/Profil';
import { Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModificationPrenom from './scenes/main/profil/modificationPrenom';
import ModificationEmail from './scenes/main/profil/modificationEmail';

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
                key={'subscribe'}
                title={' '}
                component={Subscribe}
                hideNavBar
            />
            <Scene
                key={'subscribeFinal'}
                title={' '}
                component={SubscribeFinal}
                hideNavBar
            />
            <Scene
                key={'modificationPrenom'}
                title={' '}
                component={ModificationPrenom}
                hideNavBar
            />
            <Scene
                key={'modificationEmail'}
                title={' '}
                component={ModificationEmail}
                hideNavBar
            />
            <Scene
                key="tabbar"
                tabs={true}
                tabBarStyle={{ backgroundColor: '#FFFFFF' }}
                //initial={true}
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
                //initial={true}
                title={' '}
                component={Profil}
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