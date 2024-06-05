import React, { useState } from 'react';
import {  StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
// import {TextInput, DefaultTheme} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const PasswordInput = ({pass, setPass}) => {
    const [showPassword, setShowPassword] = useState(false);
    // const [password, setPassword] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
            
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.inputText}
                    secureTextEntry={!showPassword}
                    value={pass}
                    onChangeText={text => setPass(text)}
                    placeholder={"Enter Password"}
                    placeholderTextColor={'#C4C4C4'}
                />
                <TouchableOpacity style={styles.btnEye} onPress={toggleShowPassword}>
                    <Ionicons name={showPassword ? 'ios-eye' : 'ios-eye-off'} size={20} color="#000"/>
                </TouchableOpacity>
                
            </View>

    );

};

export default PasswordInput;

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
        borderRadius: 5,
        height: 55,
        marginBottom:20,
        justifyContent: 'center',
        paddingTop:13,
        alignSelf: 'center'
    },
    btnEye: {
        position: 'absolute',
        right: 15,
        top: 16
    },
    inputText: {
        color: '#000',
        fontSize: 16,
        paddingLeft: 0,
        marginHorizontal: 20,
        marginRight: 50,
        marginBottom: 10
    }
});