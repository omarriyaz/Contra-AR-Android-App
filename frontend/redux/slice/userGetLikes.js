import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc, getFirestore } from "firebase/firestore";
import { getDocs, doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, app } from "../../database/firebase";
import { fetchUsersData } from "./usersSlice";


const initialState = {
    likes: {
        likes: [],
    }
}

const getCurrLike = async (uid, id) => {
    
    
}

export const fetchUsersLikes = createAsyncThunk(
    'likes/fetchUserLikes',
    async (uid, posts, postId) => {
        const db = getFirestore(app);
        const ref = doc(db, `posts/${uid}/userPosts/${postId}/likes/${auth.currentUser.uid}`);
        const docRef = await getDoc(ref);
        console.log("CURRERRRRREEEEENNNNNNTTTTTOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
        let currentUserLike = false
        if(!docRef.exists()){
            console.log("Truuuuuu")
            currentUserLike = true;
        }
        
        // let postWithLikes = 
    }
)

const userGetLikesSlice = createSlice({
    name: 'likes',
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