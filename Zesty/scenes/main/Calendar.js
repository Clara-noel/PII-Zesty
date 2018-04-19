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
        var Id = 'BG3iEABEF0OMi2gYYgptpIV35KA3';
        //var Id = firebaseRef.auth().currentUser.uid
        this.iD = Id;
        this.ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => 1 !== r2})
        this.state = {
            listViewData: data,
            title: false,
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
                                    <TouchableOpacity style={{width:320}} onPress={() => this.displayRecipe(data.key)}>
                                    <Text>{data.val().Title}</Text>
                                    <Text>{data.val().Date}</Text>
                                    {
                                        console.log("Calendar " + data.key)
                                    }
                                    </TouchableOpacity>
                                </ListItem>
                            }
                        />
                    </Content>
            </Container>
    );
    }
}