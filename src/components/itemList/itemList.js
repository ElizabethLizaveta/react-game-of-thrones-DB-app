import React, { Component } from 'react';
import GotService from '../../services/service';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './itemList.css';
import Spinner from '../spinner';
export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
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