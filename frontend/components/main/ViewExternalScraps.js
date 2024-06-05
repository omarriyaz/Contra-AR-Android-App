import { FlatList, View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import {Dimensions} from 'react-native';
import {auth, app} from '../../database/firebase';
import { query, orderBy, doc, getDoc, getFirestore, updateDoc, collection, getDocs, setDoc, deleteDoc, onSnapshot, set, ref, } from "firebase/firestore";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { increment } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLikePosts } from "../../redux/slice/doesUserLike";
import { likePost, dislikePost } from "../../redux/slice/doesUserLike";

export default function ViewExternalScraps(props) {
    console.log("==========================================================================================")
    console.log("Paramsss==>",props.route.params);
    const [like, setLike] = useState(false);
    const [disp, setDisp] = useState(false);
    const [curr, setCurr] = useState(null);
    const dispatch = useDispatch();
    const userLikePosts = useSelector((state) => state.userLikePost.userLikePost)

    useEffect(() => {
        
          dispatch(fetchUserLikePosts({uid: props.route.params.uid, id: props.route.params.postId})).then(() => {
                      // setLike(userLikePosts);
          })
          setCurr(" ");
          
    },[props.route.params.postId,curr==null,])

    useEffect(() => {
      setLike(userLikePosts)
    },[userLikePosts]);

    const goToProfile = (item) => {
        if(item == auth.currentUser.uid){
            props.navigation.navigate("Profile");
        }else{
            props.navigation.navigate("UsersProfile", {uid: item})
            console.log(item)
        }
    }

    const likeThis = async () => {
      if(like == true){
          const db = getFirestore(app);
          console.log("Bye")
          await deleteDoc(doc(db, `posts/${props.route.params.uid}/userPosts/${props.route.params.postId}/likes/${auth.currentUser.uid}`));
          await updateDoc(doc(db,`posts/${props.route.params.uid}/userPosts/${props.route.params.postId}`), {nLikes: increment(-1)})
          console.log("Deleted")
          dispatch(dislikePost())
        } else{
          const db = getFirestore(app);
          await setDoc(doc(db, `posts/${props.route.params.uid}/userPosts/${props.route.params.postId}/likes/${auth.currentUser.uid}`), {});   
          await updateDoc(doc(db,`posts/${props.route.params.uid}/userPosts/${props.route.params.postId}`), {nLikes: increment(1)})
          console.log("Created")
          dispatch(likePost())
      }


      // dispatch(fetchUserLikePosts({uid: props.route.params.uid, id: props.route.params.postId})).then(() => {
      //   setLike(userFollowingPosts)
      // })
      setLike(!like)
    }
    //
    //minHeight:  (Dimensions.get('window').width * item.height)/item.width, maxWidth: Dimensions.get('window').width, minWidth: "100%"
    return(
    <View style={styles.containerGallery}>
        {console.log(props.route.params.post)}
        {/* <TouchableOpacity onPress={() => goToProfile(props.route.params.currUid)}> */}
        <View style={styles.listItemHeader}>
            <TouchableOpacity onPress={() => goToProfile(props.route.params.uid)}>
                <View style={styles.listItemAuthorAvatarContainer}>
                  {console.log(props.route.params)}
                  <Image style={styles.listItemAuthorAvatar} source={{uri: props.route.params.avatar}} />
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToProfile(props.route.params.uid)}>
              <Text style={styles.listItemAuthorName}>{props.route.params.name}</Text>
              </TouchableOpacity>
              <View style={styles.listItemActions}>
              {like ? <Ionicons name="heart" size={28} color="purple" style={{paddingRight: 16}} onPress={() => {likeThis()}} /> : <Ionicons name="heart-outline" size={28} color="black" style={{paddingRight: 16}} onPress={() => {likeThis()}} />}
    
    <AntDesign name="closecircleo" size={22} color="black" style={{marginRight: "10%"}} onPress={() => props.navigation.popToTop()} />
  </View>
        </View>
        {/* </TouchableOpacity> */}
    <FlatList numColumns={1} horizontal={false} data={props.route.params.post} renderItem={({item}) => (
        <Image style={{flex: 1, aspectRatio: 1/1}} source={{uri: item.uri}}/>
    )}/>
    </View>
    )
}

const styles=StyleSheet.create({
    containerGallery: {
        flex: 1,
        backgroundColor: 'white',
    },
    listItem: {},
    listItemHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
      paddingTop: 30
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
    listItemActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    listItemAuthorAvatar: {
      borderRadius: 42 / 2,
      height: 38,
      width: 38,
      marginRight: 0
    },
    listItemAuthorName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: "0%",
      paddingRight: "12%"
    },
})