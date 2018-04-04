import React, { Component } from 'react';
import { firebaseApp, firebaseRef } from '../../services/Firebase'
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import _ from 'lodash';
import { Input } from '../../components/Input';
import { ButtonConnexion, ButtonInscription, ButtonFacebook } from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import Style from './styles';
import itsworks from './itsworks';
import Register from './Register';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            status: ''
        }

        this._login = this._login.bind(this)
        this._register = this._register.bind(this)
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
    Actions.register();
    }
    render() {
        return (
            <ImageBackground source={require('../../ressources/backgroundImage.png')} style={imageStyle.backgroundImage}>
            <View style={styles.container}>
            <Image source={require('../../ressources/Logo.png')} style={imageStyle.logo}/>
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
            </View>
            </ImageBackground>
    );
}
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin:15,
    },
});
const imageStyle = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    logo: {
        height: 160,
        width: 160,
        marginTop:20,
        marginBottom:30,
    },
});
