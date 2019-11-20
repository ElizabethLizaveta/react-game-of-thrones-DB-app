import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import RowBlock from '../rowBlock';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/service';
export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: 100,
        error: false
    }

    onItemSelected = (id) => {

        console.log(1);
        this.setState({
            selectedChar: id
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
                getData={this.gotService.getAllCharacters}
                onItemSelected={this.onItemSelected}
                renderItem={({ name, gender }) => `${name} (${gender})`} />
        )

        const itemDetails = (
            <ItemDetails getData={this.gotService.getCharacter} itemId={this.state.selectedChar}>
                <Field field="gender" label="Gender"></Field>
                <Field field="born" label="Born"></Field>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}