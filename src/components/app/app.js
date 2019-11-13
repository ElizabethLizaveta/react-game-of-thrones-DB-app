import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';

const RandomBlock = styled.button`
margin: 0 0 40px 15px;
color: #fff;
background: #1a1c30;
padding: 20px;
font-size: 18px;
border: 3px solid white;
`

export default class App extends Component {

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
        const randomCharBlock = randomCharVisible ? <RandomChar /> : null;
        const btnText = randomCharVisible ? 'Hide Random Character' : 'Show Random Character';

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {randomCharBlock}
                        </Col>
                    </Row>
                    <Row>
                        <RandomBlock onClick={this.toogleBlock}>{btnText}</RandomBlock>
                    </Row>
                   <CharacterPage></CharacterPage>
                </Container>
            </>
        );
    }
}; 