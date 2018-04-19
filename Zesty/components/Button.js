import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

const ButtonWhite = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonWhite}>
        <Text style={styles.white}>{children}</Text>
        </TouchableOpacity>
    )
}

const ButtonPink = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.ButtonPink}>
        <Text style={styles.pink}>{children}</Text>
        </TouchableOpacity>
    )
}

const ButtonBlue = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonBlue}>
        <Text style={styles.blue}>{children}</Text>
        </TouchableOpacity>
    )
}
const ButtonBack = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.ButtonBack}>
        <Text style={styles.back}>{children}</Text>
        </TouchableOpacity>
    )
}

const ButtonOrange = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.ButtonOrange}>
        <Text style={styles.orange}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ButtonPink: {
        marginTop: 25,
        padding:12,
        width: '80%',
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor:'#D33C5B',
    },
    buttonWhite:{
        marginTop: 8,
        padding: 12,
        width: '80%',
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor:'#eee',
    },
    pink: {
        color: '#eee',
        fontWeight: '700',
        fontSize:18,
    },
    white: {
        fontWeight: '700',
        fontSize:18,
        color: '#D33C5B',
    },
    buttonBlue:{
        marginTop: 8,
        padding: 12,
        width: '80%',
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor:'#3B5998',
    },
    blue: {
        color: '#eee',
        fontWeight: '700',
        fontSize:18,
    },
    buttonBack:{
        alignItems: 'center',
        backgroundColor:'transparent',
    },
    back: {
        marginTop: 6,
        color: '#3B5998',
        fontSize:14,
        textDecorationLine: 'underline',
    },
    ButtonOrange: {
        marginTop: -15,
        height:25,
        padding:12,
        width: '100%',
        alignItems: 'center',
        backgroundColor:'#f39c12',
    },
    orange: {
        marginTop:-6,
        color: '#eee',
        fontWeight: '700',
        fontSize:12,
        },
});

export { ButtonPink, ButtonWhite, ButtonBlue, ButtonBack, ButtonOrange };