import React from "react";
import { View, StyleSheet } from "react-native";
import SelectList from 'react-native-dropdown-select-list'

const DropDownListInp = ({place, setSelected, data}) => {

    return(
        <View style={styles.inputContainer}>
            <SelectList data={data} setSelected={(val) => setSelected(val)} placeholder={place}/>
        </View>
    )
};

export default DropDownListInp;
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
        color: '#000',
        // fontSize: 16,
        fontSize: 12,
        paddingLeft: 0,
        marginHorizontal: 20,
        marginRight: 50,
    }
});