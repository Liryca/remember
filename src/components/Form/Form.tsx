import React from 'react';
import './Form.css';
import { Word} from '../../types/dictionaryTypes';
import close from '../ChangeModal/images/close.png';

interface PropsType {
    title: string;
    word: Word;
    show:boolean;
    getResponse: () => void;
    addWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitWord: (e:React.MouseEvent) => void;
}

const Form: React.FC<PropsType> = ({show, title, word, getResponse, submitWord, addWord }) => {
    
    return (
        <div className='wrapper-form' >
            <form className='form'>
             {show&&<img className='img-modal-close' src={close} alt="close"/>}     
                <h2>{title}</h2>
                <input aria-label="eng" className='form-input' value={word.englishVersion} type='text' name='englishVersion' placeholder="English" onChange={addWord}></input>
                <input aria-label="rus" className='form-input' value={word.rusVersion} type='text' name="rusVersion" placeholder="Russian" onChange={addWord}></input>
                <input aria-label="example" className='form-input' value={word.example} type='text' name="example" placeholder="Example" onChange={addWord}></input>

                <div className='dictionaryButtons'>
                    <button className='dictionaryButton' type='button' onClick={submitWord}>Add</button>
                    <button className='dictionaryButton' type='button' onClick={getResponse}>Translate</button>
                </div>
            </form>
        </div>
    );
};


export default Form;