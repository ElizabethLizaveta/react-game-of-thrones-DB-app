import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
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
            const { id } = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={(e) => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }
        const { itemList } = this.state;
        let content;

        if (!itemList) {
            content = <Spinner />
        } else {
            content = this.renderItems(itemList);
        }

        return (
            <ListGroup className="item-list">
                {content}
            </ListGroup>
        );
    }
}