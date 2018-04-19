import React , { Component } from 'react';
import { Text, View, StatusBar, ListView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Input, Item, Button, Label, Icon, List, ListItem, Header } from 'native-base';
import { firebaseRef } from '../../../services/Firebase';
import { MyHeader } from '../../../components/MyHeader';
import style from './../styles';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'

var data = [];

export default class RecipesList extends Component {
    constructor(props){
        super(props);
        var Id = 'BG3iEABEF0OMi2gYYgptpIV35KA3';
        //var Id = firebaseRef.auth().currentUser.uid
        this.iD = Id;
        this.ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => 1 !== r2})
        this.state = {
            listViewData: data,
            date: '',
        };

        this.deleteFav = this.deleteFav.bind(this);
    }
    componentDidMount() {

        var that = this
        var myFav = ''
        firebaseRef.database().ref('Users/' + this.iD + '/Favorites/').on("child_added", function(snapshot) {
            myFav = myFav + snapshot.key
        })
        firebaseRef.database().ref('Recipes/').on('child_added', function(data){
            var position = myFav.search(data.key)
            if(position != -1){
                var newData = [...that.state.listViewData]
                newData.push(data)
                that.setState({listViewData:newData})
            }
        })

    }

    deleteFav = (secId, rowId, rowMap, data) => {
        var myKey = data.key
        firebaseRef.database().ref('Users/' + this.iD + '/Favorites/' + myKey).set(null)

        rowMap[`${secId}${rowId}`].props.closeRow();
        var newData = [...this.state.listViewData];
        newData.splice(rowId, 1) 
        this.setState({listViewData:newData});
        }

    displayRecipe(recipeKey) {
        Actions.recipe({recipeId: recipeKey})
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
                            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full warning onPress={() => this.addEvent()}>
                                    <DatePicker
                                        style={{width: 200}}
                                        date={this.state.date}
                                        mode="datetime"
                                        format="DD-MM-YYYY"
                                        minDate="2016-05-01"
                                        maxDate="2016-06-01"
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
                                        style={{borderColor:'red', marginLeft:300, width:3}}
                                        onDateChange={(date) => {this.setState({date: date})}}
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