import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
// import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';
// import { delay } from "@reduxjs/toolkit/dist/utils";

export default function AddTwo({navigation}) {
    // const [images, setImages] = useState([]);
    const openImagePicker = async () => {
        // let imageList = [];
        // ImagePicker.openPicker({
        //     multiple: true,
        //     // waitAnimationEnd: false,
        //     // includeExif: true,
        //     // forceJpg: true,
        //     // compressImageQuality: 0.8,
        //     // mediaType: 'any',
        //     // includeBase64: true,
        // }).then(response => {
        //     console.log('Response: ', response);
        // })
        // const delay = ms => new Promise(
        //     resolve => setTimeout(resolve, ms)
        //   );          

        // useEffect(() => {

        // },[])

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 10,
            quality: 0.8
        })
        // console.log("Result: ", result.assets);
        if(!result.canceled) {
            // setImages([]);
            let images = [];
            for(let i = 0; i < result.assets.length; i++){
                images[i] = {assetId: Math.random().toString(36), uri: result.assets[i].uri, height: result.assets[i].height, width: result.assets[i].height}
                console.log("IMAGES",images);

            }
            // setImages(result.assets);
            // await delay(500);
            
            navigation.navigate('SaveTwo', {images})
        }
    };

    return(
        // <View style={{flex: 1, justifyContent: 'center'}}>
        //    <TouchableOpacity onPress={openImagePicker}>
        //     <Text style={{alignSelf: 'center'}}>Upload</Text>
        //    </TouchableOpacity>
            
        //    {/* <TouchableOpacity onPress={() => navigation.navigate('SaveTwo', {images})}>
        //     <Text style={{alignSelf: 'center'}}>Continue</Text>
        //    </TouchableOpacity> */}
        // </View>
        <View style={styles.container}>
        <TouchableOpacity style={styles.iconContainer} onPress={openImagePicker}>
          <AntDesign name="upload" size={32} color="white" />
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      backgroundColor: 'purple',
      borderRadius: 50,
      padding: 20,
    },
  });