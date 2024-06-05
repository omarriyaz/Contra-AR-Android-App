import React, { useEffect } from 'react';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, app } from '../../database/firebase';
import { getFirestore, serverTimestamp, collection, addDoc, onSnapshot, deleteDoc, setDoc, increment } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { connect, useDispatch, useSelector } from 'react-redux'
// import { fetchUser } from '../../redux/slice/userSlice';
import { AntDesign } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { fetchUsersData, incrementFoll, decrementFoll } from '../../redux/slice/usersSlice';
// import {selectUserFollowing} from '../../redux/slice/isUserFollowingSlice';
import { fetchUserFollowing } from '../../redux/slice/isUserFollowingSlice';
import { fetchUserfollowingUser, followUser, unfollowUser } from '../../redux/slice/isUserFollowing';


const AProfileHeader = (props) => {
  // const { profile } = props;
  const [currAvatar, setAvatar] = useState(null);
  const [following, setFollowing] = useState(false);
  const [isFollowHidden, setFollow] = useState(false);
  const [initFollowCheck, setFollCheck] = useState(props.initialCheck);
  const [currUid, setUID] = useState("");
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.fetchedUser.fetchedUser);
  const userIsFollowing = useSelector((state) => state.userFollowingPost.userFollowingPost)
  const [userFollowing, setUserFollowing] = useState([])
  console.log("The Props==================================>>>>>>>>>>",props);

  useEffect(() => {
    
    dispatch(fetchUsersData(props.profile.uid)).then(() => {setAvatar(profile.avatar)});
    dispatch(fetchUserfollowingUser())
    setUID(props.profile.uid)
      // console.log("User IS Following", userFollowing);
    
  },[props.profile.uid, auth.currentUser.uid])

  // useEffect(() => {
    
  // },[props.profile.uid,props.initFollowCheck==false,])

  if (!profile.avatar) {
    return <></>;
  }

  const onFollow = async () => {
    const db = getFirestore(app);
    const docRef = doc(db, `following/${auth.currentUser.uid}/userFollowing/${props.profile.uid}`);
    await updateDoc(doc(db,`users/${props.profile.uid}`), {nFollowers: increment(1)})
    setDoc(docRef, {});
    dispatch(followUser())
    dispatch(incrementFoll())
  }

  const onUnfollow = async () => {
    const db = getFirestore(app);
    const docRef = doc(db, `following/${auth.currentUser.uid}/userFollowing/${props.profile.uid}`);
    await updateDoc(doc(db,`users/${props.profile.uid}`), {nFollowers: increment(-1)})
    await deleteDoc(docRef);
    console.log("unfollowed")
    dispatch(unfollowUser())
    dispatch(decrementFoll())
  }

  return (
    
    <View style={styles.headerContainer}>
        
      <View style={styles.headerImageContainer}>
        {currAvatar && <Image style={styles.headerImage} source={{ uri: currAvatar }} />}
      </View>
      
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
        {userIsFollowing ? (
        <TouchableOpacity style={styles.followBtn} onPress={() => onUnfollow()}>
            <Text style={styles.followTxt}>Following</Text>
        </TouchableOpacity>):(
          <TouchableOpacity style={styles.followBtn} onPress={() => onFollow()}>
            <Text style={styles.followTxt}>Follow</Text>
          </TouchableOpacity>
        )}
        </View>
        
        <Text> </Text>
      </View>
    </View>
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
    alignItems: 'center'
  },
  headerNumberOfFollowersContainer: {
    flex: 1,
    alignItems: 'center'
  },
  headerNumberOfFollowingContainer: {
    flex: 1
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
    // borderColor: 'purple',
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderRadius: 4,
    marginLeft: 32,
    paddingVertical: 8,
    width: 128,
  },
  followTxt: {
    color: 'purple',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default AProfileHeader;