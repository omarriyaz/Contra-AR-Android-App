import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';
import { auth, app } from '../../database/firebase';
import { query, orderBy, doc, getDoc, getFirestore, collection, getDocs, setDoc, deleteDoc, onSnapshot, set, ref} from "firebase/firestore";
import {AntDesign, EvilIcons, FontAwesome, Foundation} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LinearGradient} from 'expo-linear-gradient';
// import { Icon } from 'react-native-gradient-icon';
import GradientText from '../inputs/gradient';
import MaskedView from '@react-native-community/masked-view';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Add from './Add';
// import { fetchUserFollowing } from '../../redux/slice/userFollowingSlice';
// import { fetchUsersData } from '../../redux/slice/usersSlice';
// import { fetchUsersFollowingPosts } from '../../redux/slice/usersPosts';
import { fetchUsersCurrentlyFollowingPosts } from '../../redux/slice/getFollowingPostsSlice';
import { current } from '@reduxjs/toolkit';

function FeedTwo(props, navigation) {
  const [posts, setPosts] = useState([]);
  const [followin, setfoll] = useState([]);
  const [refreshing, setRefresh] = useState(false);
  // const {colors} = useTheme();
  const navigator = useNavigation();
  let bs = React.createRef();
  let fall = new Animated.Value(1);
  let userPosts = []; 
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const userFollowingPosts = useSelector((state) => state.userFollowingPosts.userFollowingPosts)


//   useEffect(() => {
//       const loadPosts = async () => {
//         await dispatch(fetchUsersCurrentlyFollowingPosts()).then(() => {
//                 setPosts(userFollowingPosts);
//                 setRefresh(false);
//               })
//             }
            
//       loadPosts().catch(console.error);
//       console.log(auth.currentUser.uid)
//       console.log(userFollowingPosts)

//   }, [reload,refreshing == true,])

//   const onLikePress = async (userId, postId, currentUserLike) => {
//     const db = getFirestore(app);
//     await setDoc(doc(db, `posts/${userId}/userPosts/${postId}/likes/${auth.currentUser.uid}`), {});
//   } 

//   const onDislikePress = async (userId, postId, currentUserLike) => {
//       const db = getFirestore(app);
//       console.log("Bye")
//       await deleteDoc(doc(db, `posts/${userId}/userPosts/${postId}/likes/${auth.currentUser.uid}`));
//       currentUserLike = false;
//   } 

//   const LikePress = (item) => {
//     return (
//       <TouchableOpacity  style={{
//         width: "9.3%",
//         transform: [{ translateX: 0 }, { translateY: 0 }],
//         backgroundColor: 'white',
//          }} onPress={() => onDislikePress(item.user.uid, item.id)}>
//           <MaskedView
//             style={{ flex: 1, flexDirection: 'row', height: 28 }}
//             maskElement={
              
//                 <MaterialCommunityIcons
//                   name="heart"
//                   size={28}
//                   color="white"
//                   style={styles.shadow}
//                 />
              
//             }>
//             <LinearGradient
//               colors={['#0069CD', '#6002E0']}
//               style={{ flex: 1 }}
//             />
//           </MaskedView>
//           </TouchableOpacity>
//     )
//   }

//   const disLikePress = (item) => {
//     // console.log("the item in dislike",item.currUid, item.id)
//     return (
//       <TouchableOpacity  style={{
//         width: "10.1%",
//     }}  onPress={() => onLikePress(item.currUid, item.id, item.currentUserLike)}>
//           <MaskedView
//             style={{ flex: 1, flexDirection: 'row', height: 28 }}
//             maskElement={
              
//                 <MaterialCommunityIcons
//                   name="heart-outline"
//                   size={28}
//                   color="white"
//                   style={styles.shadow}
//                 />
              
//             }>
//             <LinearGradient
//               colors={['#0069CD', '#6002E0']}
//               style={{ flex: 1 }}
//             />
//           </MaskedView>
//           </TouchableOpacity>
//     )
//   }
  
  const handleRefresh = () => {
    setRefresh(true);
  }

  const renderInner = () => {
    return(
      <View style={{backgroundColor: '#B0B3B8', minHeight: "105%"}}>
        <FlatList numColumns={2} data={[{txt: '        Create A New Scrapbook       ', txtT: '            Edit Your Draft           '}]} renderItem= {({item}) => (
          <View>
              <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigator.navigate("AddTwo")}>
                <MaterialCommunityIcons
                                  name="folder-plus-outline"
                                  size={28}
                                  color="white"
                                  style={{paddingTop: 10, paddingLeft: "10%", paddingRight: 10}}
                                />
                <Text style={{color: 'white', paddingBottom: 15, paddingTop: 15, marginRight: "10%", alignSelf: 'flex-start', borderStyle: 'solid', borderBottomColor: '#B8B8B8', borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, minWidth: "70%"}}>{item.txt}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={28}
                    color="white"
                    style={{paddingTop: 10, paddingLeft: "10%", paddingRight: 10}}
                  />
                  <Text style={{color: 'white', paddingBottom: 15, paddingTop: 15, alignSelf: 'center', borderStyle: 'solid', borderBottomColor: '#B8B8B8', borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0}}>{item.txtT}</Text>
              </TouchableOpacity>

          </View>
        )} />
        
      </View>
  )};
    

  const renderHeader = () => {
    return(
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
        <Text style={{color: 'white', paddingBottom: 10}}>Create Scrapbook</Text>
      </View>
    </View>
  )};

  return (
    <View style={{backgroundColor: "white", flex: 1}}>
    <View style={styles.container}>
      <BottomSheet ref={bs} snapPoints={["30%", 0]} renderContent={renderInner} renderHeader={renderHeader} initialSnap={1} callbackNode={fall} enabledGestureInteraction={true}/>
      <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, minHeight: "6%", justifyContent: 'center', flexDirection: "row"}}>
        
                <Ionicons
                  name="ios-earth-outline"
                  size={34}
                  color="black"
                  style={{justifyContent: 'center', marginLeft: "58%", paddingBottom: "3%"}}
                />
          <TouchableOpacity  style={{
                       marginTop: "1%"
                  }}  
                  onPress={() => bs.current.snapTo(0)}
                  >
                            <MaterialCommunityIcons
                              name="plus-box-outline"
                              size={28}
                              color="black"
                              style={{marginLeft: "50%"}}
                            />
               </TouchableOpacity>
        </View>
        <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, minHeight: "7%", maxHeight: "55%", flexDirection: "row",justifyContent: 'center'}}>
        
        <TouchableOpacity onPress={() => navigator.navigate("FeedTwo")}>
          <Text style={{ marginLeft: "20%",paddingBottom: "0%", marginBottom: "0%", paddingTop: "8%", paddingRight: "5%"}}>Following</Text>
          </TouchableOpacity>
          <Text style={{ paddingBottom: "0%", marginBottom: "0%", paddingTop: "3%", paddingLeft: "0%", marginLeft: "0%", color: "purple"}}>Trending</Text>
      </View>

      <View style={styles.list}>
        <FlatList numColumns={1} horizontal={false} data={userFollowingPosts} refreshing={refreshing} onRefresh={handleRefresh} renderItem={({item}) => (
          <TouchableOpacity style={styles.listItem}>
            <TouchableOpacity onPress={() => navigator.navigate("UsersProfile", {uid: item.currUid})}>
            <View style={styles.listItemHeader}>
                <View style={styles.listItemAuthorAvatarContainer}>
                  {console.log(item)}
                  <Image style={styles.listItemAuthorAvatar} source={{ uri: item.avatar }} />
                </View>
              <Text style={styles.listItemAuthorName}>{item.currName}</Text>
            </View>
            </TouchableOpacity>
      
            <TouchableOpacity onPress={() => {navigator.navigate("ViewExternalPosts", {post: item.downURL,avatar: item.avatar, name: item.currName, uid: item.currUid})}}>
            <View style={styles.listItemBody}>
              <Image style={styles.listItemImage} source={{ uri: item.downURL[0].uri }} />
            </View>
            </TouchableOpacity>
            {/* MaterialCommunityIcons */}
            {/* comment-text-multiple-outline */}
            {/* alert-circle-outline */}
            <View style={styles.listItemFooter}>
              <Foundation
                name="comments"
                size={30}
                color="purple"
                onPress={() => props.navigation.navigate('Comment', {postId: item.id, uid: item.currUid})}
              />
              <EvilIcons
                name="exclamation"
                size={35}
                style={{paddingLeft: 8}}
                color="purple"
              />
            </View>
        </TouchableOpacity>
        )}/>
      </View>
    </View>
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"0%",
    backgroundColor: "white",
  },
  containerHead: {
    flex: 1,
    marginTop:"8%",
    marginLeft:"6%",
    marginRight: "6%",
    marginBottom: "7%"
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1,
    marginTop: "0%",
    marginLeft: "7%",
    marginRight: "7%"
  },
  containerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: "7%",
    paddingTop: "3%"
  },
  containerSmallText: {
    flex: 1,
    fontSize: 12,
    paddingLeft: "7%",
    fontWeight: "500"
  },
  image: {
    flex: 1,
    aspectRatio: 1/1,
    marginTop: "3%",
    marginBottom: "1%",
    marginLeft:"4%",
    padding: 1,
    borderRadius: 23,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: "blue"
  },
  image2: {
    flex: 1,
    borderRadius: 23,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: "blue"
  },
  containerImage: {
    flex: 1,
    marginTop: "5%",
    borderRadius: 30,
    padding:1,
    backgroundColor: "white"
  },
  containerImage2: {
    flex: 1,
    marginTop: "0%",
    borderRadius: 30,
    padding:"0%",
    borderWidth: 0,
    backgroundColor: "white"
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
  panelHeader: {
    alignItems: 'center',
    borderBottomColor: "#B0B3B8",
    borderStyle: 'solid',
    borderBottomWidth: 4,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom:10,
  },
  header: {
    backgroundColor: '#B0B3B8',
    shadowColor: '#B0B3B8',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomColor: '#B8B8B8',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  listItem: {},
  listItemHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8
  },
  listItemAuthorAvatarContainer: {
    alignItems: 'center',
    borderRadius: 48 / 2,
    borderWidth: 2,
    borderColor: 'purple',
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    marginRight: 12,
    width: 48,
  },
  listItemAuthorAvatar: {
    borderRadius: 42 / 2,
    height: 38,
    width: 38,
  },
  listItemAuthorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12
  },
  listItemBody: {
    flex: 1,
    minHeight: 320
  },
  listItemImage: {
    aspectRatio: 1,
    flex: 1,
  },
  list: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 4,
  },
  listItemFooter: {
    padding: 8,
    paddingLeft: 16,
    flexDirection: 'row'
  },

})

export default FeedTwo;
