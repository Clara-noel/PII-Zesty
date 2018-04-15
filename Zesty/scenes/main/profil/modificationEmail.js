import React, { Component } from 'react';
import { firebaseApp, firebaseRef } from '../../../services/Firebase';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import { Input } from '../../../components/Input';
import _ from 'lodash';
import { ButtonPink, ButtonWhite } from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../../components/Header'
import style from '../styles';
import { Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';

export default class ModificationEmail extends Component {
    constructor(props) {
        super(props)
        this.iD = this.props.monId;
        this.ancienEmail = this.props.ancienEmail;
        this.state = {
            email: this.ancienEmail,
        }
    }
    _back() {
        Actions.pop()
    }
    enregistrer = () => {
        var user = firebaseRef.auth().currentUser;
        user.updateEmail(this.state.email).then(function() {
            var monemail = firebaseRef.database().ref().child("Users/" + this.iD + "/InformationsPersonnelles/");
            monemail.update({Email:this.state.email});
            Actions.profil();
        }).catch(function(error) {
            alert("Le format du mail est mauvais")
            console.log(user.email)
        });

    }
    render() {
        return (
            <View style={style.container}>
            <StatusBar barStyle="light-content"/>
            <Header title='MODIFICATION DU MAIL'></Header>
            <Input
            title='EMAIL'
            label='Email'
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            />
            <View style={style.button}>
            <ButtonPink onPress={this.enregistrer}> Enregistrer les modifications </ButtonPink>
            <ButtonWhite onPress={this._back }> Annuler </ButtonWhite>
            </View>
            </View>
    );
}
}

