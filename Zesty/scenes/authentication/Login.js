import React, { Component } from 'react';
import { firebaseApp, firebaseRef } from '../../services/Firebase'
import {StyleSheet, Text, View, Image, ImageBackground, Animated, Keyboard, StatusBar} from 'react-native';
import _ from 'lodash';
import { Input } from '../../components/Input';
import { ButtonConnexion, ButtonInscription, ButtonFacebook } from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import itsworks from './itsworks';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from '../authentication/styles';
import logo from '../../ressources/Logo.png';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }

        this._login = this._login.bind(this)
        this._register = this._register.bind(this)

        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }

    _login() {
       firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            Actions.calendar()
        }).catch(function(error){
            console.log(error.code)
            console.log(error.message)
        })
    }
    _register() {
    Actions.subscribe();
    }
    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }
    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }
    keyboardWillShow = (event) => {
        Animated.parallel([
        Animated.timing(this.keyboardHeight, {
            duration: event.duration,
            toValue: event.endCoordinates.height,
        }),
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: IMAGE_HEIGHT_SMALL,
        }),
        ]).start();
    };
    keyboardWillHide = (event) => {
        Animated.parallel([
        Animated.timing(this.keyboardHeight, {
            duration: event.duration,
            toValue: 0,
        }),
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: IMAGE_HEIGHT,
        }),
        ]).start();
    };
    render() {
        return (
            <ImageBackground source={require('../../ressources/backgroundImage.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
            <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
            <Input
            title='EMAIL'
            placeholder='Tapez votre adresse email ...'
            label='Email'
            onChangeText={email => this.setState({email})}
            value={this.state.mail}
            />
            <Input
            title='MOT DE PASSE'
            placeholder='Tapez votre mot de passe ...'
            label='Password'
            secureTextEntry
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            />
            <ButtonConnexion onPress={this._login}>Se connecter</ButtonConnexion>
            <ButtonInscription onPress={this._register}>S'inscrire</ButtonInscription>
            <ButtonFacebook>Connexion avec Facebook</ButtonFacebook>
            </Animated.View>
            </View>
            </ImageBackground>
    );
}
}
