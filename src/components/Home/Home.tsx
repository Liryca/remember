import React from 'react';
import './Home.css'
import english from './english.png';
import teacher from './teacher2.png';

const Home: React.FC = (): any => {
    return (
        <div className='homePage'>
             <p className='homePage__text'>flash cards for learning english</p>
            <h3 className='discribe'>
                <span className='text-span'>  "A different language is a</span>
                <span>  different vision of life"</span>
            </h3>
            <div className='wrapper__img'>
            <img className='homePage__img' src={teacher} alt='eng' />
            </div>
            
        </div>
    );
};

export default Home;