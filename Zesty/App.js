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
import ShoppingList from './scenes/main/ShoppingList';
import RecipesList from './scenes/main/recipes/RecipesList';

const TabIcon = ({ focused, iconName}) => {
    return (
    <View style={{marginTop:10}}>
    <Icon name={iconName} color={focused ? '#D33C5B' : '#747d8c'} size={30}/> 
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
                component={Subscribe}
                hideNavBar
            />
            <Scene
                key={'subscribeFinal'}
                component={SubscribeFinal}
                hideNavBar
            />
            <Scene
                key={'modificationName'}
                component={ModificationName}
                hideNavBar
            />
            <Scene
                key={'modificationEmail'}
                component={ModificationEmail}
                hideNavBar
            />
            <Scene
                key={'modificationPassword'}
                component={ModificationPassword}
                hideNavBar
            />
            <Scene
                key={'modificationDiet'}
                component={ModificationDiet}
                hideNavBar
            />
            <Scene
                key={'modificationAllergies'}
                component={ModificationAllergies}
                hideNavBar
            />
            <Scene
                key="tabbar"
                tabs={true}
                tabBarStyle={{ backgroundColor: '#FFFFFF' }}
                initial={true}
                showLabel = {false}
            >
            <Scene
                key={'calendar'}
                component={itsworks}
                //initial={true}
                iconName={'calendar'}
                icon={TabIcon}
                hideNavBar
            />
            <Scene
                key={'favorites'}
                component={itsworks}
                iconName={'heart'}
                icon={TabIcon}
                hideNavBar
            />
            <Scene
                key={'recipes'}
                component={RecipesList}
                iconName={'book'}
                icon={TabIcon}
                hideNavBar
                initial={true}
            />
            <Scene
                key={'shopping-list'}
                component={ShoppingList}
                iconName={'shopping-cart'}
                icon={TabIcon}
                hideNavBar
            />
            <Scene
                key={'profil'}
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