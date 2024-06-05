
import React, { useState } from 'react';
import {  StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
// import {TextInput, DefaultTheme} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const SignUpInpWithTextUnder = ({place, inp, inpSetter, textContent, keyType}) => {
    

    return (
            
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.inputText}
                    autoCapitalize="none"
                    keyboardType={keyType}
                    textContentType={textContent}
                    autoFocus={true}
                    value={inp}
                    onChangeText={text => inpSetter(text)}
                    placeholder={place}
                    placeholderTextColor={'#C4C4C4'}
                />
                
            </View>

    );

};

export default SignUpInpWithTextUnder;
const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    inputContainer:{
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        // height: 55,
        height:40,
        // marginBottom:20,
        marginBottom: 0,
        justifyContent: 'center',
        // paddingTop:13,
        paddingTop: 5,
        alignSelf: 'center'
    },
    btnEye: {
        position: 'absolute',
        right: 15,
        top: 16
    },
    inputText: {
        color: '#000',
        // fontSize: 16,
        fontSize: 12,
        paddingLeft: 0,
        marginHorizontal: 20,
        marginRight: 50,
        marginBottom: 8
    }
});