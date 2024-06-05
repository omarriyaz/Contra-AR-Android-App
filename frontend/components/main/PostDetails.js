// import { FlatList, View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { View,ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import {Dimensions} from 'react-native';
import {auth, app} from '../../database/firebase';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, serverTimestamp, collection, addDoc, arrayUnion, increment } from "firebase/firestore";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

export default function PostDetails(props) {
    const [postType, setPostType] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [postTags, setPostTags] = useState('');
    const [data, setData] = useState([]);
    const [caption, setCaption] = useState('');
    const navigator = useNavigation();
    const [urlUploadList, setUploads] = useState([]);
    const [Longitude, setLong] = useState(0);
    const [Latitude, setLat] = useState(0);
    const latitudeDelta = 0.001685339353883819
    const longitudeDelta = 0.0013193115592002869  
    let state = {
      region: {
          latitudeDelta,
          longitudeDelta,
          latitude: 25.102238007918917,
          longitude: 55.16222594305873,
      }
  };
  const onChangeValue = region =>{
    global.coordinate = region
    setLat(coordinate.latitude);
    setLong(coordinate.longitude)
  }
    // Create the file metadata
    // /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
      };

    console.log("The Proppies", props.route.params.data);
   
    useEffect(() => {
        setData(props.route.params.data);
        console.log("THE DATA: ", props.route.params.data )
    },[props.route.params.data])

    const handleCreatePost = () => {
    // Handle creating the post here
        if(postType=='' || postTitle=='' || postLocation=='' || postTags == ''){
            Alert.alert("Please enter information in all the text boxes");
        }else{
            send();
        }
    };

    const send = async () => {
        await uploadImage([]).then(() => {
          const update = async () => {
            await updateNumPosts()
          } 
          update().then(() => {
            navigator.navigate("Feed");
          })
        })
        // navigator.navigate("CreatePostDetails", {data})
      }
  
      const updateNumPosts = async () => {
        const db = getFirestore(app);
  
        const docRef = doc(db, `users/${auth.currentUser.uid}`);
  
        // Atomically increment the population of the city by 50.
        await updateDoc(docRef, {
            nPosts: increment(1)
        });
      }
      
      const uploadImage = async (urlsForUpload) => {
        // let urlsForUpload =[];
        
        for(let i = 0; i < data.length; i++){
          const uri = data[i].uri;
          const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
          const response = await fetch(uri);
          const blob = await response.blob();
          const storage = getStorage();
          const storageRef = ref(storage, childPath);
  
          // 'file' comes from the Blob or File API
          // uploadBytes(storageRef, blob).then((snapshot) => {
          //     console.log('Uploaded a blob or file!');
          //     savePostData(snapshot);
          // });
          const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on('state_changed',
          (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
              case 'paused':
                  console.log('Upload is paused');
                  break;
              case 'running':
                  console.log('Upload is running');
                  break;
              }
          }, 
          (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
              case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  console.log("unauth")
                  break;
              case 'storage/canceled':
                  // User canceled the upload
                  console.log("canceled")
                  break;
  
              // ...
  
              case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  console.log("unkown")
                  break;
              }
          }, 
          () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  // savePostData(downloadURL);
                  urlsForUpload[i] = {uri: downloadURL, height: data[i].height, width: data[i].width }
                  setUploads(urlsForUpload)
                  console.log("Uplodas =================>", urlsForUpload);
                  if(urlsForUpload.length == data.length && !urlsForUpload.includes(undefined)){
                    console.log("Uplodas =================>", urlsForUpload);
                    const saveData = async (url) => {
                      const db = getFirestore(app);
                      await setDoc(doc(collection(db, `posts/${auth.currentUser.uid}/userPosts`)), {downURL: arrayUnion(...url), creation: serverTimestamp(), postType, postTitle, postLocation, postTags, nLikes: 0, caption, Latitude, Longitude})
                      // addDoc(collection(db, "posts/userPosts"),{downURL, caption, creation: serverTimestamp()})
                    ;}
  
                    saveData(urlsForUpload);
  
                  }
                  // if(data.length === urlsForUpload.length){
                    // console.log("TRUE UPLOADS",urlsForUpload)
                  
                  
                  
                  
              });
          }
          );
  
        }
        
    }
    

  return (
    <ScrollView style={styles.container}>
      
       <MapView
        style={{flex:1, width: "100%", height: 250}}
        initialRegion = {state.region}
        onRegionChangeComplete = {onChangeValue}
        showsUserLocation={true}
        ></MapView>
        <View style={{top:'18.5%',left:'52.5%',marginLeft:-24,marginTop:-48,position:'absolute'}}>
            <Image style = {{ resizeMode:'contain',height:30,width:30}} source={require('../../assets/585px-Google_Maps_pin.svg.png')}/>
        </View> 

      <View style={styles.inputContainer}>
            <Text style={styles.label}>Fact or Opinion:</Text>
            {/* Insert Radio Button Here */}
            <View style={styles.wrapper}>
                {['Fact','Opinion'].map(type => (
                    <View key={type} style={styles.typing}>
                        <Text style={styles.RadText}>{type}</Text>
                        <TouchableOpacity style={styles.outter} onPress={() => {setPostType(type)}}>
                            {postType === type && <View style={styles.inner} />}
                            {console.log(postType)}
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
      </View>
           
            
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Post Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter post title..."
          onChangeText={text => setPostTitle(text)}
          value={postTitle}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter post location..."
          onChangeText={text => setPostLocation(text)}
          value={postLocation}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tags:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter post tags..."
          onChangeText={text => setPostTags(text)}
          value={postTags}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Caption:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your caption..."
          onChangeText={text => setCaption(text)}
          value={caption}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleCreatePost}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
      <Text></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 10
  },
  inputContainer: {
    marginVertical: 8
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 8
  },
  buttonContainer: {
    backgroundColor: 'black',
    borderRadius: 4,
    padding: 16,
    paddingBottom: 20,
    alignItems: 'center',
    marginTop: 16
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  outter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 12,
    height: 12,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 0,
  },
  typing: {
    marginHorizontal: 15,
    alignItems: 'center'
  },
  RadText: {
    fontSize: 15,
  }
});
