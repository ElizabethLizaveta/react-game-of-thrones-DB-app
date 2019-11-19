import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    min-height: 365px;
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

function RandomChar({ getData, children }) { 

    const [char, updateStateChar] = useState({});
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState(false);

    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, 1500);

        return () => {
            clearInterval(timerId);
        }
    });

    function onCharLoaded(char) {
        updateStateChar(char);
        updateLoading(false);
    }

    function onError(err) {
        updateLoading(false);
        updateError(true);
    }

    function updateChar() {

        const id = Math.floor(Math.random() * 140 + 25);
        //const id = 2222222;
        getData(id)
            .then(onCharLoaded)
            .catch(onError);
    }

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
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, char)
                    })
                }
            </ListGroup>
        </RandomBlock>
    );
}

export default RandomChar;