
export interface Word {
    englishVersion: string;
    rusVersion: string;
    example: string;
    mark: boolean;
    date: number;
}

export type T = [string, Word];
export type Dictionary = T[];


export interface DictionaryAction {
    type: string;
    dictionary: [];
}


export type DictionaryState = Dictionary;