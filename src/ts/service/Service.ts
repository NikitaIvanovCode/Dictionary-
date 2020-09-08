export default class Service {
    service = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20200904T062855Z.6d845d84c2e50c4b.267fb42b9800c6b0ddf5dbde141641e05c7f53d3&lang=en-ru&text';

    getWordInfo = async (url: string) => {
        try {
            let response = await fetch(`${this.service}=${url}`);
            let data = await response.json();
            return data.def;
        } catch (error) {
            throw new Error('Не удалось получить данные с сервера.');
        }
    }
}