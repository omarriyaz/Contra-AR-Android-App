import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore } from "firebase/firestore";
import { getDocs, doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, app } from "../../database/firebase";

const initialState = {
    currentUserFollowing: {
        following: [""],
    }
}

export const fetchUserFollowing = createAsyncThunk(
    'currentUserFollowing/fetchUserFollowing',
    async () => {
        const db = getFirestore(app);
        // const docRef = doc(collection(db, `posts/${auth.currentUser.uid}/userPosts`));
        const q = collection(db, `following/${auth.currentUser.uid}/userFollowing`);
        // let following = [];

        const docSnap = await getDocs(q);
        // docSnap.forEach((doc) => following.push(doc.id))
        let following = docSnap.docs.map(doc => {
            // doc.data() is never undefined for query doc snapshots
            const id = doc.id;
            return {id}
            // console.log(doc.id, " => ", doc.data());
        });
        return following;
        // onSnapshot(q, (snapshot) => {
        //     following = snapshot.docs.map(doc => {
        //         // doc.data() is never undefined for query doc snapshots
        //     const id = doc.id;
        //     return id
        //         // console.log(doc.id, " => ", doc.data());
        // })
                
            
        //     console.log(following);
        //     return following;
        //     // for(let i = 0; i < following.length; i++){
        //     //     dispatch(fetchUsersData(following[i], true));
        //     // }
            
        // })
        
    }
)

const userFollowingSlice = createSlice({
    name: 'currentUserFollowing',
    initialState,
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchUserFollowing.fulfilled, (state, action) => {
        // Add user to the state array
        state.currentUserFollowing = action.payload
      })
    },
  })

  export default userFollowingSlice.reducer;