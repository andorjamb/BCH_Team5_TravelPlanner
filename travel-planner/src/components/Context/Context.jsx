import React from "react";
import { auth, db } from "../../FireBaseInit";
import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection, onSnapshot, where, query, serverTimestamp
  , doc, setDoc
} from "@firebase/firestore";


const AuthContext = createContext();
const ref = collection(db, 'admin');
const items = [];

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [regUser, setRegUser] = useState([]);
  const [role, setRole] = useState({ "email": regUser[0]?.email, "isAdmin": regUser[0]?.isAdmin })

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
  };

  const logOut = () => {
    signOut(auth)
  }
 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    const q = query(
      ref,
      where('email', '==', `${user.email}`)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {

      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        console.log('this is item,',items);
        setRegUser(items);
        checkUserStatus();
      });
    });

    const checkUserStatus = () => {
      if (regUser.length > 0) {
        setRole({ "email": regUser[0]?.email, "isAdmin": regUser[0]?.isAdmin });
      }
      else {
        regNewUser()
      }
    }

    const regNewUser = async () => {
      const data = {
        email: user.email,
        isAdmin: false,
        dateCreated: serverTimestamp()
      }

      try {
        const dataRef = doc(ref, data);
        await setDoc(dataRef, data);
      } catch (error) {
        console.error(error);
      }
    }
    return () => {
      unsub();
    };

  }, [regUser, user]);


  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user,role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

