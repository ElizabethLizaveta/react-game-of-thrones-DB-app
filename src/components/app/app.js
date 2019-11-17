import React, { Component } from 'react';
import { Row, Container } from 'reactstrap';
import Header from '../header';
import RandomCharPage from '../randomCharPage';
import {CharacterPage, BookPage, HousePage, BooksItem} from '../pages';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';
import GotService from '../../services/service';
import {BrowserRouter as Router, Route} from 'react-router-dom'

const RandomBlock = styled.button`
margin: 0 0 40px 15px;
color: #fff;
background: #1a1c30;
padding: 20px;
font-size: 18px;
border: 3px solid white;
`

const HomeHeader = styled.h1`
color: #fff;
font-size: 40px;
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
            <Router>
            <div className="app">
                <Container>
                    <Header />
                </Container>
                <Container>
                    {randomCharBlock}
                    <Row>
                        <RandomBlock onClick={this.toogleBlock}>{btnText}</RandomBlock>
                    </Row>
                    <Route path='/' exact component={() => 
                        <HomeHeader>Welcome to the Game of Thrones DB</HomeHeader>
                    }/>
                    <Route path='/characters' component={CharacterPage}/>
                    <Route path='/houses' component={HousePage}/>
                    <Route path='/books' exact component={BookPage}/>
                    <Route path='/books/:id'render={
                        ({match})=> {
                            const {id} = match.params;
                        return <BooksItem bookId={id}/>
                        }
                    }/>
                </Container>
            </div>
            </Router>
        );
    }
}; 