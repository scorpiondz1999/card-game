// Import models
let player1cards = [],
  computercards = [];

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
      let card = { ...listSuits[x], ...listValues[y], type_player: "all" };
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

export async function startNewGame() {
  console.log("start game");

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
      suit: p1.suit,
      type_card: p1.type_card,
      value: p1.value,
      type_player: "player",
    });
  });

  computercards.map((p2) => {
    compCards.push({
      suit: p2.suit,
      type_card: p2.type_card,
      value: p2.value,
      type_player: "computer",
    });
  });

  // Response
  return { p1Cards, compCards, deck };
}
