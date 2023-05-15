
import { database } from '../index';
const { ref, set, push, get, child, update, onValue } = require("firebase/database");

const voices = window.speechSynthesis.getVoices();

export function voiсeRusWord(word, e) {
    console.log(word)
    if (e) {
        e.stopPropagation();
    }
    const utteranceRus = new SpeechSynthesisUtterance(word[1].rusVersion);
    utteranceRus.volume = 1;
    utteranceRus.voice = voices.find((voice) => voice.lang === 'ru-RU');
    utteranceRus.lang = 'ru-RU';
    return speechSynthesis.speak(utteranceRus);
}

export function voiсeEngWord(word, e) {
    if (e) {
        e.stopPropagation();
    }
    const utteranceEng = new SpeechSynthesisUtterance(word[1].englishVersion);
    utteranceEng.volume = 1;
    utteranceEng.voice = voices.find((voice) => voice.lang === 'en-GB');
    utteranceEng.volume = 1;
    utteranceEng.lang = 'en-GB';
    return speechSynthesis.speak(utteranceEng);
}



// запрос к яндекс переводчику

export async function getTranslatedWord(word) {

    //     const response = await fetch("dictionary.yandex.net/api/v1/dicservice.json/lookup"), {
    //         method: 'POST',
    //         body: `key=dict.1.1.20221011T075814Z.3fa6afa8b3b380eb.5c1b16098f361650dd5bba51b3085842cc21eba7&lang=en-ru&text=${word.englishVersion}`,
    //             headers: new Headers({
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             })
    // })
    // const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20221011T075814Z.3fa6afa8b3b380eb.5c1b16098f361650dd5bba51b3085842cc21eba7&lang=en-ru&text=${word.englishVersion}`)

    const response = await fetch("https://translate.yandex.net/api/v1.5/tr.json/translate", {
        method: 'POST',
        body: `key=trnsl.1.1.20220505T085832Z.ead06d92ed666053.76b91ac7aeb33fb4ac6d87ac84ebcd55ffeb37c1&lang=en-ru&text=${word.englishVersion}`,
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });
    return await response.json();
}


export async function getUserData(userId) {
    const user = await get(ref(database, 'users/' + userId));
    return user;
}

//добавление юзера в базу данных fairbase
export async function writeUserData(userId, name, email) {

    try {
        await set(ref(database, 'users/' + userId), {
            userId: userId,
            name: name,
            email: email,
        })
    } catch (e) {
        console.log(e)
    }
}

// добавление слова или словаря и слова
export async function writeUserWord(userId, word) {
    try {
        const updates = {};
        let id = push(child(ref(database), 'users')).key
        const user = ref(database, 'users/' + userId);
        return await get(user)
            .then(async (snapshot) => {
                if (snapshot.val().dictionary === undefined) {
                    updates['/users/' + userId + `/dictionary/` + id] = word;
                    return await update(ref(database), updates).then(() => 'The word was successfully added to the dictionary')

                } else {
                    if (Object.values(snapshot.val().dictionary).some(i => i.englishVersion.toLowerCase() === word.englishVersion.toLowerCase())) {
                        return await Promise.resolve('Dictinary have this word');
                    } else {
                        updates['/users/' + userId + `/dictionary/` + id] = word;
                        return await update(ref(database), updates).then(() => 'The word was successfully added to the dictionary');
                    }
                }
            })
    } catch (e) {
        return Promise.resolve('An unexpected error occurred')
    }

}


// получение словаря из базы данных
export async function getWordsFromDataBase(userId) {


    try {
        const d = ref(database, 'users/' + userId + '/dictionary');
        const result = await new Promise((resolve, reject) => onValue(d,
            (snapshot) => {
                if (snapshot.val() !== null) {
                    return resolve(Object.entries(snapshot.val()))
                } else {
                    resolve('Dictionary is empty')
                }
            })
        )
        return result;
    } catch (e) {
        return 'error'
    }
}

//удаление слова
export async function deleteWordOnDataBase(wordId, userId) {

    try {
        return await set(ref(database, 'users/' + userId + '/dictionary/' + wordId),
            null).then(() => 'Word deleted')
    } catch (e) {
        return 'error'

    }

}

// изменение слова
export async function changeWordinDataBase(word, userId) {
    try {
        const updates = {}
        updates['/users/' + userId + `/dictionary/` + word[0]] = word[1]
        return await update(ref(database), updates).then(() => 'the word has been changed');
    } catch (e) {
        return Promise.resolve('Error')
    }

}

