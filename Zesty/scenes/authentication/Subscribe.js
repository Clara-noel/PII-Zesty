// Page d'inscription 1/2
import React, { Component } from 'react';
import { firebaseRef } from '../../services/Firebase'
import { Text, View, ImageBackground, Animated, Keyboard, StatusBar} from 'react-native';
import _ from 'lodash';
import { Input } from '../../components/Input';
import { ButtonPink, ButtonBack } from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from '../authentication/styles';
import logo from '../../ressources/Logo.png';
import ModalDropdown from 'react-native-modal-dropdown';
import { CheckBox } from 'react-native-elements';

export default class Subscribe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            diet: '',
            firstname: '',
            lactose: false,
            peanuts: false,
            crustaceans: false,
        }
        this._subscribe= this._subscribe.bind(this)

        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }

// Récupère et formate les données saisies sur la page pour les renvoyer à la seconde page d'inscription
    _subscribe() {
        if(this.state.firstname != '')
        {
            var allergies = '';
            if(this.state.lactose)
            allergies = allergies + 'A1;';
            if(this.state.crustaceans)
            allergies = allergies + 'A2;';
            if(this.state.peanuts)
            allergies = allergies + 'A3;';
            // Affichage page suivante par Actions et envoit des données
            Actions.subscribeFinal({diet:'P' + this.state.diet + ';', firstname:this.state.firstname, allergies:allergies})
        }
        else
        {
            alert('Le prénom est obligatoire ! ')
        }
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
            title='PRENOM'
            placeholder= 'Entrez votre prénom'
            label='firstname'
            onChangeText={firstname => this.setState({firstname})}
            value={this.state.firstname}
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
                onSelect={(diet) => this.setState({diet})}/>
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
                title="Crustacés"
                checked={this.state.crustaceans}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='#D33C5B'
                uncheckedColor='#3B5998'
                textStyle={{color: '#3B5998'}}
                containerStyle={{width:'80%', height:35, padding:5, marginBottom:0}}
                onPress={() => this.setState({ crustaceans: !this.state.crustaceans})}
            />
            <CheckBox
                title="Arachide"
                checked={this.state.peanuts}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='#D33C5B'
                uncheckedColor='#3B5998'
                textStyle={{color: '#3B5998'}}
                containerStyle={{width:'80%', height:35, padding:5, marginBottom:0}}
                onPress={() => this.setState({ peanuts: !this.state.peanuts})}
            />
            <ButtonPink onPress={this._subscribe}>Continuer</ButtonPink>
            <ButtonBack onPress={this._back}>Se connecter</ButtonBack>
            </Animated.View>
            </View>
            </ImageBackground>
        );
    }
}
