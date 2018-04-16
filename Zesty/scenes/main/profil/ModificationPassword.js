import React, { Component } from 'react';
import { firebaseRef } from '../../../services/Firebase';
import { View, StatusBar} from 'react-native';
import { Input } from '../../../components/Input';
import _ from 'lodash';
import { ButtonPink, ButtonWhite } from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../../components/Header'
import style from '../styles';

export default class ModificationPassword extends Component {
    constructor(props) {
        super(props)
        this.iD = this.props.myId;
        this.state = {
            password: '********',
        }
    }
    _back() {
        Actions.pop()
    }
    _registerPassword = () => {
        var user = firebaseRef.auth().currentUser;
        user.updatePassword(this.state.password).then( () => { Actions.profil({myId:this.iD}); }
        ).catch(function(error) {
            alert("Une erreur est survenue")
        });
    }

    render() {
        return (
            <View style={style.container}>
            <StatusBar barStyle="light-content"/>
            <Header title='Modifications'></Header>
            <Input
            title='MOT DE PASSE'
            label='Password'
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            secureTextEntry
            />
            <View style={style.button}>
            <ButtonPink onPress={this._registerPassword}> Enregistrer les modifications </ButtonPink>
            <ButtonWhite onPress={this._back }> Annuler </ButtonWhite>
            </View>
            </View>
    );
}
}

