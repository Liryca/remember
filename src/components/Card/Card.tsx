import React from 'react';
import './Card.css';
import speaker from './images/sound.svg';
import edit from './images/edit.svg';
import trash from './images/trash.svg';
import ChangeModal from '../ChangeModal/ChangeModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import { Dictionary } from '../../types/dictionaryTypes';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { voiсeEngWord, voiсeRusWord } from '../../api/api'


interface PropsType {
    setWords: (x: Dictionary) => void;
    words: Dictionary;
    index: number;
    setIndex: (x: number) => void;
}

const Card: React.FC<PropsType> = ({ setWords, words, index, setIndex }) => {

    const [showChangeModal, setShowChangeModal] = useState(false);
    const [showDeletModal, setShowDeleteModal] = useState(false);

    const path = useLocation().pathname;
    const divRef = React.useRef<HTMLDivElement | null>(null);

    function handleModalOpen(e: React.MouseEvent) {
        e.stopPropagation();
        setShowChangeModal(true);
    }

    const handleModalClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log(e)
        const value = (e.target as HTMLInputElement).className;
        if (value === 'img-modal-close') {
            setShowChangeModal(false);
        }

        //    setShowChangeModal(false);

    };


    function handleDeleteModalOpen(e: React.MouseEvent) {
        e.stopPropagation();
        setShowDeleteModal(true);
    }

    const handleDeleteModalClose = (e: React.MouseEvent) => {
        setShowDeleteModal(false);

    };


    function toggleCard() {
        if (divRef !== null) {
            divRef.current?.classList.toggle('is-flipped');
        }
    }


    return (
        <div className='wrapper-card'>

            {<div className='scene'>
                <div ref={divRef} className='card' onClick={toggleCard}>
                    <div className="card__face card__face--front" >
                        <div className='card-control'>
                            {path === '/repeatWords' ?
                                <div className='card-img-wrapp'> <img src={speaker} alt='speaker' onClick={(e) => voiсeRusWord(words[index], e)} /></div> :
                                <div className='card-img-wrapp'><img src={speaker} alt='speaker' onClick={(e) => voiсeEngWord(words[index], e)} /></div>}
                            <div className='edit-icon'>
                                <div className='card-img-wrapp'><img src={trash} alt='' onClick={handleDeleteModalOpen} /></div>
                                <div className='card-img-wrapp'><img src={edit} alt='edit' onClick={handleModalOpen} /></div>
                            </div>

                        </div>
                        <div className='card-speaker'>
                            {path === '/repeatWords' ? <p> {words[index][1].rusVersion.toLowerCase()}</p>
                                : <p>{words[index][1].englishVersion.toLowerCase()}</p>}
                        </div>
                    </div>
                    <div className="card__face card__face--back" >
                        <div className='card-control'>
                            {path === '/repeatWords' ?
                                <div className='card-img-wrapp'><img src={speaker} alt='speaker' onClick={(e) => voiсeEngWord(words[index], e)} /></div> :
                                <div className='card-img-wrapp'><img src={speaker} alt='speaker' onClick={(e) => voiсeRusWord(words[index], e)} /></div>}
                            <div className='edit-icon'>
                                <div className='card-img-wrapp'><img src={trash} alt='' onClick={handleDeleteModalOpen} /></div>
                                <div className='card-img-wrapp'><img src={edit} alt='edit' onClick={handleModalOpen} /></div>
                            </div>

                        </div>
                        <div className='card-speaker'>
                            {path === '/repeatWords' ? <p> {words[index][1].englishVersion.toLowerCase()}</p> : <p>{words[index][1].rusVersion.toLowerCase()}</p>}
                        </div>
                    </div>
                </div>
            </div>}
            <ChangeModal words={words} setWords={setWords} index={index} show={showChangeModal} closeModal={handleModalClose} showChangeModal={setShowChangeModal} />
            <DeleteModal words={words} index={index} show={showDeletModal} closeModal={handleDeleteModalClose} setWords={setWords} setIndex={setIndex} setShow={setShowDeleteModal} />
        </div>
    )
};

export default Card;