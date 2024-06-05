// import React, { Component, useState } from 'react';
// import {View, Button, TextInput, StyleSheet, Text, ImageBackground, SafeAreaView, TouchableOpacity, StatusBar} from 'react-native';
// import { auth } from '../../database/firebase';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { Ionicons } from '@expo/vector-icons';
// import 'firebase/auth';
// import 'firebase/compat/firestore';

import React, { useState } from "react";
import { StyleSheet, Text, ImageBackground, View, Button, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import {TextInput} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, serverTimestamp, arrayUnion, updateDoc, doc , setDoc, increment} from "firebase/firestore";
import { auth, app } from "../../database/firebase";
import PasswordInput from "../inputs/PasswordInput";
import Inputs from "../inputs/Inputs";

const backImage = require("../../assets/onboarding.png");

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [password, setPassword] = useState("");
    const db = getFirestore(app);
    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(async () => {console.log("Login success")
                const log = [{Time: new Date(), status: "Success"}]
                await updateDoc(doc(db, `userLogs/${auth.currentUser.uid}`), {Logs: arrayUnion(...log)})
                await setDoc(doc(db, `Sessions/${auth.currentUser.uid}`),{Open: increment(1)})
            })
                .catch((err) => Alert.alert("Login error", err.message));
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
                <SafeAreaView>
                    <Text style={styles.contraTitle}>Contra</Text>
                    <Text style={styles.title}>Login to your account</Text>
                    <Text style={styles.break}></Text>
                    <Text style={styles.emailAndPass}>Email</Text>

                    <Inputs place="Enter email" inp={email} inpSetter={setEmail} textContent="emailAddress" keyType="email-address"/>

                    <Text style={styles.emailAndPass}>Password</Text>
                    <PasswordInput pass={password} setPass={setPassword}/>
                    

                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <Text style={styles.break}></Text>
                    <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                            <Text style={{color: '#ffffff', fontWeight: '600', fontSize: 14}}> Create Now</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
            <StatusBar barStyle="light-content" />
        </View>
            
    )
}

const styles = StyleSheet.create({
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
        width: "80%",
    },
    forgotPassword: {
        fontSize: 16,
        color: "white",
        textAlign: "right",
        paddingRight: "11%"
    },
    emailAndPass: {
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
    title: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
        paddingBottom: "0%",
    },
    break: {
        paddingTop: "5%",
    },
    contraTitle: {
        fontSize: 50,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginTop: 0,
        paddingBottom: "3%",
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
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
        marginBottom: 5,
        fontSize: 16,
        borderRadius: 10,
        padding: 3,
      },
});

// export class Login extends Component {
//     constructor(props) {
//         super(props);

//         this.state ={
//             // Details For Sign up stuff
//             email : '',
//             password: '',
//         }

//         this.onSignUp = this.onSignUp.bind(this)
//     }

//     onSignUp(){
//         const { email, password} = this.state;
//         signInWithEmailAndPassword(auth,email,password)
//         .then((result) => {
//             console.log(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     };

//     render() {
        
//         // const [password, setPassword] = useState('');
//         const backImage = require("../../assets/backImage.png");
//         const [showPassword, setShowPassword] = useState(false);
//         const toggleShowPassword = () => {
//             setShowPassword(prevState => !prevState);
//         };
        
//         return (
//             <View style={styles.container}>
//                 <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
//                     <SafeAreaView>
//                         <Text style={styles.contraTitle}>Contra</Text>
//                         <Text style={styles.title}>Login to your account</Text>
//                         <Text style={styles.break}></Text>
//                         <Text style={styles.emailAndPass}>Email</Text>
                        
//                         <View style={styles.inputContainer}>
//                             <TextInput 
//                                 style={styles.inputText}
//                                 autoCapitalize="none"
//                                 keyboardType="email-address"
//                                 textContentType="emailAddress"
//                                 autoFocus={true}
//                                 onChangeText={(email) => this.setState({ email})}
//                                 placeholder="Enter email"
//                                 placeholderTextColor={'#C4C4C4'}
//                             />
//                         </View>

//                         <Text style={styles.emailAndPass}>Password</Text>
//                         {/* <PasswordInput pass={password} setPass={setPassword}/> */}
//                         <View style={styles.inputContainer}>
//                             <TextInput 
//                                 style={styles.inputText}
//                                 secureTextEntry={!showPassword}
//                                 value={pass}
//                                 onChangeText={(password) => this.setState({ password})}
//                                 placeholder={"Enter Password"}
//                                 placeholderTextColor={'#C4C4C4'}
//                             />
//                             <TouchableOpacity style={styles.btnEye} onPress={toggleShowPassword}>
//                                 <Ionicons name={showPassword ? 'ios-eye' : 'ios-eye-off'} size={20} color="#000"/>
//                             </TouchableOpacity>
                            
//                         </View>

//                         {/* <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
//                             <Text style={styles.forgotPassword}>Forgot Password?</Text>
//                         </TouchableOpacity> */}
//                         <Text style={styles.break}></Text>
//                         <TouchableOpacity style={styles.button} onPress={() => this.onSignUp()}>
//                             <Text style={styles.buttonText}>Login</Text>
//                         </TouchableOpacity>
//                         <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
//                             <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
//                             {/* <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
//                                 <Text style={{color: '#ffffff', fontWeight: '600', fontSize: 14}}> Create Now</Text>
//                             </TouchableOpacity> */}
//                         </View>
//                     </SafeAreaView>
//                 </ImageBackground>
//                 <StatusBar barStyle="light-content" />
//             </View>
//             // <View>
//             //     <TextInput placeholder='email' onChangeText={(email) => this.setState({ email})}/>
//             //     <TextInput placeholder='password' secureTextEntry={true} onChangeText={(password) => this.setState({ password})}/>

//             //     <Button 
//             //         onPress={() => this.onSignUp()}
//             //         title="Sign In"
//             //     />
//             // </View>
//     )}
// }
// export default Login

// const styles = StyleSheet.create({
//     inputContainer:{
//         width: '80%',
//         backgroundColor: '#FFF',
//         borderRadius: 5,
//         height: 55,
//         // height:40,
//         marginBottom:20,
//         // marginBottom: 10,
//         justifyContext: 'center',
//         paddingTop:13,
//         // paddingTop: 5,
//         alignSelf: 'center'
//     },
//     inputText: {
//         color: '#000',
//         fontSize: 16,
//         // fontSize: 13,
//         paddingLeft: 0,
//         marginHorizontal: 20,
//         marginRight: 50,
//     },
//     btnEye: {
//         position: 'absolute',
//         right: 15,
//         top: 16
//     },
//     buttonText: {
//         fontSize: 18,
//         color: "white",
//         alignSelf: "center",
//     },
//     button: {
//         backgroundColor: '#1F2767',
//         height: 48,
//         borderRadius: 10,
//         justifyContent: "center",
//         alignItems: 'center',
//         alignSelf: "center",
//         marginTop: "0%",
//         width: "80%",
//     },
//     forgotPassword: {
//         fontSize: 16,
//         color: "white",
//         textAlign: "right",
//         paddingRight: "11%"
//     },
//     emailAndPass: {
//         fontSize: 18,
//         color: "white",
//         paddingLeft: "12%",
//         paddingBottom: "2%",
//         paddingTop: "3%",
//     },
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     title: {
//         fontSize: 18,
//         color: "white",
//         textAlign: "center",
//         paddingBottom: "0%",
//     },
//     break: {
//         paddingTop: "5%",
//     },
//     contraTitle: {
//         fontSize: 50,
//         fontWeight: "bold",
//         color: "white",
//         textAlign: "center",
//         marginTop: 0,
//         paddingBottom: "3%",
//     },
//     whiteSheet: {
//         width: '100%',
//         height: '75%',
//         position: "absolute",
//         bottom: 0,
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 60,
//     },
//     form: {
//         flex: 1,
//         justifyContent: 'center',
//         marginHorizontal: 30,
//     },
//     image: {
//         flex: 1,
//         justifyContent: "center"
//     },
//     input: {
//         backgroundColor: "#F6F7FB",
//         height: 45,
//         alignSelf: "center",
//         width: "80%",
//         marginBottom: 5,
//         fontSize: 16,
//         borderRadius: 10,
//         padding: 3,
//       },
// });