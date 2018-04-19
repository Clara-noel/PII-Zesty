// Page d'affichage de toutes les recettes 
import React , { Component } from 'react';
import { Text, View, StatusBar, ListView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Input, Item, Button, Label, Icon, List, ListItem, Header } from 'native-base';
import { firebaseRef } from '../../../services/Firebase';
import { MyHeader } from '../../../components/MyHeader';
import style from './../styles';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'

var dataFav = [];

export default class FavoritesList extends Component {
    constructor(props){
        super(props);
        var Id = firebaseRef.auth().currentUser.uid
        this.iD = Id;
        this.ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => 1 !== r2})
        this.state = {
            listViewDataFav: dataFav,
            date: '',
        };

        this.deleteFav = this.deleteFav.bind(this);
    }
// S'exécute au moins une fois et met à jour listViewDataFav grâce à la fonctionnalités child_added de Firebase
    componentDidMount() {
        var that = this
        firebaseRef.database().ref('Users/' + this.iD + '/Favorites/').on('child_added', function(data){
            var newData = [...that.state.listViewDataFav]
            newData.push(data)
            that.setState({listViewDataFav:newData})
        })
    }

// Ajoute un event/repas programmé dans la BDD
    addEvent(recipeKey, recipeName, date){
        var usersRef = firebaseRef.database().ref().child("Users/" + this.iD + "/Event/" + recipeKey );
        usersRef.update({
            Title: recipeName,
            Date: date,
        });
    }

// Supprime le favors dans la BDD et met à jour l'affichage
    deleteFav = (secId, rowId, rowMap, data) => {
        var myKey = data.key
        firebaseRef.database().ref('Users/' + this.iD + '/Favorites/' + myKey).set(null)

        rowMap[`${secId}${rowId}`].props.closeRow();
        var newData = [...this.state.listViewDataFav];
        newData.splice(rowId, 1) 
        this.setState({listViewDataFav:newData});
    }

// Affiche la recette sélectionnée
    displayRecipe(recipeKey) {
        Actions.recipe({recipeId: recipeKey})
    }
    render (){
        return (
            <Container style={style.container}>
                <MyHeader title="LES FAVORIS"></MyHeader>
                    <Content style={style.contentRecipe}>
                        <List
                            enableEmptySections
                            dataSource={this.ds.cloneWithRows(this.state.listViewDataFav)}
                            renderRow={data =>
                                <ListItem style={style.listItemRecipe}>
                                    <TouchableOpacity style={{flexDirection:'row', flexWrap:'wrap'}} onPress={() => this.displayRecipe(data.key)}>
                                    <Image style={style.image} source={{uri:data.val().Image}}/>
                                    <Icon name="md-heart" style={{color:'#D33C5B', fontSize:15, marginLeft:20}}/>
                                    <Text style={style.item}>{data.val().Title}</Text>
                                    </TouchableOpacity>
                                </ListItem>
                            }
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full light onPress={() => this.deleteFav(secId, rowId, rowMap, data)}>
                                    <Icon name="md-heart" style={{color:'#D33C5B', fontSize:35}}/>
                                </Button>
                            }
                            rightOpenValue={-100}
                        />
                    </Content>
            </Container>
    );
    }
}