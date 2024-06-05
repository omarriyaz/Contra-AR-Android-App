import { auth } from '../../database/firebase';
import { app } from '../../database/firebase';
import { collection, getDoc, getFirestore } from "firebase/firestore";
import { doc, setDoc, onSnapshot } from "firebase/firestore"; 
import {SelectList} from 'react-native-dropdown-select-list';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ImageBackground, View, Button, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../database/firebase";
import {Ionicons} from '@expo/vector-icons';
import SignUpInputs from "../../components/inputs/SignUpInputs";
// import PasswordInput from "../component/PasswordInput";
import PasswordInputSignUp from "../../components/inputs/PasswordInputSignUp";
import DateTouchOpac from '../inputs/DateTouchOpac';
import SignUpInpWithTextUnder from '../inputs/SignUpInpWithTextUnder';
// import DropDownListInp from "../inputs/DropDownListInp";
const createAccountBack = require("../../assets/onboarding.png");

export default function Signup({ navigation }) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("Select");
    const [password, setPassword] = useState("");
    const [year, setYear] = useState(new Date());
    const [isValid, setValid] = useState(false);
    const db = getFirestore(app);
    // const [placeHold, setPlaceHold] = useState("DD/MM/YYYY");

    const onHandleSignup = () => {
        // Add a check to see if the users username is unique. Do this by adding a 
        // collection usernames with the username as the id and the uid stored as a field in the collection. If it is ok then do the below.
        // Also make checks for the other details. I.E number, gender, DOB. Then finally add a drop down menu for gender and a calendar thing for 
        // DOB, 7 years old at least. and not = Select  Only if the Date, The username available or unavailable, gender is not ''
        if(isValid && name !== ""){
            if(gender !== "" && dateOfBirth !== ""){
                if(year.getFullYear() < new Date().getFullYear()){
                    if (email !== "" && password !== "") {
                    
                        createUserWithEmailAndPassword(auth, email, password)
                            .then((result) => {
                                setDoc(doc(db, "users", auth.currentUser.uid), 
                                {
                                    name: name, email: email, username: username, uid: auth.currentUser.uid, avatar: "https://firebasestorage.googleapis.com/v0/b/contra-5957f.appspot.com/o/default%2FdefaultImage.png?alt=media&token=06b3a54e-c1bc-49d9-ba59-102b2f2043e0"
                                });
                                setDoc(doc(db, `usernames/${username}`),{uid: auth.currentUser.uid})
                                const log = [{Time: new Date(), status: "Success"}]
                                setDoc(doc(db, `userLogs/${auth.currentUser.uid}`), {Logs: arrayUnion(...log)})
                                setDoc(doc(db,`Sessions/${auth.currentUser.uid}`),{Open: 1})
                            })
                            .catch((err) => Alert.alert(err.message, err.code));
                    }
                }else{
                    Alert.alert("The Year selected must be before the current year");
                }
            }else {
                Alert.alert("Make sure a option is selected for date of birth and gender");
            }
        }else{
            Alert.alert("Invalid Username/Name: Check to see if details entered are valid");
        }

        
    };

    useEffect(() => {
    
        
    
        const loadData = async () => {
            const ref = doc(db, `usernames/${username}`)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()) {
                setValid(false)
            }else{
                setValid(true)
            }
        }  

        if(username.length >= 3 && username.length <= 15){
            console.log("work")
            loadData().catch(console.error);
            console.log("HI")
        }else{
            setValid(false)
        }
          
      }, [username]);

    const data = [
        {key:'1', value:'Male'},
        {key:'2', value:'Female'},
        {key:'3', value:'Other'},
    ];

    return (
        <View style={styles.container}>
            <ImageBackground source={createAccountBack} resizeMode="cover" style={styles.image}>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                    <Ionicons name="arrow-back" size={30} style={styles.arrowItself} onPress={() => navigation.navigate("Login")}/>
                    </View>
                    <View style={{flex:1, paddingRight: "30%", marginBottom: "10%"}}>
                    <Text style={styles.title}>Create Your Account</Text>
                    </View>
                </View>
                <SafeAreaView>
                    <Text style={styles.emailAndPass}>Name</Text>
                    <SignUpInputs place="Enter Name" inp={name} inpSetter={setName} textContent="name" keyType="name"/>
                    <Text style={styles.emailAndPass}>Username</Text>
                    {/* isValidSetter={setValid} username={username} */}
                    <SignUpInpWithTextUnder place="Enter Username" inp={username} inpSetter={setUsername} textContent="username" keyType="username"/>
                    {isValid ? <Text style={{color: "lime", paddingLeft: "15%"}}>@{username} is available</Text> : <Text style={{color: "red", paddingLeft: "15%"}}>@{username} is not available</Text>}
                    
                    <Text style={styles.emailAndPass}>Email</Text>

                    <SignUpInputs place="Enter email" inp={email} inpSetter={setEmail} textContent="emailAddress" keyType="email-address"/>
                    
                    {/* <Text style={styles.emailAndPass}>Mobile Number</Text>
                    
                    <SignUpInputs place="Enter Mobile Number" inp={mobileNumber} inpSetter={setMobileNumber} textContent="mobileNumber" keyType="mobileNumber"/>
                    
                    <View style={{flexDirection:"row"}}>
                    <View style={{flex:1, paddingLeft: "6%"}}>
                    <Text style={styles.emailAndPass}>Gender</Text> */}
                    {/* <DropDownListInp place="Gender" setSelected={setGender} data={data}/> */}
{/*                     
                    <SelectList data={data} setSelected={(val) => setGender(val)} placeholder="Gender" save="value" boxStyles={{backgroundColor: 'white', height: 40, width: "80%", marginLeft: "9%"}} inputStyles={{color: '#C4C4C4', paddingBottom: "1.55%", fontSize: 12}} dropdownStyles={{backgroundColor: "white", width: "80%", marginLeft: "9%"}}/>
                    
                    </View>
                    <View style={{flex:1, paddingRight: "6%"}}>
                    <Text style={styles.emailAndPass}>Date Of Birth</Text> */}
                    {/* <SignUpInputs place={"DD/MM/YYYY"} inp={dateOfBirth} inpSetter={setDateOfBirth} textContent="dateOfBirth" keyType="dateOfBirth"/> */}
                    {/* <DateTouchOpac setMe={dateOfBirth} setter={setDateOfBirth} setTheYear={setYear}></DateTouchOpac>
                    </View>
                    </View> */}

                    <Text style={styles.emailAndPass}>Password</Text>
                    <PasswordInputSignUp pass={password} setPass={setPassword}/>
                    <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Create</Text>
                    </TouchableOpacity>
                    </SafeAreaView>
                    <StatusBar barStyle="light-content" />
                    
            </ImageBackground>
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
        marginTop: "5%",
        width: "80%",
    },
    forgotPassword: {
        fontSize: 16,
        color: "white",
        textAlign: "right",
        paddingRight: "11%"
    },
    emailAndPass: {
        fontSize: 15,
        color: "white",
        paddingLeft: "15%",
        paddingBottom: "2%",
        paddingTop: "2%",
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
        height: 35,
        alignSelf: "center",
        width: "80%",
        marginBottom: 5,
        fontSize: 16,
        borderRadius: 10,
        padding: 5,
      },
      input2: {
        backgroundColor: "#F6F7FB",
        height: 35,
        alignSelf: "center",
        width: "75%",
        marginBottom: 5,
        marginRight: "10%",
        fontSize: 16,
        borderRadius: 10,
        padding: 5,
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
      arrow:{
        marginLeft: "7%",
        backgroundColor: '#ffffff',
        marginBottom: "0%",
    },
    arrowItself:{
        color: "#ffffff",
        paddingLeft: "30%",
        marginBottom: "1%"
    },
});
// export class Registration extends Component {
//     constructor(props) {
//         super(props);

//         this.state ={
//             // Details For Sign up stuff
//             email : '',
//             password: '',
//             name: ''
//         }

//         this.onSignUp = this.onSignUp.bind(this)
//     }

//     onSignUp(){
//         const { email, password, name } = this.state;
//         const db = getFirestore(app);
//         createUserWithEmailAndPassword(auth,email,password)
//         .then((result) => {
//             // Add a new document in collection "cities"
//             setDoc(doc(db, "users", auth.currentUser.uid), ({name, email}));
//             console.log(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     }

//     render() {
//         return (
//             <View>
//                 <TextInput placeholder='name' onChangeText={(name) => this.setState({ name })}/>
//                 <TextInput placeholder='email' onChangeText={(email) => this.setState({ email})}/>
//                 <TextInput placeholder='password' secureTextEntry={true} onChangeText={(password) => this.setState({ password})}/>

//                 <Button 
//                     onPress={() => this.onSignUp()}
//                     title="Sign Up"
//                 />
//             </View>
//     )}
// }
// export default Registration