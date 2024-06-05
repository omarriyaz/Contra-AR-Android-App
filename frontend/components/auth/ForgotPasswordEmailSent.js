import React,{ useState } from 'react';
import { Text, StyleSheet, ImageBackground, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {TextInput, Appbar} from 'react-native-paper';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../database/firebase";
const backImage = require("../../assets/onboarding.png");

export default function ForgotPasswordEmailSent({ navigation }) {
    return(
        <View style={styles.container}>
            <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
                {/* <Appbar.BackAction style={styles.arrow} onPress={() => navigation.navigate("ForgotPassword")} /> */}
                <SafeAreaView>
                    <Text style={styles.forgotPassword}>Forgot Password</Text>
                    <Text style={styles.verification}>Click the link we’ve sent to your email</Text>
                    <Text style={styles.verification}>and choose a new password.</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.buttonText}>Try Log In</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        </View>
        
    )
}
const styles = StyleSheet.create({
    verification: {
        color: "white",
        alignSelf: "center",
        fontSize: 18,
    },
    arrowItself:{
        color: "#ffffff",
    },
    arrow:{
        marginLeft: "7%",
        backgroundColor: '#ffffff',
        marginBottom: "10%",
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        alignSelf: "center",
    },
    button: {
        backgroundColor: '#1F2767',
        height: 48,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center",
        marginTop: "40%",
        marginBottom: "40%",
        width: "75%",
    },
    forgotPassword: {
        fontSize: 28,
        color: "white",
        paddingBottom: "10%",
        alignSelf: "center",
    },
    enterYourEmail: {
        fontSize: 16,
        color: "white",
        alignSelf:"center",
        paddingBottom:"10%"
    },
    email: {
        fontSize: 18,
        color: "white",
        paddingLeft: "12%",
        paddingBottom: "2%",
        paddingTop: "3%",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    
    image: {
        flex: 1,
        justifyContent: "center"
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 45,
        alignSelf: "center",
        width: "80%",
        marginBottom: "10%",
        fontSize: 16,
        borderRadius: 10,
        padding: 3,
      },
});