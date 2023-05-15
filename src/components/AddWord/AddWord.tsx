import './AddWord.css';
import Form from '../Form/Form';
import React, { useContext } from 'react';
import { getTranslatedWord, writeUserWord } from '../../api/api';
import { useState } from 'react';
import { AppContext } from "../../index"
import { useAuthState } from 'react-firebase-hooks/auth';
import Home from '../Home/Home';
import Message from '../Message/Message';

const AddWord: React.FC = () => {

    const context = useContext(AppContext);
    const [user] = useAuthState(context?.auth);
    const [message, setMessage] = useState('');
    const [newWord, setNewWord] = useState({
        englishVersion: "",
        rusVersion: "",
        example: "",
        mark: false,
        date: 0,
    });
  
    async function getResponse() {
        if (newWord.englishVersion) {
            await getTranslatedWord(newWord).then(rusVersion =>
                setNewWord((prev) => ({
                    ...prev,
                    rusVersion: rusVersion.text[0]
                })));
        }
    }


    function addWord(e: React.ChangeEvent<HTMLInputElement>) {
        setNewWord((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            date: Date.now()

        }))
    }

    async function submitWordNewWord() {
        if (newWord.englishVersion === '') {
            return;
        }

        if (user?.uid) {
            await writeUserWord(user.uid, newWord).then(message => message? setMessage(message):'');

        }

        setNewWord({
            englishVersion: '',
            rusVersion: '',
            example: '',
            mark: false,
            date: 0,
        })

        setTimeout(() => setMessage(''), 1500);
    }


    if (!user) {
        return <Home/>
    }

    if(message.length){
        return <Message message={message}/>
    }
    
    return (
        <Form title='Add a new word' show={false} word={newWord} getResponse={getResponse} addWord={addWord} submitWord={submitWordNewWord}/>

    )
}

export default AddWord;


