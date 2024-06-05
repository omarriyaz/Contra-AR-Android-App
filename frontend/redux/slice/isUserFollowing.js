import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc, collection, query, orderBy } from "firebase/firestore";
import { auth, app } from "../../database/firebase";

const initialState = {
    userFollowingPost: {
        following: false,
    }
} 

export const fetchUserfollowingUser = createAsyncThunk(
    'userFollowingPost/fetchUserfollowingUser',
    async (uid,id,post,help) => {
        const db = getFirestore(app);
        const docRef = doc(db, `following/${auth.currentUser.uid}/userFollowing/${uid.uid}`);
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

export const unfollowUser = createAsyncThunk(
    'userFollowingPost/unfollowUser', () => 
    {
        return false;
    }
)

export const followUser = createAsyncThunk(
    'userFollowingPost/followUser', () => 
    {
        return true;
    }
)

const doesUserFollowPostsSlice = createSlice({
    name: 'userFollowingPost',
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
      builder.addCase(fetchUserfollowingUser.fulfilled, (state, action) => {
        // Add user to the state array
        state.userFollowingPost = action.payload
      })
      .addCase(unfollowUser.fulfilled, (state, action)=> {
        state.userFollowingPost = action.payload
      })
      .addCase(followUser.fulfilled, (state, action)=> {
        state.userFollowingPost = action.payload
      })
    },
  })

//   export const { like, unLike } = doesUserFollowPostsSlice.actions;

  export default doesUserFollowPostsSlice.reducer;