import React, { useEffect } from 'react';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, app } from '../../database/firebase';
import { getFirestore, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { doc, updateDoc, increment } from "firebase/firestore";
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../redux/slice/userSlice';
import { signOut } from 'firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const MyProfileHeader = (props) => {
  // const { profile } = props;
  const [currAvatar, setAvatar] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.user);
  const navigator = useNavigation();
  const db = getFirestore(app);
  console.log(props)

  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
};


  useEffect(() => {
    const checkGalleryPerms = async () => {
      try {
        const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
      } catch (error) {
        
      }
    }

    // setAvatar(() => profile.avatar);

    checkGalleryPerms().catch(console.error);
    dispatch(fetchUser()).then(() => {setAvatar(profile.avatar)});
    //

  },[currAvatar,props.profile.avatar != currAvatar,])

  if(hasGalleryPermission === false){
    Alert.alert("Gallery permissions are required to change profile picture")
  }

  if (!profile.avatar) {
    return <></>;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // we can change the line below to also accept videos or GIFS etc
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    
    console.log(result);

    if (!result.canceled) {
      // setAvatar(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const onLogOut = async () => {
    await updateDoc(doc(db, `Sessions/${auth.currentUser.uid}`),{Open: increment(-1)})
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  }

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
            console.log('File available at', downloadURL);
            savePostData(downloadURL);
        });
    }
    );

  }

  const savePostData = async (downURL) => {
    const db = getFirestore(app);
    await updateDoc(doc(db, `users/${auth.currentUser.uid}`), {avatar: downURL});
    setAvatar(downURL);
    // addDoc(collection(db, "posts/userPosts"),{downURL, caption, creation: serverTimestamp()})
  }

  return (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => pickImage()}>
      <View style={styles.headerImageContainer}>
        {currAvatar && <Image style={styles.headerImage} source={{ uri: currAvatar }} />}
      </View>
      </TouchableOpacity>
      <View style={styles.headerRight}>
        <View style={styles.headerInfoContainer}>
          <View style={styles.headerNumberOfPostsContainer}>
            <Text style={[styles.headerLabel, styles.headerLabelBold]}>{profile.nPosts ? profile.nPosts : 0}</Text>
            <Text style={styles.headerLabel}>Posts</Text>
          </View>
          <View style={styles.headerNumberOfFollowersContainer}>
            <Text style={[styles.headerLabel, styles.headerLabelBold]}>{profile.nFollowers ? profile.nFollowers : 0}</Text>
            <Text style={styles.headerLabel}>Followers</Text>
          </View>
          <View style={styles.headerNumberOfFollowingContainer}>

          </View>
        </View>
        <Text> </Text>
        <Text> </Text>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.followBtn} onPress={() => onLogOut()}>
            <Text style={styles.followTxt}>Log out</Text>
        </TouchableOpacity>
        <MaterialCommunityIcons
                name="cog-outline"
                size={30}
                style={{paddingLeft: 8, marginTop: 4}}
                color="purple"
                onPress={() => {navigator.navigate("SettingsPage")}}
              />
        {/* Add icon for settings above */}
        </View>
        
        <Text> </Text>
        {/* {!isFollowHidden && <TouchableOpacity style={styles.followBtn} onPress={toggleFollow}>
          <Text style={styles.followTxt}>{hasFollowed ? 'Followed' : 'Follow'}</Text>
        </TouchableOpacity>} */}
      </View>
    </View>
    
    //<Text></Text>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    maxHeight: "30%"
  },
  headerImageContainer: { 
    width: 96,
    height: 96,
    borderRadius: 96/2,
    borderWidth: 2,
    borderColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerImage: {
    width: 86,
    height: 86,
    borderRadius: 86 / 2
  },
  headerRight: {
    flex: 1,
    flexDirection: 'column',
  },
  headerInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 12
  },
  headerNumberOfPostsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 19.5
  },
  headerNumberOfFollowersContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  headerNumberOfFollowingContainer: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 16,
    paddingRight: "4%",
  },
  headerLabelBold: {
    fontWeight: 'bold',
    // marginTop: "25%",
  },
  followBtn: {
    // backgroundColor: '#3B82F6',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 22,
    paddingVertical: 8,
    width: 128,
  },
  followTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default MyProfileHeader;