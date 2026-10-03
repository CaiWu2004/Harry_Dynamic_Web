import { useState, useEffect } from "react";
import Card from "./Card";
import BumbleeBee from "../assets/Bumblebee.jpg";
import Tank from "../assets/Tank.jpg";
import UFO from "../assets/UFO.jpg";
import WhiteOne from "../assets/WhiteOne.jpg";

// Four images. A real game needs eight cards -- two of each -- in a random
// order, which is the first thing we do in class.
const cardImages = [
  { src: BumbleeBee },
  { src: Tank },
  { src: UFO },
  { src: WhiteOne },
];

const Grid = () => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      //sort calls this for pairs of items, a negative
      // number leaves them alone, and a positive number swaps them -- shuffle
      .sort(() => Math.random() - 0.5)
      //every card needs its own card component with a unique id. There are two of each image now
      //src no longer tells the two copies apart
      .map((card) => ({ ...card, id: crypto.randomUUID() }));

    setCards(shuffled);
    setTurns(0);
    setWon(false);
  };

  const handleChoice = (card) => {
    //a guard clause: get the impossible clicks out of the way firsy, so the
    //real logic underneath only ever runs on a legal move
    if (disabled || card === choiceOne || card.matched) {
      return;
    }
    //no choice yet? this is choice one. Otherwise it is choice two
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //THIS DOES NOT WORK. Read the console before you believe me.
  // SetChoiceTwo ab ove does not change choiceTwo on this line -- state
  // updates are queued, and this function kleeps the values it started with.
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    //the updater form again: the next value is built from the previous one
    setTurns((prevTurns) => prevTurns + 1);
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWon(true);
    }
  }, [cards]);

  //[choiceOne, choiceTwo] = run this AFTER a render in which either of them
  //changed. By then the new values really are in state, so we can compare,
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      //console.log("comparing", choiceOne.src, choiceTwo.src);
      if (choiceOne.src === choiceTwo.src) {
        // console.log("match!");
        //the updater form: React hands us the curren cards and we return
        //the new ones. never edit 'card' directly -- build a new array
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        // console.log("no match!");
        // resetTurn();
        //without the wait, the pair is compared and reset before the 0.6s
        //flip the finished -- nobody ever sees the second card
        setTimeout(() => resetTurn(), 1200);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <>
      <button
        onClick={shuffleCards}
        className="bg-blue-900 text-white uppercase px-8 py-4 rounded-lg mb-6"
      >
        New Game
      </button>

      <p className="mb-6 text-lg">Turns: {turns}</p>

      {won && (
        <p className="mb-6 text-2x1 font-bold text-green-700">
          You cleared the board in {turns} turns.
        </p>
      )}

      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </>
  );
};

export default Grid;
