import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { auth, app } from '../../database/firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { query, orderBy, doc, getDoc, getFirestore, collection, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { fetchUser } from '../../redux/slice/userSlice';
import { fetchUserPosts } from '../../redux/slice/currentUserPostsSlice';
import MyProfileHeader from '../inputs/myProfileHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LinearGradient} from 'expo-linear-gradient';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
// import { Icon } from 'react-native-gradient-icon';
// import GradientText from '../inputs/gradient';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-community/masked-view';

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { currentUser, posts } = props;
  const [following, setFollowing] = useState(false);
  const [curr, setCurr] = useState(null);
  const [refreshing, setRefresh] = useState(false);
  const navigator = useNavigation();
  let bs = React.createRef();
  let fall = new Animated.Value(1);
  const theCurrentUser = useSelector((state) => state.user.user);
  const currentUserPosts = useSelector((state) => state.currentUserPosts.currentUserPosts)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser()).then(() => setCurr(theCurrentUser));
    dispatch(fetchUserPosts()).then(() => setRefresh(false));
  }, [refreshing == true,])

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
    
  const handleRefresh = () => {
    setRefresh(true);
  }

  const renderHeader = () => {
    return(
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
        <Text style={{color: 'white', paddingBottom: 10}}>Create Scrapbook</Text>
      </View>
    </View>
  )};

  const onLogOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  }

  if(theCurrentUser === null){
    return <View>You seem to have ran into troubles please check your internet or it could be from our side.</View>
  }

  return (
    <View style={{backgroundColor: "white", flex: 1}}>
    <View style={styles.container}>
      {/* <BottomSheet ref={bs} snapPoints={["30%", 0]} renderContent={renderInner} renderHeader={renderHeader} initialSnap={1} callbackNode={fall} enabledGestureInteraction={true}/> */}

      <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, minHeight: "7%", maxHeight: "45%", flexDirection: "row",justifyContent: 'center'}}>
                <Ionicons
                  name="ios-earth-outline"
                  size={34}
                  color="black"
                  style={{justifyContent: 'center', marginLeft: "58%", paddingBottom: "0%"}}
                />
          <TouchableOpacity  style={{
                       marginTop: "1%"
                  }}  
                  onPress={() => navigator.navigate("AddTwo")}
                  >
                            <MaterialCommunityIcons
                              name="plus-box-outline"
                              size={28}
                              color="black"
                              style={{marginLeft: "50%"}}
                            />
               </TouchableOpacity>
        </View>
          <MyProfileHeader profile={theCurrentUser}/>
          <MaterialCommunityIcons
            name="grid"
            size={28}
            color="purple"
            style={{alignSelf: 'center', borderBottomWidth: 1}}
          />

      <View style={styles.containerGallery}>
        <FlatList numColumns={3} horizontal={false} data={currentUserPosts} refreshing={refreshing} onRefresh={handleRefresh} renderItem={({item}) => (
          <TouchableOpacity style={styles.containerImage} onPress={() => {navigator.navigate("ViewLocalPosts", {post: item})}}>
            <Image style={styles.image} source={{uri: item.downURL[0].uri}}/>
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
    marginTop: "7%"
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1,
    paddingTop: 10
  },
  image: {
    flex: 1,
    aspectRatio: 1/1
  },
  containerImage: {
    flex: 1/3,
    borderColor: "purple",
    borderWidth: 2
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
})

export default Profile;