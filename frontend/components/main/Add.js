import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import GradientText from '../inputs/gradient'
import MaskedView from '@react-native-community/masked-view'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Add({navigation}) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            navigation.setOptions({headerShown: false});
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            try {
                const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
                setHasGalleryPermission(galleryStatus.status === 'granted');
            } catch (error) {
                
            }
            

        })();
    },[]);
    
    const iconMask = (iconName) => {
        return(
            
              <MaskedView
                style={{ flex: 1, flexDirection: 'row', height: 28 }}
                maskElement={
                  
                    <MaterialCommunityIcons
                      name={iconName}
                      size={28}
                      color="white"
                      style={styles.shadow}
                    />
                  
                }>
                <LinearGradient
                  colors={['#0069CD', '#6002E0']}
                  style={{ flex: 1 }}
                />
              </MaskedView>)
    }

    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          // we can change the line below to also accept videos or GIFS etc
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    
    
    if(hasCameraPermission === null || hasGalleryPermission === false) {
        return <View />
    }
    if(hasCameraPermission === false || hasGalleryPermission === false){
        return <Text>No access to the camera</Text>;
    }
        
    return (
        <View style={{flex: 1, padding: 5, backgroundColor: 'white'}}>
            <View style={{justifyContent: "center"}}>
            <GradientText text="Add A Scrapbook Cover Photo" style={{alignSelf: "center", fontSize: 20, paddingBottom: "7%", marginTop: "20%"}}/></View>
            
            <LinearGradient
                colors={['#0069CD', '#6002E0']}
                // start={{x: 0, y: 0}}
                    // end={{x: 1, y: 1}}
                style={styles.image}>
                <View style={styles.cameraContainer}>
                    <Camera ref={ref => setCamera(ref)} style={styles.fixRatio} type={type} ratio={'1:1'}/>
                </View>
            </LinearGradient>
            <LinearGradient
                colors={['#0069CD', '#6002E0']}
                // start={{x: 0, y: 0}}
                // end={{x: 1, y: 1}}
                style={styles.utilities}>
                <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', flex: 1, borderRadius: 20}}>
                    <TouchableOpacity  style={{
                        width: "12%", minHeight: 70, marginRight: "5%", marginTop: "2%"
                    }}  onPress={() => navigation.popToTop()}>
                    
                    <MaskedView
                        style={{ flex: 1, flexDirection: 'row', height: 28 }}
                            maskElement={
                            
                                <MaterialCommunityIcons
                                    name="keyboard-backspace"
                                    size={45}
                                    color="white"
                                    style={styles.shadow}
                                />
                            }>
                        <LinearGradient
                            colors={['#0069CD', '#6002E0']}
                            style={{ flex: 1 }}
                            />
                    </MaskedView>
                </TouchableOpacity>
                    {/* <Button title="Flip Image" onPress={() => {
                        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                        }}>
                    </Button> */}
                    <TouchableOpacity  style={{
                        width: "12%", minHeight: 70, marginRight: "5%", marginTop: "2%"
                    }}  onPress={() => {
                        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                        }}>
                    
                        <MaskedView
                            style={{ flex: 1, flexDirection: 'row', height: 28 }}
                                maskElement={
                                
                                    <MaterialCommunityIcons
                                        name="camera-flip-outline"
                                        size={45}
                                        color="white"
                                        style={styles.shadow}
                                    />
                                }>
                            <LinearGradient
                                colors={['#0069CD', '#6002E0']}
                                style={{ flex: 1 }}
                                />
                        </MaskedView>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{
                        width: "12%", minHeight: 70, marginRight: "5%", marginTop: "2%"
                    }}  onPress={() => takePicture()}>
                    
                        <MaskedView
                            style={{ flex: 1, flexDirection: 'row', height: 28 }}
                                maskElement={
                                
                                    <MaterialCommunityIcons
                                        name="record-circle-outline"
                                        size={45}
                                        color="white"
                                        style={styles.shadow}
                                    />
                                }>
                            <LinearGradient
                                colors={['#0069CD', '#6002E0']}
                                style={{ flex: 1 }}
                                />
                        </MaskedView>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{
                        width: "12%", minHeight: 70, marginRight: "5%", marginTop: "2%"
                    }}  onPress={() => pickImage()}>
                    
                        <MaskedView
                            style={{ flex: 1, flexDirection: 'row', height: 28 }}
                                maskElement={
                                
                                    <MaterialCommunityIcons
                                        name="upload"
                                        size={45}
                                        color="white"
                                        style={styles.shadow}
                                    />
                                }>
                            <LinearGradient
                                colors={['#0069CD', '#6002E0']}
                                style={{ flex: 1 }}
                                />
                        </MaskedView>
                    </TouchableOpacity>
                    {/* <TouchableOpacity  style={{
                        width: "12%", minHeight: 70, marginTop: "2%"
                    }}  onPress={() => navigation.navigate('Save', {image})}>
                    
                        <MaskedView
                            style={{ flex: 1, flexDirection: 'row', height: 28 }}
                                maskElement={
                                
                                    <MaterialCommunityIcons
                                        name="send"
                                        size={45}
                                        color="white"
                                        style={styles.shadow}
                                    />
                                }>
                            <LinearGradient
                                colors={['#0069CD', '#6002E0']}
                                style={{ flex: 1 }}
                                />
                        </MaskedView>
                    </TouchableOpacity> */}
                </View>
                </LinearGradient>
            {/* <Button title="Take Picture" onPress={() => takePicture()}/> */}
            {/* <Button title="Pick image from gallery" onPress={() => pickImage()}/> */}
            {/* <Button title="Save" onPress={() => navigation.navigate('Save', {image})}/> */}
            {/* {image && <Image source={{uri: image}} style={{flex: 1}}/>} */}
        </View>
    )
}

const styles = StyleSheet.create({
    utilities: {
        flex: 1,
        maxHeight: "10%",
        borderRadius: 20,
        padding: 1,
        marginTop: "20%"
    },
    image: {
        flex: 1,
        marginTop: "10%",
        maxHeight: "47%",
        padding: 1,
        borderRadius: 50,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 50,
        maxHeight: "100%",
        justifyContent: "center",
        overflow: "hidden"
    },
    fixRatio: {
        flex: 1,
        aspectRatio: 1/1
    },
    shadow: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: 1,
            },
          },
})