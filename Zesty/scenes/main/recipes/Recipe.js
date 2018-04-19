// Page inachevée : Page d'affichage d'une recette en particulier
import React , { Component } from 'react';
import { Text, View, StatusBar, ListView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Input, Item, Button, Label, Icon, List, ListItem, Header } from 'native-base';
import { firebaseRef } from '../../../services/Firebase';
import { MyHeader } from '../../../components/MyHeader';
import style from './../styles';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { ButtonOrange } from './../../../components/Button';


export default class RecipesList extends Component {
    constructor(props){
        super(props);
        this.recipeId = this.props.recipeId;
        var Id = firebaseRef.auth().currentUser.uid
        this.iD = Id;
        this.state = {
            title: '',
            allergies: '',
            diet: '',
            imageUri: '',
            directions: '',
        };
        this.getDirections = this.getDirections.bind(this);
    }
// S'exécute au moins une fois et  initialise les données nécessaires à l'affichage
    componentDidMount() {
        const recipeRef = firebaseRef.database().ref().child("Recipes/" + this.recipeId + "/")
        recipeRef.once('value', (snapshot) => {
            let recipe = snapshot.val();
                this.setState({title: recipe.Title});
                this.setState({allergies: recipe.Allergies});
                this.setState({diet: recipe.Regimes});
                this.setState({imageUri: recipe.Image});
        })
    }
    back() {
        Actions.pop()
    }
// Récupère les instructions pour la préparation dans la variable preparation et ensuite problème de this.state pour affichage (voir rapport)
    getDirections = (recipeId) => {
        var preparation = '';
        firebaseRef.database().ref('Recipes/' + recipeId + '/Directions').on('child_added', function(data){
            const recipeRef = firebaseRef.database().ref().child("Recipes/" + recipeId + "/Directions/" + data.key + "/")
            recipeRef.once('value', (snapshot) => {
            let recipe = snapshot.val();
            preparation = preparation + recipe.NumberStep + recipe.Direction + ";";
            alert(preparation)
            })
            return (
                <Text>{this.preparation}</Text>
            )
        })
    }
    renderDirections(){
        
    }
    render (){
        return (
            <View>
            <MyHeader title={this.state.title}></MyHeader>
            <ButtonOrange onPress={this.back}>Retour</ButtonOrange>
            <Image style={{height:250, width:375}} source={{uri:this.state.imageUri}}/>
            <Text style={style.label}>Ingrédients :</Text>
            <Text style={style.label}>Préparation :</Text>
            {
                this.getDirections(this.recipeId)
            }
            </View>
        )
    }
}