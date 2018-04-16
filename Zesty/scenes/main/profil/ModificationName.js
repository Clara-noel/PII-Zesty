import React, { Component } from 'react';
import { firebaseRef } from '../../../services/Firebase';
import { View, StatusBar} from 'react-native';
import { Input } from '../../../components/Input';
import _ from 'lodash';
import { ButtonPink, ButtonWhite } from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../../components/Header'
import style from '../styles';

export default class ModificationName extends Component {
    constructor(props) {
        super(props)
        this.iD = this.props.myId;
        this.oldName = this.props.oldName;
        this.state = {
            firstname: this.oldName,
        }
    }
    _back() {
        Actions.pop()
    }
    register = () => {
        var user = firebaseRef.database().ref().child("Users/" + this.iD + "/InformationsPersonnelles/");
        user.update({Prenom:this.state.firstname});
        Actions.profil({myId:this.iD});
    }
    render() {
        return (
            <View style={style.container}>
            <StatusBar barStyle="light-content"/>
            <Header title='Modifications'></Header>
            <Input
            title='PRENOM'
            label='firstname'
            onChangeText={firstname => this.setState({firstname})}
            value={this.state.firstname}
            />
            <View style={style.button}>
            <ButtonPink onPress={this.register}> Enregistrer les modifications </ButtonPink>
            <ButtonWhite onPress={this._back }> Annuler </ButtonWhite>
            </View>
            </View>
    );
}
}

