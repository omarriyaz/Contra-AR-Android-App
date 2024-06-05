import React from 'react'
import {useState} from "react";
import {StyleSheet, Text, View, Button, Image, TextInput} from 'react-native'
import { auth } from '../../database/firebase';
// import firebase from 'firebase'
// require("firebase/firestore")
// require("firebase/firebase-storage")
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../database/firebase';
import { getFirestore, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

export default function Save(props) {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };
    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;
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
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;

            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                savePostData(downloadURL);
            });
        }
        );

    }
    
    const savePostData = async (downURL) => {
        const db = getFirestore(app);
        await setDoc(doc(collection(db, `posts/${auth.currentUser.uid}/userPosts`)), {downURL, caption, creation: serverTimestamp()})
        // addDoc(collection(db, "posts/userPosts"),{downURL, caption, creation: serverTimestamp()})
        .then((function () {
            props.navigation.popToTop()
            console.log("Reached End")
        }));
    }

    return (
        <View style={{flex: 1}}>
            <Image source={{uri: props.route.params.image}}/>
            <TextInput placeholder='Write a Caption...' onChangeText={(caption) => setCaption(caption)}/>
            <Button title='Save' onPress={() => uploadImage()}/>
        </View>
    )
}
