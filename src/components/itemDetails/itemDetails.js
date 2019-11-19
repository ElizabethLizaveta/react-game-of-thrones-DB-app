import React, { useState, useEffect } from 'react';
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

const Field = ({ item, field, label }) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </ListGroupItem>
    )
}

export {
    Field
}

function ItemDetails({ itemId, getData, children }) {

    const [item, updateItem] = useState([]);

    useEffect(() => {
        updateChar();
    }, []);

    function updateChar() {

        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                updateItem(item)
            })
        //this.foo.bar = 0;
    }

    if (!item) {
        return (
            <ErrorView />
        )
    }

    const { name } = item;

    return (
        <Details className="rounded">
            <h4>{name}</h4>
            <ListGroup className="list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, item)
                    })
                }
            </ListGroup>
        </Details>
    );
}


const ErrorView = () => {
    return (
        <>
            <AlarmMessage>Please select a character</AlarmMessage>
            <Spinner />
        </>
    )
}

export default ItemDetails;