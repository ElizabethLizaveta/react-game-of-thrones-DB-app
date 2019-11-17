import React, { Component } from 'react';
import ItemList from '../itemList';
import { withRouter } from 'react-router-dom';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/service';

class BookPage extends Component {

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

        return (
            <ItemList
                getData={this.gotService.getAllBooks}
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                renderItem = {({ name, numberOfPages }) => `${name} (${numberOfPages})`} />
        )
    }
}

export default withRouter(BookPage);