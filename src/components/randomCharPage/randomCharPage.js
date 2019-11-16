import React, { Component } from 'react';
import RandomChar, { MyField } from '../randomChar';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/service';
import { Row, Col } from 'reactstrap';

export default class RandomCharPage extends Component {

    gotService = new GotService();

    state = {
        error: false
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

        const randomCharBlock = (
            <RandomChar getData={this.gotService.getCharacter}>
                <MyField field="name" label="Name"></MyField>
                <MyField field="gender" label="Gender"></MyField>
                <MyField field="born" label="Born"></MyField>
                <MyField field="died" label="Died"></MyField>
                <MyField field="culture" label="Culture"></MyField>
            </RandomChar>
        )

        return (
            <Row className="row-m">
                <Col lg={{ size: 5, offset: 0 }}>
                    {randomCharBlock}
                </Col>
            </Row>
        )
    }
}