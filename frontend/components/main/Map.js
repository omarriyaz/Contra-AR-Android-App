import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
// // import { query, where, getFirestore, collection, getDocs } from "firebase/firestore";
// // import { app, auth } from '../../database/firebase';
// // import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// // // import Geolocation from '@react-native-community/geolocation';
// // // import { Location, Permissions } from 'expo';
// // import * as Location from 'expo-location';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { StyleSheet, View, Dimensions,Text,SafeAreaView } from 'react-native';
// // import { apiKey } from "./environment";
// // import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';



// const initialState = {
//     latitude: 25.102783,
//     longitude: 55.161884,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
// }

export default function Map() {
//     // Location.installWebGeolocationPolyfill();
// //     const [location, setLocation] = useState(null);
// //     const [errorMsg, setErrorMsg] = useState(null);
// //     const [currentPosition, setCurrentPosition] = useState(initialState);


// //   useEffect(() => {
// //     (async () => {
      
// //       let { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== 'granted') {
// //         setErrorMsg('Permission to access location was denied');
// //         return;
// //       }

// //       let location = await Location.getCurrentPositionAsync({});
// //       setLocation(location);
      
      
// //     })();
// //     if(location != null){
// //         const {longitude, latitude} = location.coords;
// //         console.log("LONG AND LAT", longitude, latitude);
// //         setCurrentPosition({
// //             ...currentPosition,
// //             latitude,
// //             longitude,   
// //         })
// //     }
// //     console.log(location);

    
// //   }, []);

  

//   // let text = 'Waiting..';
//   // if (errorMsg) {
//   //   text = errorMsg;
//   // } else if (location) {
//   //   console.log(JSON.stringify(location));
//   // }

// //   const { width, height } = Dimensions.get("window");

// //   const ASPECT_RATIO = width / height;
// //   const LATITUDE_DELTA = 0.02;
// //   const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// //   const INITIAL_POSITION = {
// //     latitude: 25.102783,
// //     longitude: 55.161884,
// //     latitudeDelta: LATITUDE_DELTA,
// //     longitudeDelta: LONGITUDE_DELTA,
// //   };

  return (
        <View>Hi</View>
//         <MapView 
//         provider={PROVIDER_GOOGLE}
//         style={{flex: 1}}
//         showsUserLocation={true}
//         initialRegion={{
//             latitude: 25.102783,
//             longitude: 55.161884,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//         }}
//         />
    ) 

};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2c3e50',
//     }
// })