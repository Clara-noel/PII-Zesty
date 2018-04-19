import React , { Component } from 'react';
import { Text, View, StatusBar, ListView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Input, Item, Button, Label, Icon, List, ListItem, Header } from 'native-base';
import { firebaseRef } from './../../services/Firebase';
import { MyHeader } from './../../components/MyHeader';
import style from './styles';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';

var data = [];


export default class Agenda extends Component {
    constructor(props){
        super(props);
        var Id = 'BG3iEABEF0OMi2gYYgptpIV35KA3';
        //var Id = firebaseRef.auth().currentUser.uid
        this.iD = Id;
        this.ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => 1 !== r2})
        this.state = {
            listViewData: data,
            newRecipe: '',
            fav: '',
            isFavorite : false,
            date: '',
        };

    }
    componentDidMount() {
        var that = this
        firebaseRef.database().ref("Users/" + this.iD + "/Event/").on('child_added', function(data){
            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({listViewData:newData})
        })
    }

    displayRecipe(recipeKey) {
        Actions.recipe({recipeId: recipeKey})
    }
    
    addEvent(recipeKey, recipeName, date){
        var usersRef = firebaseRef.database().ref().child("Users/" + this.iD + "/Event/" + recipeKey );
        usersRef.update({
            Title: recipeName,
            Date: date,
        });
    }
    render (){
        return (
            <Container style={style.container}>
                <MyHeader title="LES RECETTES"></MyHeader>
                    <Content style={style.contentRecipe}>
                        <ListView
                            enableEmptySections
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={data =>
                                    <TouchableOpacity style={{flexDirection:'row', flexWrap:'wrap'}} onPress={() => this.displayRecipe(data.key)}>
                                    <Text style={style.item}>{data.val().Title}</Text>
                                    </TouchableOpacity>
                            }
                        />
                    </Content>
            </Container>
    );
    }
}