import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc, collection, query, orderBy } from "firebase/firestore";
import { auth, app } from "../../database/firebase";

const initialState = {
    userLikePost: {
        following: false,
    }
} 

export const fetchUserLikePosts = createAsyncThunk(
    'userLikePost/fetchUserLikePosts',
    async (uid,id,post,help) => {
        const db = getFirestore(app);
        const docRef = doc(db, `posts/${uid.uid}/userPosts/${uid.id}/likes/${auth.currentUser.uid}`);
        const docSnap = await getDoc(docRef);
        console.log(uid);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return true;
        } else {
        // doc.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }
    } 
)

export const likePost = createAsyncThunk(
    'userLikePost/likePost', () => 
    {
        return true;
    }
)

export const dislikePost = createAsyncThunk(
    'userLikePost/dislikePost', () => 
    {
        return false;
    }
)

const doesUserLikePostsSlice = createSlice({
    name: 'userLikePost',
    initialState,
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
    //   like: (state) => {
    //     state.userLikePost.following = true;
    //   },
    //   unLike: (state) => {
    //     state.userLikePost.following = false;
    //   }
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchUserLikePosts.fulfilled, (state, action) => {
        // Add user to the state array
        state.userLikePost = action.payload
      })
      .addCase(likePost.fulfilled, (state, action)=> {
        state.userLikePost = action.payload
      })
      .addCase(dislikePost.fulfilled, (state, action)=> {
        state.userLikePost = action.payload
      })
    },
  })

  export const { like, unLike } = doesUserLikePostsSlice.actions;

  export default doesUserLikePostsSlice.reducer;