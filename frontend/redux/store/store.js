import { createStore } from 'redux';
import {configureStore, getDefaultMiddleware, MiddlewareArray} from '@reduxjs/toolkit';
import rootReducer from "../reducers";
import userReducer from '../slice/userSlice';
import currentUserPostsReducer from '../slice/currentUserPostsSlice';
import currentUserFollowingReducer from '../slice/userFollowingSlice';
import usersReducer from '../slice/usersSlice'
import userFollowingPostsReducer from '../slice/usersPosts'
import getFollowingPostsReducer from '../slice/getFollowingPostsSlice';
import isUserFollowingSlice from '../slice/isUserFollowingSlice';
import otherUsersPostsReducer from '../slice/otherUsersPostsSlice';
import getFollowingUsersInfoSlice from '../slice/usersFollowingInfo';
import getUserLogSlice from '../slice/userLogsSlice';
import doesUserLikePostsSlice from '../slice/doesUserLike'
import getNoSessions from '../slice/getNoSessions';
import doesUserFollowPostsSlice from '../slice/isUserFollowing'

export const store = configureStore({
    reducer: {
        user: userReducer,
        currentUserPosts: currentUserPostsReducer,
        currentUserFollowing: currentUserFollowingReducer, 
        fetchedUser: usersReducer,
        otherUsersPosts: otherUsersPostsReducer,
        followingPosts: userFollowingPostsReducer,
        userFollowingPosts: getFollowingPostsReducer,
        userFollowing: isUserFollowingSlice,
        usersFollowingInfo: getFollowingUsersInfoSlice,
        usersLogInfo: getUserLogSlice,
        userLikePost: doesUserLikePostsSlice,
        Sessions: getNoSessions,
        userFollowingPost: doesUserFollowPostsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})