import { createSlice } from "@reduxjs/toolkit";
import { auth, app } from "../../database/firebase";
import { getFirestore, collection, onSnapshot} from "firebase/firestore";
import { fetchUsersData } from "./usersSlice";
import { connect, useDispatch, useSelector } from 'react-redux'


const initialState = {
  userFollowing: []
};

const isUserFollowingSlice = createSlice({
  name: "userFollowing/isUserFollowingSlice",
  initialState,
  reducers: {
    setUserFollowing: (state, action) => {
      state.userFollowing = action.payload;
    }
  }
});

export const { setUserFollowing } = isUserFollowingSlice.actions;

export const selectUserFollowing = state => state.userFollowing.userFollowing;

export default isUserFollowingSlice.reducer;

export const fetchUserFollowing = () => {
  return () => {
    const db = getFirestore(app);
    // const docRef = doc(collection(db, `posts/${auth.currentUser.uid}/userPosts`));
    const q = collection(db, `following/${auth.currentUser.uid}/userFollowing`);
        onSnapshot(q, (snapshot) => {
            let following = snapshot.docs.map(doc => {
            // doc.data() is never undefined for query doc snapshots
                const id = doc.id;
                // console.log(doc.id, " <===============");
                return id
                        
            });
            
            setUserFollowing(following);
            return following;
        })
}}