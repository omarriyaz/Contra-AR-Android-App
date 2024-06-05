import React, {useState} from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { query, where, getFirestore, collection, getDocs } from "firebase/firestore";
import { app, auth } from '../../database/firebase';

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = async (search) => {
        const db = getFirestore(app);
        const q = query(collection(db, `users`), where('name', '>=', search));
        const docSnap = await getDocs(q);
        let users = docSnap.docs.map(doc => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            const id = doc.id;
            return {id, ...data}
            // console.log(doc.id, " => ", doc.data());
        });
        setUsers(users);
    }

    const goToProfile = (item) => {
        if(item.id == auth.currentUser.uid){
            props.navigation.navigate("Profile");
        }else{
            props.navigation.navigate("UsersProfile", {uid: item.id})
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{marginTop: "5%", justifyContent: "flex-start", backgroundColor: 'white', padding: 20}}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Search ..." onChangeText={(search) => fetchUsers(search)}/>
            </View>
            {console.log(users)}
            <FlatList numColumns={1} horizontal={false} data={users} renderItem={({item}) => (
                // change navigation to a different page for these users. <Text>{item.name}</Text>
                <TouchableOpacity onPress={() => goToProfile(item)}>
                    
                <View style={styles.listItemHeader}>
                <View style={styles.listItemAuthorAvatarContainer}>
                  {console.log(item)}
                  <Image style={styles.listItemAuthorAvatar} source={{ uri: item.avatar }} />
                </View>
              <Text style={styles.listItemAuthorName}>{item.name}</Text>
            </View>
            </TouchableOpacity>
            )}/>
        </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
      flex: 1,
      marginTop:"8%",
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
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
      },
  })