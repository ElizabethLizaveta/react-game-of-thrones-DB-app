export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
       const res = await this.getResource(`/characters?page=40&pageSize=10`);
       return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const char = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(char);
    }

    getAllHouses = async () => {
        const res = await this.getResource(`/houses?page=1&pageSize=10`);
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformCharacter(house);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books?page=1&pageSize=10`);
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        const book = await  this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    _transformCharacter(char) {
        for (const prop in char) {
            if (char[prop].length === 0) {
                char[prop] = `no ${prop} info provided`;
            }
        }

        return {
            id: char.url.split('/').pop(),
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            url: char.url,
        }
    }

    _transformHouse(house) {

        for (const prop in house) {
            if (house[prop].length === 0) {
                house[prop] = `no ${prop} info provided`;
            }
        }

        return {
            id: house.url.split('/').pop(),
            name: house.name,
            region: house.region,
            words: house.words,
            title: house.title,
            overload: house.overload,
            ancestralWeapons: house.ancestralWeapons,
        }
    }

    _transformBook(book) {

        for (const prop in book) {
            if (book[prop].length === 0) {
                book[prop] = `no ${prop} info provided`;
            }
        }

        return {
            id: book.url.split('/').pop(),
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}



 

 

 
 

 

 
