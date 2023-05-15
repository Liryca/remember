import React, { useContext } from 'react';
import up from '../Mark/images/up.svg';
import down from '../Mark/images/down.svg';
import { Dictionary } from '../../types/dictionaryTypes';
import { changeWordinDataBase } from '../../api/api';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppContext } from '../..';

interface PropsType {
    words: Dictionary;
    setWords: (x: any) => void;
    index: number;
}

const Mark: React.FC<PropsType> = ({ words, setWords, index }) => {

    const context = useContext(AppContext);
    const [user] = useAuthState(context?.auth);

    async function markWord() {
        const result =  new Promise((resolve, reject) => {
            setWords((prev: Dictionary) => {
                return [...prev.map(i => {
                    if (i[0] === words[index][0]) {
                        i[1].mark = !words[index][1].mark
                        return i
                    }
                    return i
                })]

            })
            resolve(words);

        });

        result.then((value:any) => {
            const word = value[index];
            changeWordinDataBase(word, user?.uid);

        })
    }

    return (
        <div className='mark'>
            {!words[index][1].mark ?
                <div className='status-false' onClick={markWord}>
                    <p>Don't show again</p>
                    <p>know</p>
                    <div className='wrapp-arrow'> <img className='upArrow' src={up} alt='up' /></div>
                   
                </div> :
                <div className='status-true' onClick={markWord}>
                    <p style={{ color: '#e04f4f' }}>know</p>
                     <div className='wrapp-arrow'> <img className='upArrow' src={down} alt='up' /> </div>
                   
                    <p>Cancel status</p>
                </div>
            }
        </div>
    );
};

export default Mark;