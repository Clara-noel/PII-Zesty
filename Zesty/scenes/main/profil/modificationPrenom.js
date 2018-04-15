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

export default class ModificationPrenom extends Component {
    constructor(props) {
        super(props)
        this.iD = this.props.monId;
        this.ancienPrenom = this.props.ancienPrenom;
        this.state = {
            prenom: this.ancienPrenom,
        }
    }
    _back() {
        Actions.pop()
    }
    enregistrer = () => {
        var user = firebaseRef.database().ref().child("Users/" + this.iD + "/InformationsPersonnelles/");
        user.update({Prenom:this.state.prenom});
        Actions.profil();
    }
    render() {
        return (
            <View style={style.container}>
            <StatusBar barStyle="light-content"/>
            <Header title='MODIFICATION DU PRENOM'></Header>
            <Input
            title='PRENOM'
            label='Prenom'
            onChangeText={prenom => this.setState({prenom})}
            value={this.state.prenom}
            />
            <View style={style.button}>
            <ButtonPink onPress={this.enregistrer}> Enregistrer les modifications </ButtonPink>
            <ButtonWhite onPress={this._back }> Annuler </ButtonWhite>
            </View>
            </View>
    );
}
}

