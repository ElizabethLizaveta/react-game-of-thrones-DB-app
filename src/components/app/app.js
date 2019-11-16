import React, { Component } from 'react';
import { Row, Container } from 'reactstrap';
import Header from '../header';
import RandomCharPage from '../randomCharPage';
import CharacterPage from '../characterPage';
import BookPage from '../bookPage';
import HousePage from '../housePage';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';
import GotService from '../../services/service';

const RandomBlock = styled.button`
margin: 0 0 40px 15px;
color: #fff;
background: #1a1c30;
padding: 20px;
font-size: 18px;
border: 3px solid white;
`

export default class App extends Component {
    gotService = new GotService();

    state = {
        randomCharVisible: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toogleBlock = () => {
        this.setState({
            randomCharVisible: !this.state.randomCharVisible
        })
    }

    render() {
        const { randomCharVisible } = this.state;
        const randomCharBlock = randomCharVisible ? <RandomCharPage /> : null;
        const btnText = randomCharVisible ? 'Hide Random Character' : 'Show Random Character';

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    {randomCharBlock}
                    <Row>
                        <RandomBlock onClick={this.toogleBlock}>{btnText}</RandomBlock>
                    </Row>
                    <CharacterPage></CharacterPage>
                    <BookPage></BookPage>
                    <HousePage></HousePage>
                </Container>
            </>
        );
    }
}; 