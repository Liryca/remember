import React,{useContext} from 'react';
import { signOut } from "firebase/auth";
import { AppContext } from '../../index';
import { useAuthState } from 'react-firebase-hooks/auth';

const Logout:React.FC = () => {

    const context = useContext(AppContext)
   
   async function logout() {
       await signOut(context?.auth)
           .then(() => {
            console.log('sucsesfull')
           })
           .catch((error) => {
            console.log(error, 'An error happened')
        });
    }
    return (
            <button className='logout' onClick={logout}>Logout</button>
    );
};

export default Logout;