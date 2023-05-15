import React, { useContext } from 'react';
import './DeleteModal.css';
import { Dictionary } from '../../types/dictionaryTypes';
import { deleteWordOnDataBase } from '../../api/api';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppContext } from '../..';


interface PropsType {
    words: Dictionary;
    setWords: (x:any) => void;
    index: number;
    setIndex: (x: number) => void
    show: boolean;
    setShow: (x: boolean) => void;
    closeModal: (x: React.MouseEvent) => void;
}


const DeleteModal: React.FC<PropsType>= ({ words, setWords,  index, setIndex, show, setShow, closeModal}) => {
    
    const context = useContext(AppContext);
    const [user] = useAuthState(context?.auth);
    
   async function deleteCard(e: React.MouseEvent) {
        e.stopPropagation();
     
        setWords((prev: Dictionary) => prev.filter(i => i[0] !== words[index][0]));
        if (words[index] === words[words.length - 1]) {
            setIndex(0);
        }
        setShow(false);
      await deleteWordOnDataBase(words[index][0], user?.uid).then(i => console.log(i)); 
    }

    return (
        <div className='delete-modal'>
        <div className='wrapper-delete-modal' >
                <div className= {show? 'delete-modal-background active':"delete-modal-background"}>
                    <div className={show?'delete-modal-card active':'delete-modal-card'} onClick={closeModal}>
                    <h2>You want to delete the card?</h2>
                    <button className='delete-modal-button' onClick={deleteCard}>Yes</button>
                    <button className='delete-modal-button' onClick={closeModal}>No</button>
                    </div>
            </div>
        </div>
    </div>
    );
};

export default DeleteModal;