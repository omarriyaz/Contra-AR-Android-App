import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc, getFirestore } from "firebase/firestore";
import { getDocs, doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, app } from "../../database/firebase";
// import { query, orderBy, limit } from "firebase/firestore"; 


const initialState = {
    usersLogInfo: {
        usersLogInfo: [],
    }
}

export const fetchUsersLogInfo = createAsyncThunk(
    'usersLogInfo/fetchUsersLogInfo',
    async () => {
        const db = getFirestore(app);
        const docRef = doc(db, `userLogs/${auth.currentUser.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data()
        } else {
            //doc.data() will be undefined in this case
            console.log("No such document!");
        }
        
          
    }
)

const getUserLogsSlice = createSlice({
    name: 'usersLogInfo',
    initialState,
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchUsersLogInfo.fulfilled, (state, action) => {
        // Add user to the state array
        state.usersLogInfo = action.payload
      })
    },
  })

  export default getUserLogsSlice.reducer;