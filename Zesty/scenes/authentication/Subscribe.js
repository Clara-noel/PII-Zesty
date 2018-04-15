import React, { Component } from 'react';
import { firebaseApp, firebaseRef } from '../../services/Firebase'
import {StyleSheet, Text, View, Image, ImageBackground, Animated, Keyboard, ScrollView, StatusBar} from 'react-native';
import _ from 'lodash';
import { Input } from '../../components/Input';
import { ButtonPink, ButtonBack } from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import itsworks from './itsworks';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from '../authentication/styles';
import logo from '../../ressources/Logo.png';
import ModalDropdown from 'react-native-modal-dropdown';
import { CheckBox } from 'react-native-elements';

export default class Subscribe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            regAl: '',
            prenom: '',
            lactose: false,
            arachide: false,
            gambas: false,
        }
        this._subscribe= this._subscribe.bind(this)

        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }

    _subscribe() {
        if(this.state.prenom != '')
        {
            var allergies = '';
            if(this.state.lactose)
            allergies = allergies + 'A1;';
            if(this.state.gambas)
            allergies = allergies + 'A2;';
            if(this.state.arachide)
            allergies = allergies + 'A3;';
            Actions.subscribeFinal({regime:'P' + this.state.regAl + ';', prenom:this.state.prenom, allergies:allergies})
        }
        else
        {
            alert('Le prénom est obligatoire ! ')
        }
    }
    _back() {
        Actions.pop();
    }
    checked = (title) => {
        this.setState({title:!this.state.title});
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
            title='PRENOM'
            placeholder= 'Entrez votre prénom'
            label='Prenom'
            onChangeText={prenom => this.setState({prenom})}
            value={this.state.prenom}
            />
            <Text style={styles.label}>Régime alimentaire :</Text>
            <ModalDropdown
                style = {styles.dropdown}
                options={['Sans régime particulier', 'Végétarien','Vegan','Sans viande','Sans poisson','Sans oeuf','Sans porc','Sans boeuf' ]}
                defaultValue={'Veuillez sélectionner un régime...'}
                textStyle={{fontSize: 16, padding: 8, color:'#D33C5B'}}
                style={{marginTop: 2, padding: 3, width: '80%', borderRadius: 4, backgroundColor:'#eee'}}
                dropdownStyle={{marginTop: 2, padding: 3, backgroundColor:'#eee'}}
                dropdownTextStyle={{fontSize: 16, padding: 8, width:'100%', color:'#3B5998'}}
                onSelect={(regAl) => this.setState({regAl})}/>
            <Text style={styles.label}>Intolérances et allergies :</Text>
            <CheckBox
                title="Lactose"
                checked={this.state.lactose}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='#D33C5B'
                uncheckedColor='#3B5998'
                textStyle={{color: '#3B5998'}}
                containerStyle={{width:'80%', height:35, padding:5, marginBottom:0}}
                onPress={() => this.setState({ lactose: !this.state.lactose })}
            />
            <CheckBox
                title="Gambas"
                checked={this.state.gambas}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='#D33C5B'
                uncheckedColor='#3B5998'
                textStyle={{color: '#3B5998'}}
                containerStyle={{width:'80%', height:35, padding:5, marginBottom:0}}
                onPress={() => this.setState({ gambas: !this.state.gambas})}
            />
            <CheckBox
                title="Arachide"
                checked={this.state.arachide}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='#D33C5B'
                uncheckedColor='#3B5998'
                textStyle={{color: '#3B5998'}}
                containerStyle={{width:'80%', height:35, padding:5, marginBottom:0}}
                onPress={() => this.setState({ arachide: !this.state.arachide})}
            />
            <ButtonPink onPress={this._subscribe}>Continuer</ButtonPink>
            <ButtonBack onPress={this._back}>Se connecter</ButtonBack>
            </Animated.View>
            </View>
            </ImageBackground>
        );
    }
}
