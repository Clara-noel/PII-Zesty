// Page de Liste de course modifiable
import React , { Component } from 'react';
import { Text, View, StatusBar, ListView, RefreshControl } from 'react-native';
import { Container, Content, Form, Input, Item, Button, Label, Icon, List, ListItem, Header } from 'native-base';
import { firebaseRef } from '../../services/Firebase';
import { MyHeader } from '../../components/MyHeader';
import style from './styles';

var data = []

export default class ShoppingList extends Component {
    constructor(props){
        super(props);
        var Id = firebaseRef.auth().currentUser.uid
        this.ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => 1 !== r2})
        this.iD = Id;
        this.state = {
            listViewData: data,
            newIngredient: "",
        }
    }
// S'exécute au moins une fois et met à jour listViewData grâce à la fonctionnalités child_added de Firebase
    componentDidMount() {
        var that = this
        firebaseRef.database().ref('Users/' + this.iD + '/ShoppingList').on('child_added', function(data){
            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({listViewData:newData})
        })
    }

// Ajoute un nouvel élément à la BDD dans la liste de course (l'affichage est mis à jour grâce à child_added)
    addRow(data) {
        var key = firebaseRef.database().ref('Users/' + this.iD + '/ShoppingList').push().key
        firebaseRef.database().ref('Users/' + this.iD + '/ShoppingList').child(key).set({Ingredient:data})
        newIngredient => this.setState({newIngredient: ''})
        this.setState({newIngredient:''})
    }

// Supprime un élément de la liste et la row affichée correspondante 
    async deleteRow(secId, rowId, rowMap, data) {
        await firebaseRef.database().ref('Users/' + this.iD + '/ShoppingList/' + data.key).set(null)

        rowMap[`${secId}${rowId}`].props.closeRow();
        var newData = [...this.state.listViewData];
        newData.splice(rowId, 1) 
        this.setState({listViewData:newData});
    }

    render (){
        return (
            <Container style={style.container}>
                <MyHeader title="LISTE DE COURSES"></MyHeader>
                <View style={style.header}>
                    <Content style={style.content}>
                        <Item>
                        <Input
                            style={style.input}
                            onChangeText = {(newIngredient) => this.setState({newIngredient})}
                            placeholder="Ajouter un ingrédient..."
                            value={this.state.newIngredient}
                        />
                        <Button onPress={()=>this.addRow(this.state.newIngredient) } style={style.buttonAdd}>
                        <Icon name="add" style={{fontSize:30}}/>
                        </Button>
                        </Item>
                    </Content>
                </View>
                    <Text style={style.label}>Ma Shopping-list :</Text>
                    <Content style={style.content}>
                        <List
                            enableEmptySections
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={data =>
                                <ListItem style={style.listItem}>
                                    <Text style={style.item}>{data.val().Ingredient}</Text>
                                </ListItem>
                            }
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full success onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                                    <Icon name="md-checkmark"/>
                                </Button>
                            }
                            rightOpenValue={-100}
                        />
                    </Content>
            </Container>
    );
    }
}