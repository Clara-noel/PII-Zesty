// Page d'inscription 2/2
import React, { Component } from 'react';
import { firebaseRef } from '../../services/Firebase'
import { View, ImageBackground, Animated, Keyboard, StatusBar} from 'react-native';
import _ from 'lodash';
import { Input } from '../../components/Input';
import { ButtonWhite, ButtonBack } from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from '../authentication/styles';
import logo from '../../ressources/Logo.png';

export default class SubscribeFinal extends Component {
    constructor(props) {
        super(props)
// Récupération des variables envoyées par Subscribe.js
        this.firstname = this.props.firstname;
        this.diet = this.props.diet;
        this.allergies = this.props.allergies;
        this.state = {
            email: '',
            password: '',
            verifyPassword: '',
        }
        this._subscribeFinal = this._subscribeFinal.bind(this)

        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }

// Appelle la fonctionnalité de création de nouvel utilisateur propre à Firebase et appelle _registerDB

    _subscribeFinal() {
        firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            var myId = firebaseRef.auth().currentUser.uid
            this._registerDB(this.firstname, this.diet, this.allergies, myId, this.state.email);
        }).catch(function(error) {
            console.log(error.code)
            console.log(error.message)
        });
    }

// Si l'inscription Firebase à fonctionné, inscrit l'utilisateur dans la BDD en utilisant son ID Firebase (myId) comme clé principale
    _registerDB(myname, mydiet, myallergies, myId, myemail) {
        var usersRef = firebaseRef.database().ref().child("Users/" + myId);
        usersRef.update({
        InformationsPersonnelles: {
            Prenom: myname,
            Regime: mydiet,
            Allergies: myallergies,
            Email: myemail,
        }
        });
        // Renvoit à la page de Login pour une première connexion (on aurait pu faire une connexion automatique ici car on a le mdp et le mail)
        alert("L'inscription est validée, veuillez vous connecter une première fois")
        Actions.login();
    }

// Retour en arrière => Actions.pop() est une fonction de base de router-flux
    _back() {
        Actions.pop();
    }

//// Fonctions qui permettent d'améliorer l'utilisabilité de l'application => réduit le logo et remonte les inputs pour faire apparaitre tous les boutons
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
/// 
    render() {
        return (
            <ImageBackground source={require('../../ressources/backgroundImage.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
            <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
            <Input
            title='EMAIL'
            placeholder= {'Entrez votre adresse e-mail'}
            label='Email'
            onChangeText={email => this.setState({email})}
            value={this.state.email}
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
            <ButtonWhite onPress={this._subscribeFinal}>Inscription</ButtonWhite>
            <ButtonBack onPress={this._back}>Retour</ButtonBack>
            </Animated.View>
            </View>
            </ImageBackground>
        );
    }
}
