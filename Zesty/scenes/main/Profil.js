import React, { Component } from 'react';
import { firebaseApp, firebaseRef } from '../../services/Firebase'
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import _ from 'lodash';
import { Input } from '../../components/Input';
import { ButtonConnexion } from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import style from './styles';

export default class Profil extends Component {
    constructor(props) {
        super(props)
        this.iD = 'pWxvKD5geXO15QZOImMsauVZuC62';
        this.state = {
            email: '',
            prenom: '',
            regime: '',
            allergies: '',
            iD: 'pWxvKD5geXO15QZOImMsauVZuC62',
            allergiesIntitule: '',
            regimesIntitule: '',
        }
    }
    componentDidMount(){
        this.renderUser()
    }
    renderUser = () => {
        const userRef = firebaseRef.database().ref().child("Users/" + this.iD + "/InformationsPersonnelles")
        userRef.once('value', (snapshot) => {
            let user = snapshot.val();
            this.setState({prenom: user.Prenom});
            this.setState({regime: user.Regime});
            this.setState({allergies: user.Allergies});
            this.setState({email: user.Email});
            this.decoupagePref(this.state.allergies, "Allergies")
            this.decoupagePref(this.state.regime, "Regimes")
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
    render() {
        return (
            <View style={style.container}>
            <StatusBar barStyle="light-content"/>
            <Text style={style.label}>Informations personnelles</Text>
            <Input
            title='PRENOM'
            placeholder={this.state.prenom}
            label='Prenom'
            onChangeText={prenom=> this.setState({prenom})}
            value={this.state.prenom}
            editable={false}
            />
            <Input
            title='EMAIL'
            label='Email'
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            editable={false}
            />
            <Input
            title='MOT DE PASSE'
            label='Password'
            secureTextEntry
            onChangeText={password => this.setState({password})}
            value={'********'}
            editable={false}
            />
            <Text style={style.label}>Préférences alimentaires</Text>
            <Input
            title='REGIME ALIMENTAIRE'
            placeholder={this.state.regimesIntitule}
            label='Regime'
            onChangeText={regime => this.setState({regime})}
            value={this.state.regimesIntitule}
            editable={false}
            />
            <Input
            title='ALLERGIES'
            placeholder={this.state.allergiesIntitule}
            label='Allergies'
            onChangeText={allergies => this.setState({allergies})}
            value={this.state.allergiesIntitule}
            editable={false}
            />
            <ButtonConnexion >Test</ButtonConnexion>
            </View>
    );
}
}
