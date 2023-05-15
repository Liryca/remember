import './Login.css';
import React, { useContext } from 'react';
import { AppContext } from '../../index';
import { signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { writeUserData, getUserData } from '../../api/api';
import { provider } from '../../index';

const Login:React.FC = () => {

    const context = useContext(AppContext);

    async function login() {
       await signInWithPopup(context?.auth, provider)
            .then(async (result) => {
                GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                if (!(await getUserData(user.uid)).exists()) {
                    writeUserData(user.uid, user.displayName, user.email)
                }
            })
            .catch((error) => {
                GoogleAuthProvider.credentialFromError(error);
                
            });   
    }
    return (
            <button className='login__button' onClick={login}>Login with google</button>
    );
};

export default Login;