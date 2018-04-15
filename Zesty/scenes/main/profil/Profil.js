import React, { Component } from 'react';
import { firebaseApp, firebaseRef } from '../../../services/Firebase';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import _ from 'lodash';
import { Input } from '../../../components/Input';
import { ButtonPink } from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../../components/Header'
import style from '../styles';
import { Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import { ButtonInput } from '../../../components/ButtonInput';

export default class Profil extends Component {
    constructor(props) {
        super(props)
        this.iD = this.props.monId;
        this.state = {
            email: '',
            prenom: '',
            regime: '',
            allergies: '',
            allergiesIntitule: '',
            regimesIntitule: '',
            editable: false,
        }
    }

    componentDidMount(){
        this.renderUser()
    }
    renderUser = () => {
        const userRef = firebaseRef.database().ref().child("Users/" + this.iD + "/InformationsPersonnelles/")
        userRef.once('value', (snapshot) => {
            let user = snapshot.val();
            this.setState({prenom: user.Prenom});
            this.setState({regime: user.Regime});
            this.setState({allergies: user.Allergies});
            this.setState({email: user.Email});
            console.log(user.Email)
            if(this.state.allergies !== '' && this.state.allergies !== undefined)
            this.decoupagePref(user.Allergies, "Allergies")
            if(this.state.regime !== '' && this.state.regime !== undefined)
            this.decoupagePref(user.Regime, "Regimes")
        })
    }
    decoupagePref = (preferences, intitulePref) => {
        var str = preferences
        var i = 0;
        while(i<str.length)
        {
            var newStr = str.substr(i,i+2)
            this.recupereIntitule(newStr, intitulePref)
            i =i +3;
        }
    }
    recupereIntitule= (str, intitulePref) => {
        const preferencesRef = firebaseRef.database().ref().child(intitulePref + "/" + str)
        preferencesRef.once('value', (snapshot) => {
            let preference = snapshot.val();
            if (intitulePref == "Allergies")
            this.setState({allergiesIntitule: this.state.allergiesIntitule + " " + preference});
            else
            {
                this.setState({regimesIntitule: this.state.regimesIntitule + " " + preference});
            }
        })
    }
    modificationPrenom() {
        Actions.modificationPrenom({ancienPrenom:this.state.prenom, monId:this.iD})
        this.renderUser()
    }
    modificationEmail() {
        Actions.modificationEmail({ancienEmail:this.state.email})
}
    render() {
        return (
            <View style={style.container}>
            <StatusBar barStyle="light-content"/>
            <Header title='PROFIL'></Header>

            <Text style={style.titre}>Informations personnelles</Text>
            <Text style={style.label}>Prénom</Text>
            <ButtonInput onPress={() => this.modificationPrenom()}>{this.state.prenom}</ButtonInput>
            <Text style={style.label}>Adresse email</Text>
            <ButtonInput onPress={() => this.modificationEmail()}>{this.state.email}</ButtonInput>
            <Text style={style.label}>Mot de passe</Text>
            <ButtonInput>********</ButtonInput>

            <Text style={style.titre}>Préférences alimentaire</Text>
            <Text style={style.label}>Régime alimentaire</Text>
            <ButtonInput>{this.state.regimesIntitule}</ButtonInput>
            <Text style={style.label}>Allergies</Text>
            <ButtonInput>{this.state.allergiesIntitule}</ButtonInput>
            </View>
    );
}
}
