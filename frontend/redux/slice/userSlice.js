import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc } from "firebase/firestore";
import { auth, app } from "../../database/firebase";

const initialState = {
    user: {
        dateOfBirth: "",
        email: "",
        gender: "",
        mobileNumber: "",
        name: "",
        username: "",
        avatar: "",
    }
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        const db = getFirestore(app);
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists){
            // console.log(docSnap.data())
            return(docSnap.data());
        }
        else{
            console.log('does not exist')
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        // Add user to the state array
        state.user = action.payload
      })
    },
  })

  export default userSlice.reducer;