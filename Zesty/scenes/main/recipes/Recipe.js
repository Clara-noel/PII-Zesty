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
    


    render (){
        return (
            <View>
            <MyHeader title={this.recipeId}></MyHeader>
            <Image style={{height:200, width:300}} source={{uri:this.state.imageUri}}/>
            <Text>{this.state.title}</Text>
            <Text>{this.state.allergies}</Text>
            <Text>{this.state.diet}</Text>
            </View>
        )
    }
}