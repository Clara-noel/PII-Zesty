import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({ title }) => {
    return (
        <View style={styles.container}>
        <Text style={styles.label}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        width: '106%',
        marginTop:-10,
        marginLeft:-10,
        height:70,
        backgroundColor:'#252D42',
    },
    label: {
        textAlign:'center',
        paddingTop:6,
        color: '#FFF',
        fontSize:21,
        fontWeight: '700',
        width:'100%',
    },
});

export { Header };