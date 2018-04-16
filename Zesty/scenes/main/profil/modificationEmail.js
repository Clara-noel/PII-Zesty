import React, { Component } from 'react';
import { firebaseRef } from '../../../services/Firebase';
import { View, StatusBar} from 'react-native';
import { Input } from '../../../components/Input';
import _ from 'lodash';
import { ButtonPink, ButtonWhite } from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { MyHeader } from '../../../components/MyHeader'
import style from '../styles';

export default class ModificationEmail extends Component {
    constructor(props) {
        super(props)
        this.iD = this.props.myId;
        this.oldEmail = this.props.oldEmail;
        this.state = {
            email: this.oldEmail,
        }
    }
    _back() {
        Actions.pop()
    }
    _registerUser = () => {
        var user = firebaseRef.auth().currentUser;
        user.updateEmail(this.state.email).then( () => { this._registerDB() }
        ).catch(function(error) {
            alert("Le format du mail est mauvais")
        });
    }
    _registerDB() {
        var myemail = firebaseRef.database().ref().child("Users/" + this.iD + "/InformationsPersonnelles/");
        myemail.update({Email:this.state.email});
        Actions.profil({myId:this.iD});
    }
    render() {
        return (
            <View style={style.container}>
            <StatusBar barStyle="light-content"/>
            <MyHeader title='Modifications'></MyHeader>
            <Input
            title='EMAIL'
            label='Email'
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            />
            <View style={style.button}>
            <ButtonPink onPress={this._registerUser}> Enregistrer les modifications </ButtonPink>
            <ButtonWhite onPress={this._back }> Annuler </ButtonWhite>
            </View>
            </View>
    );
}
}

