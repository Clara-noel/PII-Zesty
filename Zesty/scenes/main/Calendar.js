// Page inachevée : Page d'affichage des repas/évenements programmés
import React , { Component } from 'react';
import { Text, View, StatusBar, ListView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Input, Item, Button, Label, Icon, List, ListItem, Header } from 'native-base';
import { firebaseRef } from '../../services/Firebase';
import { MyHeader } from '../../components/MyHeader';
import style from './styles';
import { Actions } from 'react-native-router-flux';
import { ButtonPink} from './../../components/Button';

var data = [];

export default class Calendar extends Component {
    constructor(props){
        super(props);
        var Id = firebaseRef.auth().currentUser.uid
        this.iD = Id;
        this.ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => 1 !== r2})
        this.state = {
            listViewData: data,
            title: false,
            date: '',
        };
    }
// S'exécute au moins une fois et met à jour listViewData grâce à la fonctionnalités child_added de Firebase
    componentDidMount() {
        var that = this
        firebaseRef.database().ref("Users/" + this.iD + "/Event/").orderByChild("Date").on('child_added', function(data){
            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({listViewData:newData})
        })
    }
// Affiche la recette programmée
    displayRecipe(recipeKey) {
        Actions.recipe({recipeId: recipeKey})
    }

    render (){
        return (
            <Container style={style.container}>
                <MyHeader title={'AGENDA'}></MyHeader>
                    <Content>
                        <ListView
                            pagingEnabled
                            horizontal
                            enableEmptySections
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={data =>
                                <ListItem>
                                <View>
                                    <Text style={style.dateEvent}>{data.val().Date}</Text>
                                    <TouchableOpacity style={style.buttonEvent} onPress={() => this.displayRecipe(data.key)}>
                                    <Text style={style.textEvent}>{data.val().Title}</Text>
                                    </TouchableOpacity>
                                </View>
                                </ListItem>
                            }
                        />
                    </Content>
            </Container>
    );
    }
}