import React, { Component } from 'react';
import GotService from '../../services/service';
import { ListGroup } from 'reactstrap';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
            //this.foo.bar = 0;
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    renderItems(arr) {

        return arr.map((item, i) => {

            const id = item.url.split('/').pop();

            return (
                <li
                    key={i}
                    className="list-group-item"
                    onClick={(e) => this.props.onCharSelected(id)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }
        const { charList } = this.state;
        let content;

        if (!charList) {
            content = <Spinner />
        } else {
            content = this.renderItems(charList);
        }

        return (
            <ListGroup className="item-list">
                {content}
            </ListGroup>
        );
    }
}