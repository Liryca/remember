import { DictionaryAction, DictionaryState } from "../../types/dictionaryTypes";



const dictionary: DictionaryState = [];;

export const dictionaryReducer = (state = dictionary, action: DictionaryAction): DictionaryState => {
    switch (action.type) {
        case 'GET_WORDS':
            return [
                ...action.dictionary, 
            ]

        default:
            return state
    }
}