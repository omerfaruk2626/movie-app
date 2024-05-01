import React, { createContext, useState, useContext } from 'react'
import { auth } from '../auth/fireBase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify';

const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext);
};
;

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(false)
    const navigate = useNavigate()
    const creatUser = async (email, password) => {

        try {
            const userCredential = await
                createUserWithEmailAndPassword(auth, email, password)
            navigate('/login')
            toastSuccessNotify('User created successfully')
        }

        catch (error) {
            toastErrorNotify(error.message)
        }
    }
    const signIn = async (email, password) => {

        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
            toastSuccessNotify('Login successfully')
        }

        catch (error) {
            toastErrorNotify(error.message)
        }
    }

    const logOut = () => {
        signOut(auth).then(() => {
            toastSuccessNotify('Logout successfully')
        })
            .catch((error) => {
                toastErrorNotify(error.message)
            })
    }
    
    const values = { currentUser, creatUser, signIn, logOut }
    return (
        <AuthContext.Provider value={values} >{children}</AuthContext.Provider>
    )
}

export default AuthProvider