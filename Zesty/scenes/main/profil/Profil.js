// Affiche le profil de l'utilisateur 
import React, { Component } from 'react';
import { firebaseRef } from '../../../services/Firebase';
import { Text, View, StatusBar} from 'react-native';
import _ from 'lodash';
import { ButtonPink } from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { MyHeader } from '../../../components/MyHeader'
import style from '../styles';
import { ButtonInput } from '../../../components/ButtonInput';

export default class Profil extends Component {
    constructor(props) {
        super(props)
        var Id = firebaseRef.auth().currentUser.uid
        this.iD = Id;
        this.state = {
            email: '',
            firstname: '',
            diet: '',
            allergies: '',
            allergiesDesignation: '',
            dietDesignation: '',
        }
    }

// S'exécute obligatoirement une fois au début et récupère les infos persos de l'utilisateur courant dans la BDD
    componentDidMount(){
        const userRef = firebaseRef.database().ref().child("Users/" + this.iD + "/InformationsPersonnelles/")
        userRef.once('value', (snapshot) => {
            let user = snapshot.val();
    // Gestion des exceptions pour les utilisateurs créés via Facebook qui ne passent pas par le formulaire d'inscription
            if(user == null){
                var myCurrentUser = firebaseRef.auth().currentUser
                console.log(myCurrentUser.displayName)
                var myUserRef = firebaseRef.database().ref().child("Users/" + this.iD);
                myUserRef.update({
                InformationsPersonnelles: {
                    Prenom: myCurrentUser.displayName,
                    Email:'Connecté via Facebook',
                }
                });
                this.setState({firstname: myUserRef.Prenom});
                this.setState({email: 'Connecté via Facebook'});
            }
    // Une fois les exceptions gérées, appel de renderUser
            this.renderUser()
        })
    }
// Initialise les variables nécessaires par appel à la BDD et appel de getDesignation via sectionPref (pour afficher un libellé d'allergies et de régimes correct)
    renderUser = () => {
        this.setState({allergies: ''});
        this.setState({diet: ''});
        this.setState({allergiesDesignation: ''});
        this.setState({dietDesignation: ''});
        const userRef = firebaseRef.database().ref().child("Users/" + this.iD + "/InformationsPersonnelles/")
        userRef.once('value', (snapshot) => {
            let user = snapshot.val();
            this.setState({firstname: user.Prenom});
            this.setState({diet: user.Regime});
            this.setState({allergies: user.Allergies});
            this.setState({email: user.Email});
            if(this.state.allergies !== '' && this.state.allergies !== undefined)
            this.sectionPref(user.Allergies, "Allergies")
            else { this.setState({allergiesDesignation: 'Non communiqué'}) }
            if(this.state.diet !== '' && this.state.diet !== undefined)
            this.sectionPref(user.Regime, "Regimes")
            else { this.setState({dietDesignation: 'Non communiqué'}) }
        })
    }
// Les allergies et régimes sont stockés sous la forme A1;A2 ou P6 par exemple => ici on découpe la chaine stockée poru récupérer les intitulés un par un
    sectionPref = (preferences, prefDesignation) => {
        var str = preferences
        var i = 0;
        while(i<str.length)
        {
            var newStr = str.substr(i,2)
            this.getDesignation(newStr, prefDesignation)
            i =i +3;
        }
    }

// Récupère les intitulés et les concatène dans une chaine de caractères pour les afficher dans le input
    getDesignation= (str, prefDesignation) => {
        const preferencesRef = firebaseRef.database().ref().child(prefDesignation + "/" + str)
        preferencesRef.once('value', (snapshot) => {
            let preference = snapshot.val();
            if (prefDesignation == "Allergies")
            this.setState({allergiesDesignation: this.state.allergiesDesignation + " " + preference});
            else
            {
                this.setState({dietDesignation: this.state.dietDesignation + " " + preference});
            }
        })
    }

//// Fonctions de renvoit vers les formulaires de modifications de données, avec interdiction sur mdp et email pour les utilisateurs Facebook
            modificationName() {
                Actions.modificationName({oldName:this.state.firstname, myId:this.iD})
            }
            modificationEmail() {
                if(this.state.email != 'Connecté via Facebook')
                Actions.modificationEmail({oldEmail:this.state.email, myId:this.iD})
                else
                alert('Vous ne pouvez modifier votre adresse email')
            }
            modificationPassword() {
                if(this.state.email != 'Connecté via Facebook')
                Actions.modificationPassword({oldPassword:this.state.email, myId:this.iD})
                else
                alert('Vous ne pouvez modifier votre mot de passe')
            }
            modificationDiet() {
                Actions.modificationDiet({myId:this.iD})
            }
            modificationAllergies() {
                Actions.modificationAllergies({myId:this.iD})
            }
///

// Déconnexion et renvoit vers la page Login
    logOut() {
        firebaseRef.auth().signOut().then(function() {
            Actions.login()
          }, function(error) {
            // An error happened.
          });
    }
    render() {
        return (
            <View style={style.container}>
            <StatusBar barStyle="light-content"/>
            <MyHeader title='PROFIL'></MyHeader>

            <Text style={style.titre}>Informations personnelles</Text>
            <Text style={style.label}>Prénom</Text>
            <ButtonInput onPress={() => this.modificationName()}>{this.state.firstname}</ButtonInput>
            <Text style={style.label}>Adresse email</Text>
            <ButtonInput onPress={() => this.modificationEmail()}>{this.state.email}</ButtonInput>
            <Text style={style.label}>Mot de passe</Text>
            <ButtonInput onPress={() => this.modificationPassword()}>********</ButtonInput>

            <Text style={style.titre}>Préférences alimentaires</Text>
            <Text style={style.label}>Régime alimentaire</Text>
            <ButtonInput onPress={() => this.modificationDiet()}>{this.state.dietDesignation}</ButtonInput>
            <Text style={style.label}>Allergies</Text>
            <ButtonInput onPress={() => this.modificationAllergies()}>{this.state.allergiesDesignation}</ButtonInput>
            <ButtonPink onPress={() => this.logOut()}> Déconnexion</ButtonPink>
            </View>
    );
}
}
