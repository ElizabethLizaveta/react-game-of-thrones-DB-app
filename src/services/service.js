export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
        }

        return await res.json();
    }

    async getAllCharacters() {
       const res = await this.getResource(`/characters?page=5&pageSize=10`);
       return res.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const char = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(char);
    }

    async getAllHouses() {
        const res = await this.getResource(`/houses?page=1&pageSize=10`);
        return res.map(this._transformHouse);
    }

    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformCharacter(house);
    }

    async getAllBooks() {
        const res = await this.getResource(`/books?page=1&pageSize=10`);
        return res.map(this._transformBook);
    }

    async getBook(id) {
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
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse(house) {

        for (const prop in house) {
            if (house[prop].length === 0) {
                house[prop] = `no ${prop} info provided`;
            }
        }

        return {
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
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}

const got = new GotService();

got.getAllCharacters()
    .then(res => {
        console.log('All characters:');
        res.forEach(element => {
            console.log(element.name);
        });
    })

got.getCharacter(130)
    .then(res => {
        console.log('Character 130:');
        console.log(res);
    })

got.getAllHouses()
    .then(res => {
        console.log('All houses:');
        res.forEach(element => {
            console.log(element.name);
        });
    })

got.getHouse(1)
    .then(res => {
        console.log('House 1:');
        console.log(res);
    })

got.getAllBooks()
    .then(res => {
        console.log('All books:');
        res.forEach(element => {
            console.log(element.name);
        });
    })

got.getBook(5)
    .then(res => {
        console.log('Book 5:');
        console.log(res);
    })

