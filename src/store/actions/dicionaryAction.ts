import { Dispatch, } from 'redux';
import { RootState } from '../index';

export const dictionaryAction = (dictionary:[]) => ({
    type: 'GET_WORDS',
    dictionary
})


export function sendWordThunk(words:[]) {
    return function (dispatch: Dispatch, getState: () => RootState) {
        const { dictionary } = getState();
        console.log('dictionary',dictionary)
            dispatch(dictionaryAction(words))
              
    };
}
