import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import itsworks from '../Zesty/scenes/authentication/itsworks';
import Login from '../Zesty/scenes/authentication/Login';
import Subscribe from '../Zesty/scenes/authentication/Subscribe';
import SubscribeFinal from '../Zesty/scenes/authentication/SubscribeFinal';
import Profil from './scenes/main/profil/Profil';
import ModificationName from './scenes/main/profil/ModificationName';
import ModificationEmail from './scenes/main/profil/ModificationEmail';
import ModificationPassword from './scenes/main/profil/ModificationPassword';
import ModificationDiet from './scenes/main/profil/ModificationDiet';
import ModificationAllergies from './scenes/main/profil/ModificationAllergies';

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
                key={'modificationName'}
                title={' '}
                component={ModificationName}
                hideNavBar
            />
            <Scene
                key={'modificationEmail'}
                title={' '}
                component={ModificationEmail}
                hideNavBar
            />
            <Scene
                key={'modificationPassword'}
                title={' '}
                component={ModificationPassword}
                hideNavBar
            />
            <Scene
                key={'modificationDiet'}
                title={' '}
                component={ModificationDiet}
                hideNavBar
            />
            <Scene
                key={'modificationAllergies'}
                title={' '}
                component={ModificationAllergies}
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