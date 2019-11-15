import React, { Component } from 'react';
import GotService from '../../services/service';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import Spinner from '../spinner';

const Details = styled.div`
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-bottom: 40px;

h4 {
    margin-bottom: 20px;
    text-align: center;
}

.select-error {
    color: #fff;
    text-align: center;
    font-size: 26px;
}
`

const AlarmMessage = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`

export default class CharDetails extends Component {

    gotSetvice = new GotService();

    state = {
        char: null,
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.gotSetvice.getCharacter(charId)
            .then((char) => {
                this.setState({ char })
            })
        //this.foo.bar = 0;
    }

    render() {
        const { char } = this.state;

        const content = (!char) ? <ErrorView /> : <View char={char} />

        return (
            <Details className="rounded">
                {content}
            </Details>
        );
    }
}

const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;

    return (
        <>
            <h4>{name}</h4>
            <ListGroup className="list-group-flush">
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </>
    )
}

const ErrorView = () => {
    return (
        <>
            <AlarmMessage>Please select a character</AlarmMessage>
            <Spinner />
        </>
    )
}