import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDkd6LWLqjvRyii55D1tfu9-jGq-mXr5E0",
  authDomain: "my-personal-project-fb78d.firebaseapp.com",
  projectId: "my-personal-project-fb78d",
  storageBucket: "my-personal-project-fb78d.firebasestorage.app",
  messagingSenderId: "796004564104",
  appId: "1:796004564104:web:e130d2395fd3f2e05ef33d",
  measurementId: "G-469TX2DV7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}