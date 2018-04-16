import React, { Component } from 'react';
import { firebaseRef } from '../../../services/Firebase';
import { View, StatusBar} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import _ from 'lodash';
import { ButtonPink, ButtonWhite } from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../../components/Header'
import style from '../styles';

export default class ModificationDiet extends Component {
    constructor(props) {
        super(props)
        this.iD = this.props.myId;
    }
    _back() {
        Actions.pop()
    }
    register = () => {
        var user = firebaseRef.database().ref().child("Users/" + this.iD + "/InformationsPersonnelles/");
        user.update({Regime:'P' + this.state.diet});
        Actions.profil({myId:this.iD});
    }
    render() {
        return (
            <View style={style.container}>
            <StatusBar barStyle="light-content"/>
            <Header title='Modifications'></Header>
            <ModalDropdown
                style = {style.dropdown}
                options={['Sans régime particulier', 'Végétarien','Vegan','Sans viande','Sans poisson','Sans oeuf','Sans porc','Sans boeuf' ]}
                defaultValue={'Veuillez sélectionner un régime...'}
                textStyle={{fontSize: 16, padding: 8, color:'#D33C5B'}}
                style={{marginTop: 2, padding: 3, width: '100%', borderRadius: 4, backgroundColor:'#eee'}}
                dropdownStyle={{marginTop: 2, padding: 3, backgroundColor:'#eee'}}
                dropdownTextStyle={{fontSize: 16, padding: 8, width:'100%', color:'#3B5998'}}
                onSelect={(diet) => this.setState({diet})}/>
            <View style={style.button}>
            <ButtonPink onPress={this.register}> Enregistrer les modifications </ButtonPink>
            <ButtonWhite onPress={this._back }> Annuler </ButtonWhite>
            </View>
            </View>
    );
}
}

