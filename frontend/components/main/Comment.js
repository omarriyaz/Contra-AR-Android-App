import React, { useState, useEffect } from 'react'
import {View, Text, FlatList, Button, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { getFirestore, collection, getDocs, addDoc, getDoc, doc } from "firebase/firestore";
import { app, auth } from '../../database/firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../../redux/actions/index';
import { Ionicons } from '@expo/vector-icons';

function Comment(props) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        function matchUserToComment(comments){
            setComments(comments);
        }

        const loadComments = async () => {
            if(props.route.params.postId !== postId){
                const db = getFirestore(app);
                const docPostSnap = await getDocs(collection(db, `posts/${props.route.params.uid}/userPosts/${props.route.params.postId}/comments`));
                //    console.log("=> ", docSnap)
                //    console.log("================")
                let comments = docPostSnap.docs.map(doc => {
                    // doc.data() is never undefined for query doc snapshots
                    const data = doc.data();
                    const id = doc.id; 
                    console.log(doc.id, " => ", doc.data());
                    return {id, ...data}
                });

                for(let i = 0; i < comments.length; i++){
                    console.log("Comments ---------================", comments[i])
                    const docSnap = await getDoc(doc(db,"users",comments[i].creator))
                    let data;
                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        data = docSnap.data();
                      } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                      }
                      comments[i].avatar = data.avatar;
                }
                matchUserToComment(comments);
                setPostId(props.route.params.postId);
            }else {
                matchUserToComment(comments)
            }
        }
        // console.log(props)
        loadComments().catch(console.error);

    }, [props.route.params.postId,])


    // set the users name and text for comment
    const onCommentSend = async () => {
        const db = getFirestore(app);
        const docRef = doc(db, `users/${auth.currentUser.uid}`);
        const docSnap = await getDoc(docRef);
        const usersDetails = [];
        if (docSnap.exists()) {
            usersDetails.push(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        await addDoc(collection(db, `posts/${props.route.params.uid}/userPosts/${props.route.params.postId}/comments`), {
            creator: auth.currentUser.uid,
            name: usersDetails[0].name,
            text: comment
        });
    }

    return (
    //     <View style={styles.container}>
    //     <Text style={styles.title}>Comments</Text>
    //     <ScrollView style={styles.comments}>
    //       {comments.map((comment, index) => (
    //         <View key={index} style={styles.comment}>
    //           <Text>{comment.text}</Text>
    //         </View>
    //       ))}
    //     </ScrollView>
    //     
    //   </View>
        // <View>
        //     <View style={{backgroundColor: 'white'}}>
        //         <TextInput style={{paddingTop:5, color: 'purple'}} placeholder='Comment ...' onChangeText={(text) => setText(text)}/>
        //         <Button onPress={() => onCommentSend()} title="Send"/>
        //     </View>
        //     <FlatList numColumns={1} horizontal={false} data={comments} renderItem={({item}) => (
        //         <View style={{backgroundColor: 'white'}}>
        //             <View style={styles.listItemHeader}>
        //                 <View style={styles.listItemAuthorAvatarContainer}>
        //                     {console.log(item)}
        //                     <Image style={styles.listItemAuthorAvatar} source={{ uri: item.avatar }} />
        //                 </View>
        //             <Text style={styles.listItemAuthorName}>{item.name}</Text>
        //         </View>
        //             <Text style={{paddingLeft: "20%"}}>{item.text}</Text>
        //         </View>
        //     )}/>

        // <FlatList numColumns={1} horizontal={false} data={comments} renderItem={({item}) => (
            <View style={styles.bigContainer}>
            <ScrollView style={styles.comments}>
           {comments.map((comment, index) => (
        <View style={styles.container}>
            <Image source={{ uri: comment.avatar }} style={styles.profilePicture} />
                <View style={styles.commentBox}>
                    <Text style={styles.username}>{comment.name}</Text>
                    <Text>{comment.text}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => {setComment("@"+comment.name)}}>
                        <Text style={styles.replyText}>Reply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
        ))}
         </ScrollView>
         <View style={{paddingLeft:20, paddingRight:20}}>
        <View style={styles.inputContainer}>
        <TextInput
         style={styles.input}
         placeholder="Add a comment..."
         value={comment}
         onChangeText={(text) => setComment(text)}
       />
       <TouchableOpacity style={styles.button} onPress={onCommentSend}>
         <Text style={styles.buttonText}>Post</Text>
       </TouchableOpacity>
     </View>
     </View>
        </View>
    )
}

export default Comment;

const styles=StyleSheet.create({
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
      bigContainer: {
        flex: 1,
        backgroundColor: '#fff',
      },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        backgroundColor: '#fff',
      },
      profilePicture: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 10,
      },
      commentBox: {
        flex: 1,
        flexDirection: 'column',
      },
      username: {
        fontWeight: 'bold',
        marginRight: 5,
      },
      actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
      },
      replyText: {
        color: 'grey',
        marginLeft: 5,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      comments: {
        flex: 1,
        marginBottom: 20,
      },
      comment: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      input: {
        flex: 1,
        height: 40,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
      },
      button: {
        backgroundColor: 'purple',
        borderRadius: 5,
        padding: 10,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
})