// Page d'affichage de toutes les recettes 
import React , { Component } from 'react';
import { Text, View, StatusBar, ListView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Input, Item, Button, Label, Icon, List, ListItem, Header } from 'native-base';
import { firebaseRef } from '../../../services/Firebase';
import { MyHeader } from '../../../components/MyHeader';
import style from './../styles';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';

var data = [];
var fav = '';

export default class RecipesList extends Component {
    constructor(props){
        super(props);
        //var Id = 'BG3iEABEF0OMi2gYYgptpIV35KA3';
        var Id = firebaseRef.auth().currentUser.uid
        this.iD = Id;
        this.ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => 1 !== r2})
        this.state = {
            listViewData: data,
            newRecipe: '',
            fav: '',
            isFavorite : false,
            date: '',
        };
        this.listFav = this.listFav.bind(this);
        this.addFav = this.addFav.bind(this);
    }
// S'exécute au moins une fois et met à jour listViewData grâce à la fonctionnalités child_added de Firebase
    componentDidMount() {
        var that = this
        firebaseRef.database().ref('Recipes/').on('child_added', function(data){
            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({listViewData:newData})
        })
        this.listFav()
    }

// Appelé dans le componentDidMount donc exécuté au moins une fois elle met a jour dynamiquement la liste des favoris
    listFav = () => {
        var that = this
        var myFav = ''
        firebaseRef.database().ref('Users/' + this.iD + '/Favorites/').on("child_added", function(snapshot) {
            var newFav = snapshot.val();
            myFav = myFav + snapshot.key + ";"
            that.setState({fav: myFav})
        })
    }

// Si la recette est déja en favori, la supprime de la BDD, sinon l'ajoute
    addFav = (data) => {
        const {
            fav = ''
        } = this.state;
        var myKey = data.key
        const userRef = firebaseRef.database().ref().child("Users/" + this.iD + "/Favorites/" + myKey)
        userRef.once('value', (snapshot) => {
            let myFav = snapshot.val();
            if(myFav !== null){
                firebaseRef.database().ref('Users/' + this.iD + '/Favorites/' + myKey).set(null)
                    this.listFav()
                }
            else {
                firebaseRef.database().ref('Users/' + this.iD + '/Favorites').push().myKey
                firebaseRef.database().ref('Users/' + this.iD + '/Favorites/').child(myKey).update({Title:data.val().Title,Image:data.val().Image })
            }
        })
        // Met à jour les scènes (si maj de favoris seulement => bug) pour affichage de l'onglet Favoris cohérent
        Actions.refresh({ })
    }
// Affichage conditionnel de l'icône coeur/favori en plein ou en vide suivant si la recette est dans la liste des favoris ou non
    renderIcon (theKey){
        const {
            isFavorite = false
        } = this.state;

            var str = this.state.fav
        // Récupère la liste des id des recettes favorites et regarde si l'iD vérifié est dans la chaine de caractère => renvoit -1 s'il n'y est pas, la position sinon
            var position = str.search(theKey)
            if(position != -1 )
            {
                () => this.setState({ isFavorite: true });
                return (
                    <Icon name="md-heart" style={{color:'#D33C5B', fontSize:15, marginLeft:20}}/>
                )
            }
            else
            {
                () => this.setState({ isFavorite: false })
                return (
                    <Icon name="md-heart-outline" style={{color:'#D33C5B', fontSize:15, marginLeft:20}}/>
                    )
        }
    }
// Affiche la recette sélectionnée
    displayRecipe(recipeKey) {
        Actions.recipe({recipeId: recipeKey})
    }

// Ajoute un event/repas programmé dans la BDD
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
                        <List
                            enableEmptySections
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={data =>
                                <ListItem style={style.listItemRecipe}>
                                    <TouchableOpacity style={{flexDirection:'row', flexWrap:'wrap'}} onPress={() => this.displayRecipe(data.key)}>
                                    <Image style={style.image} source={{uri:data.val().Image}}/>
                                    {
                                        this.renderIcon(data.key)
                                    }
                                    <Text style={style.item}>{data.val().Title}</Text>
                                    </TouchableOpacity>
                                </ListItem>
                            }
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full light onPress={() => this.addFav(data)}>
                                    <Icon name="md-heart" style={{color:'#D33C5B', fontSize:35}}/>
                                </Button>
                            }
                            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full warning onPress={() => this.addEvent(data.key, data.val().Title)}>
                                    <DatePicker
                                        style={{width: 200}}
                                        date={this.state.date}
                                        mode="date"
                                        format="YYYY-MM-DD"
                                        minDate={new Date()}
                                        maxDate="2020-06-01"
                                        customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft:-165
                                        },
                                        }}
                                        confirmBtnText= 'Valider'
                                        cancelBtnText= 'Annuler'
                                        onPress = {this.addEvent}
                                        disabled={false}
                                        style={{borderColor:'red', marginLeft:300, width:3}}
                                        onDateChange={(date) => {this.addEvent(data.key, data.val().Title, date)}}
                                    />
                                </Button>
                            }
                            rightOpenValue={-100}
                            leftOpenValue={100}
                        />
                    </Content>
            </Container>
    );
    }
}