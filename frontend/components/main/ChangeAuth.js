import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, sendEmailVerification, reauthenticateWithCredential, EmailAuthProvider  } from "firebase/auth";
import { updatePassword, updateEmail } from "firebase/auth";
import PasswordInput from '../inputs/ChangeAuthPass';
import Input from '../inputs/ChangeEmail';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';


function ChangeAuthScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const navigator=useNavigation();

  const reauthenticate = (currPass) => {
    const auth = getAuth();
    const user = auth.currentUser;
    var cred = EmailAuthProvider.credential(user.email, currPass)
    return reauthenticateWithCredential(user, cred);
  }

  const handlePasswordChange = () => {
        // Handle changing the user's password
        const auth = getAuth();
        const user = auth.currentUser;
        reauthenticate(currentPassword).then(() =>{
            updatePassword(user, newPassword).then(() => {
                // Update successful.
                Alert.alert("Password has been changed")
            }).catch((error) => {
                // An error ocurred
                Alert.alert(error.message)
            });
        }).catch((error) => {
            Alert.alert(error.message)
        });
        
  };

  const handleEmailChange = () => {
    // Handle changing the user's email
    const auth = getAuth();
        const user = auth.currentUser;
        reauthenticate(currentPassword).then(() =>{
            updateEmail(user, newEmail).then(() => {
                // Update successful.
                Alert.alert("Email has been changed")
            }).catch((error) => {
                // An error ocurred
                Alert.alert(error.message)
            });
        }).catch((error) => {
            Alert.alert(error.message)
        });
  };

  return (
    <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigator.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Change Authentication</Text>
            <View />
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
      <View style={styles.inputContainer}>
        <Text style={styles.emailAndPass}>Current Password</Text>
        <PasswordInput pass={currentPassword} setPass={setCurrentPassword}/>
        <Text style={styles.emailAndPass}>New Password</Text>
        <PasswordInput pass={newPassword} setPass={setNewPassword}/>
        <Text style={styles.emailAndPass}>Change Email</Text>
        <Input place="Enter Email" inp={newEmail} inpSetter={setNewEmail} textContent="emailAddress" keyType="email-address"/>
        
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEmailChange}>
          <Text style={styles.buttonText}>Change Email</Text>
        </TouchableOpacity>
      </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 0,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'purple',
        padding: 20,
        paddingTop: 35
      },
      title: {
        color: 'white',
        fontSize: 18,
      },
 
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginBottom: 20,
//   },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '70%',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,

  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center'
  },
  emailAndPass: {
    marginLeft: "10%",
    color: 'black',
    paddingBottom: 5
  }
});

export default ChangeAuthScreen;