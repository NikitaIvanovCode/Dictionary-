import NewWordData from '../interface/NewWordData';

export default class WordsData {
    data: Array<NewWordData> = [
        {
            id: 13,
            title: 'want',
            transcription: 'wɒnt',
            translation: ['хотеть']
        },
        {
            id: 12,
            title: 'air',
            transcription: 'eə r',
            translation: ['воздух']
        },
        {
            id: 11,
            title: 'well',
            transcription: 'wel',
            translation: ['хорошо']
        },
        {
            id: 10,
            title: 'also',
            transcription: 'ˈɔːl.səʊ',
            translation: ['также']
        }
    ];

    getData() {
        return this.data;
    }
}
