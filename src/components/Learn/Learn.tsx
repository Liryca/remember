import './Learn.css';
import Mark from '../Mark/Mark';
import Card from '../Card/Card';
import SwitchCards from '../SwitchCards/SwitchCards';
import Spiner  from '../Spiner/Spiner';
import { getWordsFromDataBase } from '../../api/api';
import { Dictionary } from '../../types/dictionaryTypes';
import { useState, useEffect, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppContext } from '../..';
import { useLocation } from 'react-router-dom';

const Learn: React.FC = () => {

    const context = useContext(AppContext);
    const [user] = useAuthState(context?.auth);
    const [index, setIndex] = useState(0);
    const [words, setWords] = useState<Dictionary>([]);
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            await getWordsFromDataBase(user?.uid).then((d: Dictionary) => {
                console.log(d)
                if (Array.isArray(d)) {
                    setWords(d.filter((w) => w[1].mark === false));
                    setLoaded(!loaded);
                } else {
                    setMessage(d)
                 
                }
            })
        }

        fetchData();
    }, [])


    if (message.length) {
        return <div className='emptyMessage'>{message.split(' ').map((i:string) => {
              return <span>{i }</span>
            })}</div>
       
    }


    if (!loaded) {
     return <Spiner/>
    }

 


    return (
        <div className='cards'>
        
            {
                words.length?
                    <div className='wrapper__cards'>
                        <Mark words={words} setWords={setWords} index={index} />
                        <Card key={index} setWords={setWords} words={words} index={index} setIndex={setIndex} />
                        <SwitchCards index={index} setIndex={setIndex} words={words} setWords={setWords} selected='' />
                    </div>
                    : <div className='wrapper-cards-message'>
                        <h2>Add new words to continue</h2>
                        <div className='cards-message'>You have no words to learn</div>
                    </div>
            }
        </div>
    );
};

export default Learn;




