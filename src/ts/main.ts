import '../css/style';
import NewWordData from './interface/NewWordData';
import WordsData from './wordsData/WordsData';
import Service from './service/Service';
import { inputValue, searchBtn, outWordInfo, list } from './html_variables/html_variables';
import id from './id_counter/counter';

const wordsData = new WordsData();
const getInfoFromApi = new Service();

//
//Загрузка списка слов на страницу
//
function loadList(): void {
    list!.innerHTML = '';
    if (wordsData.data.length === 0) {
        list!.innerHTML = 'В списке нет слов.';
    } else {
        wordsData.getData().map((item: NewWordData) => {
            let translationToStr: string = item.translation.join(', ');
            list!.innerHTML += `
            <li class="words-list__item">
            <div>${item.title} [${item.transcription}] - ${translationToStr}</div>
            <button class="words-list__delete-word btn" id="${item.id}"></button> 
            </li>`;
        });
    }
    deleteWordFromData();
}

loadList();

//
//Удаление слова из класса
//
function deleteWordFromData(): void {
    document.querySelectorAll('.words-list__delete-word').forEach((item) => {
        item.addEventListener('click', (e: any) => {
            let btnId: number = +e.target.id;
            let inx: number = wordsData.data.findIndex(el => el.id === btnId);
            let newData: Array<NewWordData> = [...wordsData.data.slice(0, inx), ...wordsData.data.slice(inx + 1)];
            wordsData.data = newData;
            loadList();
        });
    });
}

//
//Получение данных с сервера и загрузка на страницу
//
async function getFromService(word: string) {
    word = word.toLowerCase();
    outWordInfo!.innerHTML = '';
    let searchedItem = wordsData.data.find((item: NewWordData) => word === item.title);
    if (searchedItem === undefined) {
        try {
            let wordInfoArr = await getInfoFromApi.getWordInfo(word);
            outWordInfo!.innerHTML += `<button class="search__add-to-list btn"></button>`;
            outWordInfo!.innerHTML += `${word} - `;
            let translateWord = wordInfoArr.map((item: any) => {
                console.log(item);
                return item.tr[0].text
            });
            outWordInfo!.innerHTML += translateWord.join(', ');
            inputValue.value = '';
            addToListNewWord(word, wordInfoArr[0].ts, translateWord);
        } catch (error) {
            console.log(error);
            outWordInfo!.innerHTML = 'Проверьте написание слова и язык ввода.';
        }
    } else {
        outWordInfo!.innerHTML = `${searchedItem.title} [${searchedItem.transcription}] - ${searchedItem.translation}`;
    }
};


//
//Клик по кнопке поиска
//
searchBtn!.addEventListener('click', () => {
    if (inputValue.value === '') {
        return outWordInfo!.textContent = 'Введите слово для поиска.';
    }
    getFromService(inputValue.value);
});

//
//Добавление слова в класс и в список
//
function addToListNewWord(title: string, transcription: string, translation: string[]): void {
    document.querySelector('.search__add-to-list')!.addEventListener('click', () => {
        let newWord: NewWordData = {
            id: id(),
            title,
            transcription,
            translation
        }
        let newData: Array<NewWordData> = [newWord, ...wordsData.data];
        wordsData.data = newData;
        outWordInfo!.innerHTML = '';
        loadList();
    });
};


