import React, { Component } from 'react';
import { firebaseRef } from '../../../services/Firebase';
import { View, StatusBar, Text} from 'react-native';
import _ from 'lodash';
import { ButtonPink, ButtonWhite } from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { MyHeader } from '../../../components/MyHeader'
import style from '../styles';
import { CheckBox } from 'react-native-elements';

export default class ModificationAllergies extends Component {
    constructor(props) {
        super(props)
        this.iD = this.props.myId;
        this.state = {
            lactose: false,
            peanuts: false,
            crustaceans: false,
        }
    }
    _back() {
        Actions.pop()
    }
    register = () => {
        var allergies = '';
        if(this.state.lactose)
        allergies = allergies + 'A1;';
        if(this.state.crustaceans)
        allergies = allergies + 'A2;';
        if(this.state.peanuts)
        allergies = allergies + 'A3;';
        var user = firebaseRef.database().ref().child("Users/" + this.iD + "/InformationsPersonnelles/");
        user.update({Allergies:allergies});
        Actions.profil({myId:this.iD});
    }
    render() {
        return (
            <View style={style.container}>
            <StatusBar barStyle="light-content"/>
            <MyHeader title='Modifications'></MyHeader>
            <Text style={style.label}>REGIME ALIMENTAIRE</Text>
            <CheckBox
                title="Lactose"
                checked={this.state.lactose}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='#D33C5B'
                uncheckedColor='#3B5998'
                textStyle={{color: '#3B5998'}}
                containerStyle={{width:'95%', height:45, padding:5, paddingLeft:10, marginBottom:0}}
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
                containerStyle={{width:'95%', height:45, padding:5, paddingLeft:10, marginBottom:0}}
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
                containerStyle={{width:'95%', height:45, padding:5, paddingLeft:10, marginBottom:0}}
                onPress={() => this.setState({ peanuts: !this.state.peanuts})}
            />
            <View style={style.button}>
            <ButtonPink onPress={this.register}> Enregistrer les modifications </ButtonPink>
            <ButtonWhite onPress={this._back }> Annuler </ButtonWhite>
            </View>
            </View>
    );
}
}

