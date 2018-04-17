import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Icon } from 'native-base';

const ButtonInput = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.input}>{children}</Text>
        <Text style ={styles.iconContainer}>
        
        <Icon name="ios-arrow-forward" style={styles.icon}/>
        </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop : 5,
        marginLeft:'1%',
        width : '96%',
        borderColor: 'rgba(37, 45, 66, 0.2)',
        borderBottomWidth:1,
        backgroundColor:'rgba(244, 244, 249, 0.3)',
        padding:6,
    },
    input: {
        padding:2,
        color:'#252D42',
        fontSize:18,
        width:'100%',
        opacity:100,
    },
    icon: {
        color:'rgba(37, 45, 66, 0.4)',
    },
    iconContainer: {
        marginTop:-26,
        textAlign:'right',
    }
});

export { ButtonInput };