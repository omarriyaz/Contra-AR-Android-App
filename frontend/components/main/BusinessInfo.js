import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { app, auth } from '../../database/firebase';
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../redux/slice/userSlice';
// import { initializeApp } from 'firebase/app';
import { updateDoc, doc,getFirestore } from 'firebase/firestore';

function BusinessInfoScreen() {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const db = getFirestore(app);
  const theCurrentUser = useSelector((state) => state.user.user);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser()).then(() => {
      setAddress(theCurrentUser.businessAddress);
      setPhoneNumber(theCurrentUser.businessNumber);
      setEmail(theCurrentUser.businessEmail)
      setWebsite(theCurrentUser.businessWebsite)
    });
  }, [])


  const update = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    console.log("address", address, "No:", phoneNumber, "Email:", email, "Website", website);
    await updateDoc(docRef, {
      businessAddress: address, businessNumber: phoneNumber, businessEmail: email, businessWebsite: website 
    }).then(() => {
        Alert.alert("Business details have been changed");
        dispatch(fetchUser())
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <FontAwesome5  style={{marginLeft: 6}} name="map-marker-alt" size={24} color="#4B0082" />
        <TextInput
          style={styles.infoTextInput}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />
      </View>
      <View style={styles.infoContainer}>
        <FontAwesome5 name="phone" size={24} color="#4B0082" />
        <TextInput
          style={styles.infoTextInput}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter your phone number"
        />
      </View>
      <View style={styles.infoContainer}>
        <FontAwesome5 name="envelope" size={24} color="#4B0082" />
        <TextInput
          style={styles.infoTextInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.infoContainer}>
        <FontAwesome5 name="globe" size={24} color="#4B0082" />
        <TextInput
          style={styles.infoTextInput}
          value={website}
          onChangeText={setWebsite}
          placeholder="Enter your website"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={update}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  infoTextInput: {
    flex: 1,
    marginLeft: 20,
    fontSize: 18,
    color: '#4B0082',
    borderBottomWidth: 2,
    borderBottomColor: '#4B0082'
  },
  button: {
    backgroundColor: '#4B0082',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 30,
    marginTop: 30,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BusinessInfoScreen;