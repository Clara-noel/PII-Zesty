import * as firebase from 'firebase';


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props){
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

  componentWillMount(){
    firebase.database().ref("test").once("value").then((data) => alert(data.val()))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Test BDD</Text>
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
