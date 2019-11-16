import React, { Component } from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import RowBlock from '../rowBlock';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/service';

export default class BookPage extends Component {

    gotService = new GotService();

    state = {
        selectedBook: 1,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                getData={this.gotService.getAllBooks}
                onItemSelected={this.onItemSelected}
                renderItem={({ name, numberOfPages }) => `${name} (${numberOfPages})`} />
        )

        const charDetails = (
            <CharDetails getData={this.gotService.getBook} itemId={this.state.selectedBook}>
                <Field field="publisher" label="Publisher"></Field>
                <Field field="released" label="Released"></Field>
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}