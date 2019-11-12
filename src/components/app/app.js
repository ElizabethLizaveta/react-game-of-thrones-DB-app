import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import styled from 'styled-components';

const RandomBlock = styled.button`
position: absolute;
left: 15px;
bottom: 20px;
color: #fff;
background: transparent;
padding: 20px;
font-size: 18px;
border: 2px solid white;
`

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            randomCharVisible: true
        }

        this.toogleBlock = this.toogleBlock.bind(this);
    }

    toogleBlock() {
        this.setState({
            randomCharVisible: !this.state.randomCharVisible
        })
    }

    render() {
        const { randomCharVisible } = this.state;
        const randomCharBlock = randomCharVisible ? <RandomChar/> : null;
        const btnText = randomCharVisible ? 'Hide Random Character' : 'Show Random Character';
        
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomCharBlock}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                    <Row>
                        <RandomBlock onClick={this.toogleBlock}>{btnText}</RandomBlock>
                    </Row>
                </Container>
            </>
        );
    }
}; 