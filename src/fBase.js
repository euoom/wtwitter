// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import {collection, onSnapshot, orderBy, query,} from "firebase/firestore"
import "firebase/compat/storage"
import {ref, uploadString, getDownloadURL} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_API_ID
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
export const authService = firebaseApp.auth()
export const dbService = firebaseApp.firestore()
export {collection, onSnapshot, orderBy, query}
export const storageService = firebaseApp.storage()
export {ref, uploadString, getDownloadURL}
export default firebaseApp
