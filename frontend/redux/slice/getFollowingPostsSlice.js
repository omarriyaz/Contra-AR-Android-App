import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc, getFirestore } from "firebase/firestore";
import { getDocs, doc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, app, db } from "../../database/firebase";
import { fetchUsersData } from "./usersSlice";


const initialState = {
    userFollowingPosts: {
        userFollowingPosts: [],
    }
}

export const fetchUsersCurrentlyFollowingPosts = createAsyncThunk(
    'userFollowingPosts/fetchUsersCurrentlyFollowingPosts',
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
        console.log(i)
        console.log("Users : " , followingUsers)
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


        const usersPosts = [];
        for(let i = 0; i < usersDetails.length; i++){
            const q = query(collection(db, `posts/${usersDetails[i].uid}/userPosts`));
            const currUid = usersDetails[i].uid;
            const currName = usersDetails[i].name;
            const avatar = usersDetails[i].avatar;
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                let id = doc.id;
                let data = doc.data();
                usersPosts.push({currUid, currName, avatar, id, ...data});
                return usersPosts;
            });
        }
        // if works add current user likes here

        // const currUserWithLikesPosts = [];
        // for(let i = 0; i < usersPosts.length; i++){
        //     console.log("currUser:", usersPosts[i].currUid)
        //     const q = doc(db, `posts/${usersPosts[i].currUid}/userPosts/${usersPosts[i].id}/likes/${auth.currentUser.uid}`);
        //     const likeDocSnap = await getDoc(q);
        //     const caption =  usersPosts[i].caption;
        //     const creation = usersPosts[i].creation;
        //     const currName = usersPosts[i].currName;
        //     const currUid = usersPosts[i].currUid;
        //     const avatar = usersPosts[i].avatar;
        //     const downURL = usersPosts[i].downURL;
        //     const id = usersPosts[i].id;
        //     let currentUserLike = false;
        //     if(likeDocSnap.exists() === true) {
        //         console.log(likeDocSnap.data())
        //         currentUserLike = true;
        //         console.log(currentUserLike);            
        //     }    
        //     console.log("Like For Post =========>" , currentUserLike);
        //     currUserWithLikesPosts.push({currentUserLike,caption,avatar,creation,currName,currUid,downURL,id})
        // }

        console.log("All the users posts: ", usersPosts[0].downURL[0].uri)
        // console.log("All posts with like: ", currUserWithLikesPosts )
        return usersPosts;
    }
)

const getFollowingPostsSlice = createSlice({
    name: 'userFollowingPosts',
    initialState,
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchUsersCurrentlyFollowingPosts.fulfilled, (state, action) => {
        // Add user to the state array
        state.userFollowingPosts = action.payload
      })
    },
  })

  export default getFollowingPostsSlice.reducer;