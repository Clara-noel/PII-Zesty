import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as firebase from 'firebase';
import { Input } from './components/Input';
import { Button } from './components/Button';

export default class App extends React.Component {
    state = {
        email: '',
        password: '',
    }
    componentWillMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyAN83Z9uEh-hijahk0MYFF23qGyO7UucV8",
            authDomain: "zesty-f580f.firebaseapp.com",
            databaseURL: "https://zesty-f580f.firebaseio.com",
            storageBucket: "zesty-f580f.appspot.com",
        }
        firebase.initializeApp(firebaseConfig);
    }
    
//     componentWillMount() {
//         firebase.database().ref("Users/"+idUser+"/nom").once("value").then(function(snapchot) { var username = (snapchot.val())})
//     }
//     componentWillMount() {
//       firebase.database().ref("Users/"+idUser).once("value").then(function(snapchot) { var newusername = (snapchot.val().mdp && alert(snapchot.val().nom)&& alert(snapchot.val().prenom)&& alert(snapchot.val().allergies)&& alert(snapchot.val().favoris))})
//   }
    render() {
      return (
        <View style={styles.container}>
          <Text>Bienvenue sur Zesty</Text>
          <Input 
          placeholder='Enter your email...'
          label='Email'
          onChangeText={email => this.setState({email})}
          value={this.state.email}
          />
          <Input 
          placeholder='Enter your password...'
          label='Password'
          secureTextEntry
          onChangeText={password => this.setState({password})}
          value={this.state.password}
          />
          <Button onPress={() => console.log('Cela fonctionne')}>Log in</Button>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});