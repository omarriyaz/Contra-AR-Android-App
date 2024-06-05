import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc, getFirestore } from "firebase/firestore";
import { getDocs, doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, app, db } from "../../database/firebase";
import { fetchUsersData } from "./usersSlice";


const initialState = {
    usersFollowingInfo: {
        usersFollowingInfo: [],
    }
}

export const fetchUsersCurrentlyFollowingInfo = createAsyncThunk(
    'usersFollowingInfo/fetchUsersCurrentlyFollowingInfo',
    async () => {
        // const db = getFirestore(app);
        const q = query(collection(db, `following/${auth.currentUser.uid}/userFollowing`));
        const followingUsers = [];
        const i = 0;
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(function (doc) {
            followingUsers.push(doc.id);
            return followingUsers;
        });

        const usersDetails = [];

        for(let i = 0; i < followingUsers.length; i++){
            const docRef = doc(db, "users", followingUsers[i]);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists){
                // console.log(docSnap.data())
                usersDetails.push(docSnap.data());
                
            }else{
                console.log('does not exist')
            }
        }

        console.log("User Details: ", usersDetails)
        return usersDetails;
    }
)

const getFollowingUsersInfoSlice = createSlice({
    name: 'usersFollowingInfo',
    initialState,
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchUsersCurrentlyFollowingInfo.fulfilled, (state, action) => {
        // Add user to the state array
        state.usersFollowingInfo = action.payload
      })
    },
  })

  export default getFollowingUsersInfoSlice.reducer;