// Import models
const { Suits, Values, Cards } = require("../models");
let deck = [],
  player1 = [],
  computer = [],
  player1cards,
  player2cards,
  pairsPlayer,
  pairsComp;

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
  for (let x = 0; x < listSuits.length; x++) {
    for (let y = 0; y < listValues.length; y++) {
      let card = { Suit: listSuits[x], Value: listValues[y] };
      deck.push(card);
    }
  }
  return deck;
}

async function shuffle() {
  // switch the values of two random cards
  for (let i = 0; i < 1000; i++) {
    const location1 = Math.floor(Math.random() * deck.length);
    const location2 = Math.floor(Math.random() * deck.length);
    const tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

async function cardAssign() {
  //player cards
  for (let i = 0; i < 7; i++) {
    player1.push(deck[i]);
    deck.shift();
  }

  //computer cards  (player 2 is computer)
  for (let i = 0; i < 7; i++) {
    computer.push(deck[i]);
    deck.shift();
  }

  //creates arrays for both hands with just card value
  const cardValPlayer = player1.map(function (item) {
    return item.Value;
  });
  const cardValComputer = computer.map(function (item) {
    return item.Value;
  });
  player1cards = cardValPlayer;
  player2cards = cardValComputer;

  console.log("checking for pairs");
  pairsPlayer = player1cards.filter((e, i, a) => a.indexOf(e) !== i);
  player1cards = player1cards.filter((item) => !pairsPlayer.includes(item));
  player1 = player1.filter((i) => !pairsPlayer.includes(i.Value));

  //remove computer pairs from hand
  pairsComp = player2cards.filter((e, i, a) => a.indexOf(e) !== i);
  player2cards = player2cards.filter((item) => !pairsComp.includes(item));
  computer = computer.filter((i) => !pairsComp.includes(i.Value));

  if (pairsPlayer > 0 || pairsComp > 0) {
    console.log("pairs were removed");
  }
  console.log(player1);
  console.log(player1cards);
  console.log(computer);
  console.log(player2cards);
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
    const deck = await getDeck();

    // Shuffle
    await shuffle();

    // Assign
    await cardAssign();

    // Save to DB
    let p1Cards = [],
      compCards = [];
    player1.map((p1) => {
      p1Cards.push({
        suit: p1.Suit.suit,
        type_card: p1.Suit.type_card,
        value: p1.Value.value,
        type_player: "player",
      });
    });

    computer.map((p2) => {
      compCards.push({
        suit: p2.Suit.suit,
        type_card: p2.Suit.type_card,
        value: p2.Value.value,
        type_player: "computer",
      });
    });

    console.log(p1Cards);
    console.log(compCards);

    Cards.create(p1Cards);
    Cards.create(compCards);

    // Response
    res.json({ player: p1Cards, computer: compCards, deck: deck });
  },
  async getCards({ body }, res) {},
};
