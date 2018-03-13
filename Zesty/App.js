import * as firebase from 'firebase';

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

var idUser = "abcdef";
var mesAllergies;

export default class App extends React.Component {
    constructor(props) {
        super(props)
            // Initialize Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyAN83Z9uEh-hijahk0MYFF23qGyO7UucV8",
            authDomain: "zesty-f580f.firebaseapp.com",
            databaseURL: "https://zesty-f580f.firebaseio.com",
            storageBucket: "zesty-f580f.appspot.com"
        };
        firebase.initializeApp(firebaseConfig);
    }
    componentWillMount() {
        firebase.database().ref("Users/"+idUser+"/nom").once("value").then(function(snapchot) { var username = (snapchot.val())})
    }
    componentWillMount() {
      firebase.database().ref("Users/"+idUser).once("value").then(function(snapchot) { var newusername = (snapchot.val().mdp && alert(snapchot.val().nom)&& alert(snapchot.val().prenom)&& alert(snapchot.val().allergies)&& alert(snapchot.val().favoris))})
  }
    render() {
      return (
        <View style={styles.container}>
          <Text>Je suis allergique aux </Text>
          <Text>Je m'appelle</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});