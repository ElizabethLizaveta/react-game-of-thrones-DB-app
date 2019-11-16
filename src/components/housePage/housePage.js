import React, { Component } from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import RowBlock from '../rowBlock';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/service';

export default class HousePage extends Component {

    gotService = new GotService();

    state = {
        selectedHouse: 1,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
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

        const itemList = (
            <ItemList
                getData={this.gotService.getAllHouses}
                onItemSelected={this.onItemSelected}
                renderItem={({ region, words }) => `${region} (${words})`} />
        )

        const charDetails = (
            <CharDetails getData={this.gotService.getHouse} itemId={this.state.selectedHouse}>
                <Field field="name" label="Name"></Field>
                <Field field="region" label="Region"></Field>
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}