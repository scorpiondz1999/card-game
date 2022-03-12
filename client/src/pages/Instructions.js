import React from "react";

const Home = () => {
  return (
    <main style={{textAlign: "center", backgroundColor: "green"}}>
      <section>
        <div className="flex-row">
          <h2 className="section-title secondary-border">
            Welcome to Go Fish Game!
          </h2>
        </div>
        <div className="process">
          <h3>step 1</h3>
          <div className="process-info">
            <div className="process-text">
              <h4>Sign up</h4>
              <p>sign up on our state of the art sign up page!</p>
            </div>
          </div>
        </div>
        <div className="process">
          <h3>step 2</h3>
          <div className="process-info">
            <div className="process-text">
              <h4>Start Playing</h4>
              <p>Go to playing Go Fish - enjoy!</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="process">
          <h3>Go Fish Game Rules</h3>
          <div className="process-info">
            <div className="process-text">
              <h4>Set Up</h4>
              <p>
                The players assemble in a circle and the dealer shuffles the
                cards. The dealer then passes the cards out face down,
                clockwise, and one at a time. If less than 4 people are playing,
                each player receives 7 cards. If more than 4 people are playing,
                each player receives 5 cards. The remaining deck is placed face
                down in the middle of the circle to form the “ocean”.
              </p>
            </div>
            <div className="process-text">
              <h4>How to Play</h4>
              <p>
                The game begins when the player to the left of the dealer
                “fishes” by asking another player if they have a certain card in
                their hand (e.g. “Do you have any Queens?”). If the player does
                have the type of card asked for, they must give the asker all of
                that type they possess. The asker then continues questioning the
                same or a different player if they have another or the same type
                of card. If a player does not have the typed asked for, they say
                “go fish” and the asker picks up the top card from the ocean.
                The gameplay then moves to the left and the next person fishes
                for cards.
              </p>
              <p>
                A player makes a book when they have 4 of a kind. When a book is
                made, the player places the 4 cards face up in a pile in front
                of them to verify to the other players that they made a book.
                The game ends when all 13 books are made. The player with the
                most books wins. If a player runs out of cards during the game,
                they may select one from the ocean when it is their turn. If
                there are no more cards in the ocean, they are out of the game
                and the number of books they have is final
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
