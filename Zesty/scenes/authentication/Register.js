import React, { Component } from 'react';
import { firebaseApp, firebaseRef } from '../../services/Firebase'
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import _ from 'lodash';
import { Input } from '../../components/Input';
import { ButtonConnexion, ButtonInscription, ButtonFacebook } from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import Style from './styles';
import itsworks from './itsworks';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            verifyPassword: ''
        }
        this._register = this._register.bind(this)
    }

    _register() {
        if(this.state.password == this.state.verifyPassword){
            firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                Actions.login()
            }).catch(function(error) {
                console.log(error.code)
                console.log(error.message)
            });
        }
        else {
            console.log("Les mots de passe ne sont pas identiques")
        }
    }
    render() {
        return (
            <ImageBackground source={require('../../ressources/backgroundImage.png')} style={imageStyle.backgroundImage}>
            <View style={styles.container}>
            <Image source={require('../../ressources/Logo.png')} style={imageStyle.logo}/>
            <Input
            title='EMAIL'
            placeholder= 'Entrez votre adresse e-mail'
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
            <Input
            title='VERIFICATION DU MOT DE PASSE'
            placeholder='Re-tapez votre mot de passe ...'
            label='VerifyPassword'
            secureTextEntry
            onChangeText={verifyPassword => this.setState({verifyPassword})}
            value={this.state.verifyPassword}
            />
            <ButtonInscription onPress={this._register}>Inscription</ButtonInscription>
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
