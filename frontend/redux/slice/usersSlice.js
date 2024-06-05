import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, app } from "../../database/firebase";

const initialState = {
    fetchedUser: {
        dateOfBirth: "",
        email: "",
        gender: "",
        mobileNumber: "",
        name: "",
        username: "",
        avatar: "",
        uid: "",
    }
}

export const fetchUsersData =  createAsyncThunk(
    'fetchedUser/fetchUsersData',
    async (uid, getState) => {
        // const found = getState().usersState.users.some(el => el.uid === uid);

        // if(!found){
            const db = getFirestore(app);
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists){
                // console.log(docSnap.data())
                let user = docSnap.data();
                user.uid = docSnap.id;
                return user;
            }
            else{
                console.log('does not exist')
            }

        // }
    }
)

export const incrementFoll = createAsyncThunk(
    'fetchedUser/incrementFoll',
    async() => {
        console.log("Hi")
        return 1;
    }
)

export const decrementFoll = createAsyncThunk(
    'fetchedUser/decrementFoll',
    async() => {
        console.log("Hi")
        return -1;
        // console.log("GOMNNNNNNEEEEE" , nFollowers)
        // return state.fetchedUser.nFollowers-1;
    }
)

const usersSlice = createSlice({
    name: 'fetchedUser',
    initialState,
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchUsersData.fulfilled, (state, action) => {
        // Add user to the state array
        state.fetchedUser = action.payload
      })
      .addCase(incrementFoll.fulfilled, (state, action)=>{
        state.fetchedUser.nFollowers += action.payload
      })
      .addCase(decrementFoll.fulfilled, (state, action)=>{
        state.fetchedUser.nFollowers += action.payload
      })
    },
  })

  export default usersSlice.reducer;