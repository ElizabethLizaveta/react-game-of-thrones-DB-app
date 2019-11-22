import React, { useState, useEffect } from 'react';
import { ListGroup } from 'reactstrap';
import './itemList.css';
import Spinner from '../spinner'; 


function ItemList({ getData, renderItem, onItemSelected }) {

    const [itemList, updateItemList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateItemList(data)
            })
    }, [itemList])

    function renderItems(arr) {

        return arr.map((item, i) => {
            const { id } = item;
            const label = renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={(e) => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }
    
    let content;

    if (!itemList) {
        content = <Spinner />
    } else {
        content = renderItems(itemList);
    }

    return (
        <ListGroup className="item-list">
            {content}
        </ListGroup>
    );
}

export default ItemList;