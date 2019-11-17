import React, { Component } from 'react';
import GotService from '../../services/service';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
    gotService = new GotService();

    render() {
        return (
            <ItemDetails getData={this.gotService.getBook} itemId={this.props.bookId}>
                <Field field="publisher" label="Publisher"></Field>
                <Field field="released" label="Released"></Field>
            </ItemDetails> 
        )
    }
}
