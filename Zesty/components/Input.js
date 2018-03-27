import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Input = ({ title, label, value, onChangeText, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.container}>
        <Text style={styles.label}>{title}</Text>
        <TextInput
            label={label}
            autoCorrect={false}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop : 10,
        width : '100%',
        borderColor: '#eee',
        borderBottomWidth:2,
    },
    label: {
        padding: 5,
        paddingBottom: 0,
        color: '#252D42',
        fontSize:17,
        fontWeight: '700',
        width:'100%',
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        color:'#252D42',
        fontSize:18,
        fontWeight: '700',
        width:'100%',
        opacity:100,
    }
});

export { Input };