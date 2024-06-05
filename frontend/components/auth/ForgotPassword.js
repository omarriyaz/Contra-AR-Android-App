import React,{ useState } from 'react';
import { Text, StyleSheet, ImageBackground, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../database/firebase";
const backImage = require("../../assets/onboarding.png");
import Inputs from '../inputs/Inputs';
import {Ionicons} from '@expo/vector-icons';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState("");

    const forgotPasswords = () => {
        sendPasswordResetEmail(auth,email,undefined)
        .then(() => {
            navigation.navigate("ForgotPasswordEmailSent")
        }).catch((error) =>{
            alert(error)
        })
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
                {/* <Appbar.BackAction style={styles.arrow} onPress={() => navigation.navigate("Login")} /> */}
                <Ionicons name="arrow-back" size={30} style={styles.arrowItself} onPress={() => navigation.navigate("Login")}/>
                <SafeAreaView>
                    <Text style={styles.forgotPassword}>Forgot Password</Text>
                    <Text style={styles.enterYourEmail}>enter your email</Text>
                    <Text style={styles.email}>Email</Text>
                    <Inputs place="Enter email" inp={email} inpSetter={setEmail} textContent="emailAddress" keyType="email-address" />
                    <TouchableOpacity style={styles.button} onPress={forgotPasswords}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        </View>
        
    )
}

const styles = StyleSheet.create({
    arrowItself:{
        color: "#ffffff",
        paddingLeft: "10%",
        marginBottom: "10%"
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
        marginTop: "0%",
        marginBottom: "40%",
        width: "75%",
    },
    forgotPassword: {
        fontSize: 28,
        color: "white",
        paddingBottom: "2%",
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