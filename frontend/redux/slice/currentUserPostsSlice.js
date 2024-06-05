import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore } from "firebase/firestore";
import { getDocs, doc, collection, query, orderBy } from "firebase/firestore";
import { auth, app } from "../../database/firebase";

const initialState = {
    currentUserPosts: {
        posts: [],
    }
}

export const fetchUserPosts = createAsyncThunk(
    'currentUserPosts/fetchUserPosts',
    async () => {
        const db = getFirestore(app);
        const q = query(collection(db, `posts/${auth.currentUser.uid}/userPosts`), orderBy("creation", "asc"));
        const docSnap = await getDocs(q);

        let posts = docSnap.docs.map(doc => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            const id = doc.id;
            return {id, ...data}
            // console.log(doc.id, " => ", doc.data());
        });

        return posts;
    }
)

const currentUserPostsSlice = createSlice({
    name: 'currentUserPosts',
    initialState,
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
        // Add user to the state array
        state.currentUserPosts = action.payload
      })
    },
  })

  export default currentUserPostsSlice.reducer;