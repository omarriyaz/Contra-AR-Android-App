import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux'
import { auth, app } from '../../database/firebase';
import { fetchUser } from '../../redux/slice/userSlice';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function EditProfileScreen () {
  const db = getFirestore(app);
  const theCurrentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(""+theCurrentUser.name);
  const [bio, setBio] = useState(""+theCurrentUser.bio);
  const [username, setUsername] = useState('@'+theCurrentUser.username);
  const [profilePicture, setProfilePicture] = useState(""+theCurrentUser.avatar);
  const [newProf, setNewProf] = useState("");

  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
};

  useEffect(() => {
    dispatch(fetchUser());
  }, [auth.currentUser.uid,])

  const uploadImage = async (uriImg) => {
    const uri = uriImg;
    const childPath = `profilePics/${auth.currentUser.uid}`;
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, childPath);
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
            setProfilePicture(downloadURL);
            setNewProf(downloadURL)
            console.log(downloadURL)
            uploadDoc(downloadURL);
        });
    }
    );

  }

  const handleSave = async () => {
    // handle saving the user's updated profile information
    await uploadImage(profilePicture).then(async ()=> {
        console.log("newwww", newProf);
    })
    

  };

  const uploadDoc = async (downloadURL) => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    console.log("newUpload", downloadURL);
    await updateDoc(docRef, {
      avatar: downloadURL, name: name, bio: bio 
    }).then(() => {
        Alert.alert("Details have been changed");
        dispatch(fetchUser())
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        // we can change the line below to also accept videos or GIFS etc
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });

    if(!result.canceled){
        // console.log(result.assets.uri);
        setProfilePicture(result.assets[0].uri)
    }
  }
  //

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => pickImage()}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : (
          <View style={styles.profilePicturePlaceholder}>
            <Text style={styles.profilePicturePlaceholderText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
      />
      <TextInput
        style={[styles.input, styles.bioInput]}
        value={bio}
        onChangeText={(text) => setBio(text)}
        placeholder="Bio"
        multiline={true}
        numberOfLines={3}
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  profilePicturePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicturePlaceholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  input: {
    width: '100%',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 5,
    marginBottom: 20,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#4B0082',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});