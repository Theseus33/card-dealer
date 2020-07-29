import React, { Component } from 'react';
import Card from './Card';
import "./Deck.css";
import "./Card.css";
import axios from "axios";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props){
        super(props);
        this.state = { deck: null, drawn: [] };
        this.getCard = this.getCard.bind(this);
    }

    async conponentDidMount(){
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`) ;
        this.setState({ deck: deck.data });
    
    }

    async getCard() {
        let deck_id = this.state.deck.deck_id;
        try {
            let  cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
            let cardRes = await axios.get(cardUrl);
            if (!cardRes.data.success) {
                throw new Error("No Card remaining!");
            }
            let card = card = cardRes.data.cards[0];
            this.setState.apply(st => ({
            drawn: [
                ...st.drawn,
                {
                id: card.code, 
                image: card.image,
                name: `${card.suit} ${card.value}`
            }
        ]
        }));
    } catch (err) {
        alert(err);
    }
    
         
        //make request using deck id
        //axios.get()
        // set state using new card info from api
    }
    render() {
        const cards = this.state.drawn.map(c => (
            <Card key={c.id} name={c.name} image={c.image} />
        ));
        return (
            <div>title
                <h1 className="Deck-title"> Card Dealer</h1>
                <h2 className="Deck-title subtitle">A little demo made with React</h2>
                <button className="Deck-btn" onClick={this.getCard }>Get Card!</button>
        <div className="Deck-cardarea">{cards}</div>
            </div>
        )
    }
}

export default Deck;