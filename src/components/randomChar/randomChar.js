import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import GotService from '../../services/service';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    min-height: 320px;
    margin-bottom: 40px;

    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
    .term {
        font-weight: bold;
    }
`

const MyField = ({ char, field, label }) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </ListGroupItem>
    )
}

export {
    MyField
}

export default class RandomChar extends Component {

    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const { getData } = this.props;

        const id = Math.floor(Math.random() * 140 + 25);
        //const id = 2222222;
        getData(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;
        const { name } = char;
        if (error) {
            return (
                <ErrorMessage />
            )
        }

        if (loading) {
            return (
                <Spinner />
            )
        }

        return (
            <RandomBlock className="rounded">
                <h4>Random Character: {name}</h4>
                <ListGroup className="list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, { char })
                        })
                    }
                </ListGroup>
            </RandomBlock>
        );
    }
}
 