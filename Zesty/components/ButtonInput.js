import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

const ButtonInput = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.input}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop : 5,
        width : '90%',
        borderColor: '#eee',
        borderBottomWidth:2,
    },
    input: {
        padding:5,
        color:'#252D42',
        fontSize:18,
        width:'100%',
        opacity:100,
    }
});

export { ButtonInput };