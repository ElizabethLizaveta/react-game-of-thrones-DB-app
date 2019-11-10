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

    getAllCharacters() {
        return this.getResource(`/characters?page=5&pageSize=10`);
    }

    getCharacter(id) {
        return this.getResource(`/characters/${id}`);
    }

    getAllHouses() {
        return this.getResource(`/houses?page=1&pageSize=10`);
    }

    getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }

    getAllBooks() {
        return this.getResource(`/books?page=1&pageSize=10`);
    }

    getBook(id) {
        return this.getResource(`/books/${id}`);
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

