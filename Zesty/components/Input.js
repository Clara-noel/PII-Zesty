import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Input = ({ title, label, value, onChangeText, placeholder, secureTextEntry, editable}) => {
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
            autoCapitalize= {'none'}
            maxLength={100}
            editable={editable}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop : 5,
        width : '90%',
        borderColor: '#eee',
        borderBottomWidth:2,
    },
    label: {
        padding: 2,
        paddingBottom: 0,
        color: '#252D42',
        fontSize:17,
        fontWeight: '700',
        width:'100%',
    },
    input: {
        padding:5,
        color:'#252D42',
        fontSize:18,
        width:'100%',
        opacity:100,
    }
});

export { Input };