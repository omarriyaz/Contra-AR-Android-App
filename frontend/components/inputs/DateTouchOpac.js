import React, { useState } from 'react';
import {  StyleSheet, View, TouchableOpacity, Text, TextInput, Platform } from 'react-native';
// import {TextInput, DefaultTheme} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'

const DateTouchOpac = ({setMe, setter, setTheYear}) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate)
        setTheYear(tempDate)
        setter(tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear());
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    return (
            <View>
            <TouchableOpacity style={styles.inputContainer} onPress={() => showMode('date')}>
                <Text style={styles.inputText}>{setMe}</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker 
                testID='dateTimePicker'
                value={date}
                is24Hour={true}
                display='default'
                onChange={onChange}
                />
            )}
            </View>
    );

};

export default DateTouchOpac;
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
        marginBottom: 10,
        justifyContext: 'center',
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
        color: '#C4C4C4',
        // fontSize: 16,
        fontSize: 12,
        paddingTop: "6%",
        paddingLeft: 0,
        marginHorizontal: 20,
        marginRight: 50,
    }
});