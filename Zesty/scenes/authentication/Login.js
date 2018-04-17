import React, { Component } from 'react';
import { firebaseRef } from '../../services/Firebase'
import firebase from 'firebase';
import { View, Image, ImageBackground, Animated, Keyboard, StatusBar} from 'react-native';
import _ from 'lodash';
import { Input } from '../../components/Input';
import { ButtonPink, ButtonWhite, ButtonBlue } from '../../components/Button';
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
            var Id = firebaseRef.auth().currentUser.uid
            Actions.profil()
        }).catch(function(error){
            alert('L’adresse et/ou le mot de passe sont erronés')
        })
    }
    _register() {
    Actions.subscribe();
    }
    async loginWithFacebook() {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('2188292048109750', {permissions: ['public_profile']})

        if(type == 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            firebaseRef.auth().signInWithCredential(credential).then(() => {
                var Id = firebaseRef.auth().currentUser.uid
                Actions.profil({myId:Id})
            }).catch((error) => {
                console.log(error)
            })
        }
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
            placeholder='Votre adresse email ...'
            label='Email'
            onChangeText={email => this.setState({email})}
            value={this.state.mail}
            />
            <Input
            title='MOT DE PASSE'
            placeholder='Votre mot de passe ...'
            label='Password'
            secureTextEntry
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            />
            <ButtonPink onPress={this._login}>Se connecter</ButtonPink>
            <ButtonWhite onPress={this._register}>S'inscrire</ButtonWhite>
            <ButtonBlue onPress={() => this.loginWithFacebook()}>Connexion avec Facebook</ButtonBlue>
            </Animated.View>
            </View>
            </ImageBackground>
    );
}
}
