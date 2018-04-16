import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonInput = ({ onPress, children}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.input}>{children}</Text>
        <Text style ={styles.iconContainer}>
        <Icon name={'arrow-right'} style={styles.icon} size={20} />
        </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop : 5,
        marginLeft:'1%',
        width : '96%',
        borderColor: '#eee',
        borderBottomWidth:2,
    },
    input: {
        padding:5,
        paddingBottom:2,
        color:'#252D42',
        fontSize:18,
        width:'100%',
        opacity:100,
    },
    icon: {
        color:'rgba(37, 45, 66, 0.2)',
    },
    iconContainer: {
        marginTop:-26,
        textAlign:'right',
        paddingBottom:6,
    }
});

export { ButtonInput };