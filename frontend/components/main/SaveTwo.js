import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native'
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app, auth } from '../../database/firebase';
import { getFirestore, serverTimestamp, collection, addDoc, arrayUnion, increment } from "firebase/firestore";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import DraggableFlatList, {ScaleDecorator} from "react-native-draggable-flatlist";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { async } from '@firebase/util';
import {Dimensions} from 'react-native';

export default function SaveTwo(props) {
    const [data, setData] = useState([]);
    const navigator = useNavigation();
    const [urlUploadList, setUploads] = useState([]);
    
    // Create the file metadata
    // /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };

    // console.log(props.route.params.images[0].uri);
    useEffect(() => {
        setData(props.route.params.images)
    },[props.route.params.images])

    

    const send = async () => {
      // await uploadImage([]).then(() => {
      //   const update = async () => {
      //     await updateNumPosts()
      //   } 
      //   update().then(() => {
      //     navigator.navigate("Feed");
      //   })
      // })
      navigator.navigate("CreatePostDetails", {data})
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
                    await setDoc(doc(collection(db, `posts/${auth.currentUser.uid}/userPosts`)), {downURL: arrayUnion(...url), creation: serverTimestamp()})
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

    const renderItem = ({ item, drag}) => {
        return (
          <ScaleDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              style={{flex: 1, minHeight: (Dimensions.get('window').width * item.height)/item.width, maxWidth: Dimensions.get('window').width}}
            >
              <Image source={{uri: item.uri}} style={{minWidth: 100,maxWidth: Dimensions.get('window').width, minHeight: "100%"}}/>
            </TouchableOpacity>
          </ScaleDecorator>
        );
      };

    return (
        <View style={{maxWidth: "100%"}}>
          {/* <Text style={{paddingTop: 15, backgroundColor: 'grey'}}>Hi</Text> */}
          <View style={{flexDirection: 'row', flex: 1, minHeight: 65, paddingTop: 20, backgroundColor: 'white'}}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={35}
              color="black"
              style={{marginLeft: "2%", marginBottom: 10}}
              onPress={() => navigator.navigate("AddTwo")}
            />

            <MaterialCommunityIcons
              name="send"
              size={35}
              color="black"
              style={{marginLeft: "76%"}}
              onPress={() => send()}
            />

          </View>
          
          <DraggableFlatList
            data={data}
            onDragEnd={({ data }) => setData(data)}
            keyExtractor={(item) => item.assetId}
            renderItem={renderItem}
            style={{marginBottom: "30%", marginTop: 0}}
          />
          {/* <Text style={{paddingTop: 15}}>hi</Text> */}
        
        </View>
        // <Image source={{uri: props.route.params.images[0].uri}} style={{flex: 1}}/>
      );
}