import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBrR6pwbd6hxzqjtRjOVEAfWuo6KrEuBzs",
    authDomain: "netflix-clone-10e7d.firebaseapp.com",
    projectId: "netflix-clone-10e7d",
    storageBucket: "netflix-clone-10e7d.firebasestorage.app",
    messagingSenderId: "420628482094",
    appId: "1:420628482094:web:34085617cad32b025bf7bf"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async ( name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password) //to create user 
        const user = res.user //took user from res
        await addDoc(collection(db, "user" /* collection name */), {
            uid: user.uid, // values to store in database
            name,
            authProvider: "local",
            email
        }) //adding user to database
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
            toast.error(error.code.split('/')[1].split('-').join(" "))
        }
    }

    const logout = () => {
        signOut(auth)
    }

export { auth, db, signup, login, logout }