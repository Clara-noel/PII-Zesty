import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

const ButtonInscription = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonInscription}>
        <Text style={styles.inscription}>{children}</Text>
        </TouchableOpacity>
    )
}

const ButtonConnexion = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonConnexion}>
        <Text style={styles.connexion}>{children}</Text>
        </TouchableOpacity>
    )
}

const ButtonFacebook = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonFacebook}>
        <Text style={styles.facebook}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonConnexion: {
        marginTop: 45,
        paddingTop: 12,
        paddingBottom: 12,
        width: '80%',
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor:'#D33C5B',
    },
    buttonInscription:{
        marginTop: 8,
        padding: 12,
        width: '80%',
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor:'#eee',
    },
    connexion: {
        color: '#eee',
        fontWeight: '700',
        fontSize:18,
    },
    inscription: {
        fontWeight: '700',
        fontSize:18,
        color: '#D33C5B',
    },
    buttonFacebook:{
        marginTop: 8,
        padding: 12,
        width: '80%',
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor:'#3B5998',
    },
    facebook: {
        color: '#eee',
        fontWeight: '700',
        fontSize:18,
    },
});

export { ButtonConnexion, ButtonInscription, ButtonFacebook };