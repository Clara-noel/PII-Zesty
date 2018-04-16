import React, { Component } from 'react';
import { firebaseRef } from '../../services/Firebase'
import { View, ImageBackground, Animated, Keyboard, StatusBar} from 'react-native';
import _ from 'lodash';
import { Input } from '../../components/Input';
import { ButtonWhite, ButtonBack } from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import itsworks from './itsworks';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from '../authentication/styles';
import logo from '../../ressources/Logo.png';

export default class SubscribeFinal extends Component {
    constructor(props) {
        super(props)
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
    _subscribeFinal() {
        firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            var myId = firebaseRef.auth().currentUser.uid
            this._registerDB(this.firstname, this.diet, this.allergies, myId, this.state.email);
        }).catch(function(error) {
            console.log(error.code)
            console.log(error.message)
        });
    }
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
        Actions.login();
    }
    _back() {
        Actions.pop();
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
