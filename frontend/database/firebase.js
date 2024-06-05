// database/firebaseDb.js
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBceCiPCGHInKxZqEdWsCU29MNpCJM8JqI",
    authDomain: "contra-5957f.firebaseapp.com",
    projectId: "contra-5957f",
    storageBucket: "contra-5957f.appspot.com",
    messagingSenderId: "194775996290",
    appId: "1:194775996290:web:2333756a22501e4b66e19b",
    measurementId: "G-REDFWTXZVM"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});


