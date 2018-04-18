import React , { Component } from 'react';
import { Text, View, StatusBar, ListView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Input, Item, Button, Label, Icon, List, ListItem, Header } from 'native-base';
import { firebaseRef } from '../../../services/Firebase';
import { MyHeader } from '../../../components/MyHeader';
import style from './../styles';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'

var data = []
var fav = ''
export default class FavoritesList extends Component {
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
        this.listFav = this.listFav.bind(this);
    }
    componentDidMount() {
        this.listFav()
        var that = this
        firebaseRef.database().ref('Recipes/').on('child_added', function(data){
            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({listViewData:newData})
        })
    }

    listFav = () => {
        var that = this
        var myFav = ''
        firebaseRef.database().ref('Users/' + this.iD + '/Favorites/').on("child_added", function(snapshot) {
            var newFav = snapshot.val();
            myFav = myFav + snapshot.key + ";"
            that.setState({fav: myFav})
        })
    }

    addFav = (data) => {
        var myKey = data.key
        const userRef = firebaseRef.database().ref().child("Users/" + this.iD + "/Favorites/" + myKey)
        userRef.once('value', (snapshot) => {
            let user = snapshot.val();
            if(user !== null){
                firebaseRef.database().ref('Users/' + this.iD + '/Favorites/' + myKey).set(null)
                }
            else {
                firebaseRef.database().ref('Users/' + this.iD + '/Favorites').push().myKey
                firebaseRef.database().ref('Users/' + this.iD + '/Favorites/').child(myKey).update({Recipe:data.val().Title})
            }
        })
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
                                    <TouchableOpacity style={{flexDirection:'row', flexWrap:'wrap'}} onPress={() => alert(data.val().Image)}>
                                    <Image style={style.image} source={{uri:data.val().Image}}/>
                                        <Icon name="md-heart" style={{color:'#D33C5B', fontSize:15, marginLeft:20}}/>
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