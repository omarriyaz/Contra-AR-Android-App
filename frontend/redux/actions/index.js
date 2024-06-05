// import { USER_STATE_CHANGE } from '../constants/index'
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'
// import { auth } from '../../database/firebase';
import { app, auth } from '../../database/firebase';
import { query, orderBy, doc, getDoc, getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, CLEAR_DATA, USERS_LIKES_STATE_CHANGE } from '../constants/index';
import { SnapshotViewIOSComponent } from 'react-native'

export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser() {

    return (async (dispatch) => {
        // firebase.firestore()
        //     .collection("users")
        //     .doc(firebase.auth().currentUser.uid)
        //     .get()
        //     .then((snapshot) => {
                const db = getFirestore(app);
                const docRef = doc(db, "users", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists){
                    // console.log(docSnap.data())
                    dispatch({type : USER_STATE_CHANGE, currentUser: docSnap.data()})
                }
                else{
                    console.log('does not exist')
                }
            //     firebase.firestore()
            // .collection("users")
            // .doc(firebase.auth().currentUser.uid)
            // .get()
            // .then((snapshot) => {
            //     if(snapshot.exists){
            //         dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
            //     }
            //     else{
            //         console.log('does not exist')
            //     }
            // })
    })
            // })
    // })
}

export function fetchUserPosts() {

    return (async (dispatch) => {
        // firebase.firestore()
        //     .collection("users")
        //     .doc(firebase.auth().currentUser.uid)
        //     .get()
        //     .then((snapshot) => {
                const db = getFirestore(app);
                // const docRef = doc(collection(db, `posts/${auth.currentUser.uid}/userPosts`));
                const q = query(collection(db, `posts/${auth.currentUser.uid}/userPosts`), orderBy("creation", "asc"));
                const docSnap = await getDocs(q);
            //    console.log("=> ", docSnap)
            //    console.log("================")

                let posts = docSnap.docs.map(doc => {
                    // doc.data() is never undefined for query doc snapshots
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data}
                    // console.log(doc.id, " => ", doc.data());
                  });
                
                // console.log(posts)
                dispatch({type : USER_POSTS_STATE_CHANGE, posts})
                
                // if(docSnap.exists){
                //     console.log(docSnap.docs)
                //     // dispatch({type : USER_STATE_CHANGE, currentUser: docSnap.data()})
                // }
                // else{
                //     console.log('does not exist')
                // }
            //     firebase.firestore()
            // .collection("users")
            // .doc(firebase.auth().currentUser.uid)
            // .get()
            // .then((snapshot) => {
            //     if(snapshot.exists){
            //         dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
            //     }
            //     else{
            //         console.log('does not exist')
            //     }
            // })
    })
}

export function fetchUserFollowing() {

    return (async (dispatch) => {
        // firebase.firestore()
        //     .collection("users")
        //     .doc(firebase.auth().currentUser.uid)
        //     .get()
        //     .then((snapshot) => {
                const db = getFirestore(app);
                // const docRef = doc(collection(db, `posts/${auth.currentUser.uid}/userPosts`));
                const q = collection(db, `following/${auth.currentUser.uid}/userFollowing`);
                onSnapshot(q, (snapshot) => {
                    let following = snapshot.docs.map(doc => {
                        // doc.data() is never undefined for query doc snapshots
                        const id = doc.id;
                        return id
                        // console.log(doc.id, " => ", doc.data());
                      });
                      dispatch({type : USER_FOLLOWING_STATE_CHANGE, following});
                      
                    for(let i = 0; i < following.length; i++){
                        dispatch(fetchUsersData(following[i], true));
                    }
                })

                
                
                // if(docSnap.exists){
                //     console.log(docSnap.docs)
                //     // dispatch({type : USER_STATE_CHANGE, currentUser: docSnap.data()})
                // }
                // else{
                //     console.log('does not exist')
                // }
            //     firebase.firestore()
            // .collection("users")
            // .doc(firebase.auth().currentUser.uid)
            // .get()
            // .then((snapshot) => {
            //     if(snapshot.exists){
            //         dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
            //     }
            //     else{
            //         console.log('does not exist')
            //     }
            // })
    })
}

export function fetchUsersData(uid, getPosts){
    return(async (dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);

        if(!found){
            const db = getFirestore(app);
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists){
                // console.log(docSnap.data())
                let user = docSnap.data();
                user.uid = docSnap.id;
                dispatch({type : USERS_DATA_STATE_CHANGE, user});
            }
            else{
                console.log('does not exist')
            }

            if(getPosts){
                dispatch(fetchUsersFollowingPosts(uid))
            }
                
        }
    })
}

export function fetchUsersFollowingPosts(uid) {
    const uidToFetch = uid;
    return (async (dispatch, getState) => {
        // firebase.firestore()
        //     .collection("users")
        //     .doc(firebase.auth().currentUser.uid)
        //     .get()
        //     .then((snapshot) => {
                const db = getFirestore(app);
                // const docRef = doc(collection(db, `posts/${auth.currentUser.uid}/userPosts`));
                const q = query(collection(db, `posts/${uidToFetch}/userPosts`), orderBy("creation", "asc"));
                // const docSnap = await getDocs(q);
            //    console.log("=> ", docSnap)
            //    console.log("================")
                onSnapshot(q, (docSnap) => {
                // const uid = docSnap.query.EP.path.segments[1];s
                if(docSnap.exists){
                    const uid = docSnap.docs[0].ref.path.split('/')[1];
                }
                
                console.log(uid);
                // console.log("UIDDDD ===>>>>>", {docSnap, uid})
                const user = getState().usersState.users.find(el => el.uid === uid);

                let posts = docSnap.docs.map(doc => {
                    // doc.data() is never undefined for query doc snapshots
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data}
                    // console.log(doc.id, " => ", doc.data());
                });
                

                for(let i=0; i < posts.length; i++) {
                    dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
                }

                // console.log(posts)
                dispatch({type : USERS_POSTS_STATE_CHANGE, posts, uid})
                
            })
                // if(docSnap.exists){
                //     console.log(docSnap.docs)
                //     // dispatch({type : USER_STATE_CHANGE, currentUser: docSnap.data()})
                // }
                // else{
                //     console.log('does not exist')
                // }
            //     firebase.firestore()
            // .collection("users")
            // .doc(firebase.auth().currentUser.uid)
            // .get()
            // .then((snapshot) => {
            //     if(snapshot.exists){
            //         dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
            //     }
            //     else{
            //         console.log('does not exist')
            //     }
            // })
    })
}

export function fetchUsersFollowingLikes(uid, postId) {
    // const uidToFetch = uid;
    const postIdForPrint = postId;
    return (async (dispatch, getState) => {
                const db = getFirestore(app);
                
                const q = doc(db, `posts/${uid}/userPosts/${postId}/likes/${auth.currentUser.uid}`);
                
                onSnapshot(q, (snapshot) => {
                    // const postId = snapshot.ref.path.split('/')[3]
                    // console.log("SnapShot for", postIdForPrint, "=>", )
                    const postId = snapshot._key.path.segments[3];
                    // console.log("Interested in", postId)
                    // const postId = snapshot.ZE.path.segments[3];
                    let currentUserLike = false;
                    if(snapshot._document !== null){
                        currentUserLike = true;
                        console.log("Exists")
                    }
                    dispatch({type : USERS_LIKES_STATE_CHANGE, postId, currentUserLike});
            })
                // const uid = docSnap.query.EP.path.segments[1];
                
    })
}