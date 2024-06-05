// import React from 'react'
// import { View, Text } from 'react-native'

// function MapTwo(props) {
//     console.log(props);
//   return (
//     <View><Text>MapTwo</Text></View>
//   )
// }
// export default MapTwo;
import React,{useEffect,useState} from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Animated, TouchableOpacity,Image ,Platform } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { fetchUsersCurrentlyFollowingPosts } from '../../redux/slice/getFollowingPostsSlice';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
//import { Image } from 'react-native-svg';
// const  Googlemap =()=>{
//   return (
//   <View style={styles.MainContainer}>
//     <MapView
//       style={styles.mapStyle}>
//     </MapView>
//   </View>
//   );
//   }
//   const styles = StyleSheet.create({
//     MainContainer: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems:'center',
//       justifyContent: 'center',
//     },
//     mapStyle: {
//       width:'100%',
//       height: '100%'
//     },
//   });
//   export default Googlemap



//reload,refreshing == true,

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;



let heriotWattlocation = [
  {
    title:"Heriot Watt University",
    location: {
      latitude: 25.102238007918917,
      longitude: 55.16222594305873
    },
    description: "UNIVERSITY"
  }
]



function  Googlemap (){
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  const dispatch = useDispatch();
  const userFollowingPosts = useSelector((state) => state.userFollowingPosts.userFollowingPosts)
  const navigator = useNavigation();
  const [posts, setPosts] = useState([]);
  const onRegionChange = (region) =>{
    console.log(region)
  };

  
  useEffect(() => {
    const loadPosts = async () => {
      await dispatch(fetchUsersCurrentlyFollowingPosts()).then(() => {
              setPosts(userFollowingPosts);
              // setRefresh(false);
            })
      }
    loadPosts().catch(console.error);
    //console.log(auth.currentUser.uid)
    console.log(userFollowingPosts)
  
  }, [userFollowingPosts[0].Latitude == null,] )
  const _map = React.useRef(null);
  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= userFollowingPosts.length) {
        index = userFollowingPosts.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
  
      clearTimeout(regionTimeout);
  
      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const coordinate = {
            latitude : userFollowingPosts[index].Latitude,
            longitude : userFollowingPosts[index].Longitude,
          }
          console.log(coordinate);
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.001685339353883819 ,
              longitudeDelta: 0.0013193115592002869,
            },
            350
          );
        }
      }, 10);
    });
  }, );



  const showLocationsOfBooks = () => {
    // setTimeout(() => {
      //enter code here
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa",userFollowingPosts)
      console.log("hmmmmmmmmm", heriotWattlocation[0].location)
      return userFollowingPosts.map((item, index) =>{
      {console.log(
        {   
          location: {
            latitude: item.Latitude,
            longitude: item.Longitude
          }
        }
      )}
      return(
        <Marker 
          key = {index}
          coordinate = {{
            latitude: item.Latitude,
            longitude: item.Longitude
          }}
          pinColor="purple"
        />
      )
    });
    // return heriotWattlocation.map((item, index)=>{
    //   console.log(item.location)
    //   return (
    //     <Marker
    //       key = {index}
    //       coordinate = {item.location}
    //     />
    //   )
    // })   
    // }, 2000);
    
  };
  //const [state, setState] = React.useState(initialMapState);
  
  const _scrollView = React.useRef(null);
  return (
    <View style={styles.MainContainer}>
      {posts == [] ? (<Text>LOADING</Text>) : (<MapView
        ref = {_map}
        style={styles.mapStyle}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        onRegionChange = {onRegionChange}
        initialRegion={{
          "latitude": 25.102238007918917, 
          "latitudeDelta": 0.001685339353883819, 
          "longitude": 55.16222594305873, 
          "longitudeDelta": 0.0013193115592002869
          }}>
            {showLocationsOfBooks()}
      </MapView>)}
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        {userFollowingPosts.map((item, index) =>(
          <View style={styles.card} key={index}>
            {console.log("urllllll",item.downURL[0].uri)}
            <Image 
              source={{uri: item.downURL[0].uri}}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{item.postTitle}</Text>
              <Text numberOfLines={2} style={styles.cardDescription}>{item.caption}</Text>
              {/* <Text numberOfLines={1} style={styles.cardDescription}>{item.creation}</Text> */}
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {navigator.navigate('MapThreeAR',{images : item.downURL})}}
                  style={[styles.signIn, {
                    borderColor: 'purple',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: 'purple'
                  }]}>View in AR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
  }
  const styles = StyleSheet.create({
    MainContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    mapStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    card: { 
      elevation :10,
      backgroundColor: '#FFF',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginHorizontal: 10,
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: {x: 2, y: -2},
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      overflow: "hidden",
    },
    cardImage: {
      flex: 3,
      width: "100%",
      height: "100%",
      alignSelf: "center",
    },
    textContent: {
      flex: 2,
      padding: 10,
    },
    cardtitle: {
      fontSize: 12,
      fontWeight: "bold",
    },
    marker: {
      width: 30,
      height: 30,
    },
    button: {
      alignItems: 'center',
      marginTop: 5,
    },
    signIn: {
      width: '100%',
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
    },
    textSign: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    scrollView: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: 10,
    },

  });
  export default Googlemap