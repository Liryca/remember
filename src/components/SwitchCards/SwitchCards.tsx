import React, { useContext, useEffect, useState } from 'react';
import right from '../SwitchCards/images/right.svg';
import left from '../SwitchCards/images/left.svg';
import plaed from './images/play.svg';
import stoped from './images/pause.svg';
import sort from './images/sort.svg';
import { getWordsFromDataBase, voiсeRusWord, voiсeEngWord } from '../../api/api';
import { Dictionary } from '../../types/dictionaryTypes';
import { useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppContext } from '../..';
import './SwitchCards.css';
import { shuffle } from '../../utils/utils';
export {shuffle} from '../../utils/utils.js'

const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime();
const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime();
const lastWeek = Date.now() - (6 * 86400000);

interface PropsType {
    index: number;
    setIndex: (x: any) => void;
    words: Dictionary;
    setWords: (x: any) => void;
    selected: string;
}

const SwitchCards: React.FC<PropsType> = ({ index, setIndex, words, setWords, selected }) => {

    const context = useContext(AppContext);
    const [user] = useAuthState(context?.auth);
    const path = useLocation().pathname;
    const [play, setPlay] = useState(false)
    const [intervalId, setIntervalId] = useState(0);


    useEffect(() => {

        if (play && path === '/repeatWords') {
            voiсeRusWord(words[index]);
        }

        if (play && path === '/learnWords') {
            voiсeEngWord(words[index]);
        }


    }, [index, words, play, path])


    async function goForward() {
        if (index === words.length - 1 || words.length - 1 === 0) {
            setIndex(0);
            await getWordsFromDataBase(user?.uid).then((w: Dictionary) => {
                path === '/learnWords' ?
                    setWords(w.filter(w => w[1].mark === false)) :
                    selected === 'lastMonth' ? setWords(w.filter(w => w[1].date >= lastMonth).filter(item => item[1].mark === true)) :
                        selected === 'lastWeek' ? setWords(w.filter(w => w[1].date >= lastWeek).filter(item => item[1].mark === true)) :
                            selected === 'lastYear' ? setWords(w.filter(w => w[1].date >= lastYear).filter(item => item[1].mark === true)) :
                                setWords(w.filter(item => item[1].mark === true))

            })
        } else {
            setIndex((prev: number) => {
                return prev + 1;
            })
        }
    }

    function goBackward() {
        if (index === 0) {
            setIndex(words.length - 1);
        } else {
            setIndex((prev: number) => {
                return prev - 1;
            })
        }
    }

    function changePause(e: React.MouseEvent) {
        if (!play) {
            setPlay(true)
            const interval = window.setInterval(() => {
                setIndex((prev: number) => {
                    if (prev === words.length - 1) {
                        return 0
                    } else {
                        return prev + 1
                    }
                })
            }, 3000)
            setIntervalId(interval)
        } else {
            setPlay(false)
            clearInterval(intervalId)
        }
    }

    function mixWords(){
        const mixArray=shuffle(words)
        setWords((prev:Dictionary)=>{
            return[
              ...mixArray
            ]
        })
    }


    return (
        <div className='cards-images'>
                  {!play ?
                <div title='endless replay' onClick={changePause} className='cards-images-wrapp'><img  src={plaed} alt='stop'></img> </div> :
                <div onClick={changePause}  className='cards-images-wrapp active'><img src={stoped} alt='play'></img></div>
            }
            <div className='toggle'>
 <div onClick={goBackward} className='cards-images-wrapp-go'><img src={left} alt='left'></img></div>
             <p className='cards-amount'>{index + 1}/{words.length}</p>
            <div onClick={goForward} className='cards-images-wrapp-go'><img src={right} alt='right'></img></div>
            </div>

             <div onClick={mixWords} title='mix'className='cards-images-wrapp-go'><img src={sort} alt='sort'></img></div>
        
        </div>

    );
};

export default SwitchCards;



