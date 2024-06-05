import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc, getFirestore } from "firebase/firestore";
import { getDocs, doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, app } from "../../database/firebase";
import { fetchUsersData } from "./usersSlice";


const initialState = {
    followingPosts: {
        followingPosts: [],
    }
}

const getCurrLike = async (uid, id) => {
    const db = getFirestore(app);
    const ref = doc(db, `posts/${uid}/userPosts/${id}/likes/${auth.currentUser.uid}`);
    const docRef = await getDoc(ref);
    console.log("CURRERRRRREEEEENNNNNNTTTTTOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    let currentUserLike = false
    if(!docRef.exists()){
        console.log("Truuuuuu")
        currentUserLike = true;
    }

    return currentUserLike;
    
}

export const fetchUsersFollowingPosts = createAsyncThunk(
    'followingPosts/fetchUserFollowingPosts',
    async (uid, userName) => {
            // let uidToFetch = uid;
            const db = getFirestore(app);
            // const docRef = doc(collection(db, `posts/${auth.currentUser.uid}/userPosts`));
            const q = query(collection(db, `posts/${uid}/userPosts`), orderBy("creation", "asc"));
            // const user = getState().usersState.users.find(el => el.uid === uid);
            // dispatch(fetchUsersData(uid))
            const u = doc(db, `users/${uid}`);
            const docSnap = await getDocs(q);
            const name = await getDoc(u);
            if(!docSnap.exists){
                console.log("UID", uid);
                let posts = docSnap.docs.map( doc => {
                    const data = doc.data();
                    console.log(data)
                    const id = doc.id;
                    const more = name.data();
                    const currentUserLike = getCurrLike(uid, id);
                    console.log(currentUserLike, id, more, uid, data);
                    // do{
                    //     console.log(currentUserLike);
                    //     console.log(id)
                    // }while((currentUserLike !== false && currentUserLike !== true) && (id !== null || id !== undefined))
                    // IDEA 3 make a new slice which grabs this data and combines user slice with it. Hold it as a array
                    return {id, ...data, ...more, userName, uid}
                });
                console.log("post Liked", posts)
                console.log(posts.length)
                return posts;
            }else{
                console.log("hi")
            }

                // for(let i=0; i < posts.length; i++) {
                //     dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
                // }

                // console.log(posts)
                // dispatch({type : USERS_POSTS_STATE_CHANGE, posts, uid})
        // })
    }
)

const userFollowingPostsSlice = createSlice({
    name: 'followingPosts',
    initialState,
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchUsersFollowingPosts.fulfilled, (state, action) => {
        // Add user to the state array
        state.followingPosts = action.payload
      })
    },
  })

  export default userFollowingPostsSlice.reducer;