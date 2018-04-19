// Modification du mot de passe
import React, { Component } from 'react';
import { firebaseRef } from '../../../services/Firebase';
import { View, StatusBar} from 'react-native';
import { Input } from '../../../components/Input';
import _ from 'lodash';
import { ButtonPink, ButtonWhite } from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { MyHeader } from '../../../components/MyHeader'
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

// updatePassword est une fonction propre à Firebase qui s'occupe de vérifier la validité du nouveau mdp et d'update les users
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
            <MyHeader title='Modifications'></MyHeader>
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

