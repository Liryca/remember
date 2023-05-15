import './ChangeModal.css';
import React, { useContext, useState } from 'react';
import Form from '../Form/Form';

import { Dictionary } from '../../types/dictionaryTypes';
import { getTranslatedWord, changeWordinDataBase} from '../../api/api';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppContext } from '../..';
import Message from '../Message/Message';


interface PropsType {
    words: Dictionary;
    setWords: (x: any) => void;
    index: number;
    show: boolean;
    closeModal: (x: React.MouseEvent) => void;
     showChangeModal: (x:boolean) => void;

}

const ChangeModal: React.FC<PropsType> = ({ words, setWords, index, show, closeModal,showChangeModal }) => {

    const [message, setMessage] = useState('');
    const context = useContext(AppContext);
    const [user] = useAuthState(context?.auth);

    async function getResponse() {

        if (words[index][1].englishVersion) {
            await getTranslatedWord(words[index][1]).then(rusVersion =>
                setWords((prev: Dictionary) => {
                    return prev.map((w) => {
                        if (w[0] === words[index][0]) {
                            return [
                                w[0],
                                { ...w[1], rusVersion: rusVersion.text[0]}
                            ]
                        } else {
                            return w;
                        }
                    })
                }
                ));
        }
    }

    async function addWord(e: React.ChangeEvent<HTMLInputElement>) {

        setWords((prev: Dictionary) => {
            return prev.map((w) => {
                if (w[0] === words[index][0]) {
                    return [
                        w[0],
                        { ...w[1], [e.target.name]: e.target.value}
                    ]
                }
                else {
                    return w;
                }

            })
        })
    }


    async function submitWord(e:React.MouseEvent) {
        await changeWordinDataBase(words[index], user?.uid).then(result => result? setMessage(result):'');
    showChangeModal(false)
        setTimeout(() => setMessage(''), 1500);
    }
    if(message.length){
        return <Message message={message}/>
    }

    return (
        <div className='modal' onClick={closeModal} >
            <div className='wrapper'   >
                <div className={show?"modal-background active":"modal-background"}  >
                    <Form title='Change a word'show={show} word={words[index][1]} addWord={addWord} getResponse={getResponse} submitWord={submitWord} />
                </div>
            </div>
        </div>

    );
};


export default ChangeModal;