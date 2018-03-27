import * as firebase from 'firebase'


    var config = {
        apiKey: "AIzaSyAN83Z9uEh-hijahk0MYFF23qGyO7UucV8",
        authDomain: "zesty-f580f.firebaseapp.com",
        databaseURL: "https://zesty-f580f.firebaseio.com",
        storageBucket: "zesty-f580f.appspot.com",
    }
    export const firebaseRef = firebase.initializeApp(config);