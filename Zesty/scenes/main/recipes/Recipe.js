import React , { Component } from 'react';
import { Text, View, StatusBar, ListView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Input, Item, Button, Label, Icon, List, ListItem, Header } from 'native-base';
import { firebaseRef } from '../../../services/Firebase';
import { MyHeader } from '../../../components/MyHeader';
import style from './../styles';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'


export default class RecipesList extends Component {
    constructor(props){
        super(props);
        this.recipeId = this.props.recipeId;
        var Id = 'BG3iEABEF0OMi2gYYgptpIV35KA3';
        //var Id = firebaseRef.auth().currentUser.uid
        this.iD = Id;
        this.state = {
            title: '',
            allergies: '',
            diet: '',
            imageUri: '',
        };
    }
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
    renderDirections(recipeId){
        console.log("hello" + recipeId)
        firebaseRef.database().ref('Recipes/' + recipeId + '/Directions').on('child_added', function(data){
            const recipeRef = firebaseRef.database().ref().child("Recipes/" + recipeId + "/Directions/" + data.key + "/")
            recipeRef.once('value', (snapshot) => {
            let recipe = snapshot.val();
            console.log(recipe.Direction)
        
            })
        return (
            <Text>{"Hello "}</Text>
        )
        })
    }
    render (){
        return (
            <View>
            <MyHeader title={this.state.title}></MyHeader>
            <Button full warning onPress={this.back} style={{marginTop:-10}}>
            <Text>Retour à la liste des recettes</Text>
            </Button>
            <Image style={{height:200, width:300}} source={{uri:this.state.imageUri}}/>
            <Text>{this.state.title}</Text>
            <Text>{this.state.allergies}</Text>
            <Text>{this.state.diet}</Text>
            {
                this.renderDirections(this.recipeId)
            }
            </View>
        )
    }
}