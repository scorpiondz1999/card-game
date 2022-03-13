// Import models
const { Suits, Values, Cards } = require("../models");
let player1cards = [],
  computercards = [],
  pairsPlayer = [],
  pairsComp = [];

const listSuits = [
  { suit: "♠", type_card: "black" },
  { suit: "♣", type_card: "black" },
  { suit: "♦", type_card: "red" },
  { suit: "♥", type_card: "red" },
];
const listValues = [
  { value: "A" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5" },
  { value: "6" },
  { value: "7" },
  { value: "8" },
  { value: "9" },
  { value: "10" },
  { value: "J" },
  { value: "Q" },
  { value: "K" },
];

async function getDeck() {
  let deck = [];
  for (let x = 0; x < listSuits.length; x++) {
    for (let y = 0; y < listValues.length; y++) {
      let card = { Suit: listSuits[x], Value: listValues[y] };
      deck.push(card);
    }
  }
  return deck;
}

async function shuffle(deck) {
  // switch the values of two random cards
  for (let i = 0; i < 1000; i++) {
    const location1 = Math.floor(Math.random() * deck.length);
    const location2 = Math.floor(Math.random() * deck.length);
    const tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

async function cardAssign(deck) {
  player1cards = [];
  computercards = [];

  //player cards
  for (let i = 0; i < 7; i++) {
    player1cards.push(deck[i]);
    deck.shift();
  }

  //computer cards  (player 2 is computer)
  for (let i = 0; i < 7; i++) {
    computercards.push(deck[i]);
    deck.shift();
  }
}

module.exports = {
  async startGame({ req }, res) {
    console.log("start game");
    // Re-initialize the cards
    const cards = await Cards.deleteMany({});

    // Find Suits and Values
    const isemptysuits = await Suits.countDocuments({});
    const isemptyvalues = await Values.countDocuments({});

    if (isemptysuits === 0 || isemptyvalues === 0) {
      console.log("empty");
      Suits.create(listSuits);
      Values.create(listValues);
    }

    // Get Deck
    let deck = await getDeck();

    // Shuffle
    await shuffle(deck);

    // Assign
    await cardAssign(deck);

    // Save to DB
    let p1Cards = [],
      compCards = [];
    player1cards.map((p1) => {
      p1Cards.push({
        suit: p1.Suit.suit,
        type_card: p1.Suit.type_card,
        value: p1.Value.value,
        type_player: "player",
      });
    });

    computercards.map((p2) => {
      compCards.push({
        suit: p2.Suit.suit,
        type_card: p2.Suit.type_card,
        value: p2.Value.value,
        type_player: "computer",
      });
    });

    Cards.create(p1Cards);
    Cards.create(compCards);

    // Response
    res.json({ player: p1Cards, computer: compCards, deck: deck });
  },
  async getCards({ body }, res) {},
};
