import React, { useContext } from 'react';
import './Repeat.css';
import Card from '../Card/Card';
import SwitchCards from '../SwitchCards/SwitchCards';
import { useState, useEffect } from 'react';
import { getWordsFromDataBase } from '../../api/api';
import { Dictionary } from '../../types/dictionaryTypes';
import Mark from '../Mark/Mark';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spiner from '../Spiner/Spiner';
import { AppContext } from '../..';
import Home from '../Home/Home';


export const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime();
export const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime();
export const lastWeek = Date.now() - (6 * 86400000);

const Repeat: React.FC = () => {
const context = useContext(AppContext)
    const [user] = useAuthState(context?.auth);
    const [index, setIndex] = useState(0);
    const [words, setWords] = useState<Dictionary>([]);
    const [loaded, setLoaded] = useState(false);
    const [selected, setselected] = useState('allTime');
    const [message, setMessage] = useState('');

    useEffect(() => {

        async function fetchData() {
            await getWordsFromDataBase(user?.uid).then((d: Dictionary) => {
                if (typeof d === 'object') {
                    setWords(d.filter((w) => w[1].mark === true));
                    setLoaded(!loaded);
                } else {
                    setMessage(d);
                }

            })
        }

        fetchData();

    }, [])


    // speechSynthesis.speak(
    //     new SpeechSynthesisUtterance()
    // );


   async function sortedForDate(e: React.ChangeEvent<HTMLSelectElement>) {

        setselected(e.target.value);
        setIndex(0);

       await getWordsFromDataBase(user?.uid).then((w: Dictionary) => {
            if (e.target.value === 'lastMonth') {
                setWords(w.filter((w) => w[1].date >= lastMonth).filter((item) => item[1].mark === true));
            }
            else if (e.target.value === 'lastWeek') {
                setWords(w.filter(w => w[1].date >= lastWeek).filter((item) => item[1].mark === true));

            }
            else if (e.target.value === 'lastYear') {
                setWords(w.filter(w => w[1].date >= lastYear).filter((item) => item[1].mark === true));
            }

            else if (e.target.value === 'allTime') {
                setWords(w.filter(item => item[1].mark === true));
            }
        })

    }

    console.log(message)


    if (message.length) {
        return (
            <div className='emptyMessage'>{message.split(' ').map((i: string,index:number) => {
                return   <span key={index}>{i }</span>
              })}</div>
        )   
    }
    
    // if (!user) {
    //     return <Home/>
    // }

    if (!loaded) {
        return <Spiner/>
    }

    if (!user) {
        return <p> 'Please wait'</p>
    }

    return (
        <div className='cards'>
                <div className='select'>
                    <select value={selected} onChange={sortedForDate}>
                        <option value="lastWeek">for the last week</option>
                        <option value="lastMonth">for the last month</option>
                        <option value="lastYear">for the last year</option>
                        <option value="allTime">during all this time</option>
                    </select>
                </div>

            {words.length&&loaded ?
                <div className='wrapper__cards'>
                    <Mark words={words} setWords={setWords} index={index} />
                    <Card key={index} setWords={setWords} words={words} index={index} setIndex={setIndex}  />
                    <SwitchCards index={index} setIndex={setIndex} words={words} setWords={setWords} selected={selected} />
                </div>
                :
                <div className='wrapper-cards-message'>
                    <h2>Add new words to continue</h2>
                    <div className='cards-message'>You have no words to repeat</div>
                </div>}

        </div>
    );
};

export default Repeat;


