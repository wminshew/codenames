import React, { useState, useEffect } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
import "./App.css";
import styled from "styled-components";

import { Header } from "./components/Header";
import { Board } from "./components/Board";
import { Card } from "./components/Card";
import { WORDS } from "./words.js";
import { isMobile } from "utils/isMobile";

// import NoSleep from "nosleep.js";
import seedRandom from "seedrandom";
import seededShuffle from "seededshuffle";

const Button = styled.button`
  transition: var(--transition);
  border: none;
  padding: var(--em) calc(var(--em) * 2);
  border-radius: var(--radius);
  background-color: ${props =>
    props.disabled ? "rgba(255,255,255,0.25)" : "var(--primary)"};
  font-size: var(--text-large);
  font-weight: var(--text-semi-bold);
  color: ${props =>
    props.disabled ? "rgba(255,255,255,0.68)" : "var(--grey-dark-2)"};
  margin: 0 var(--em);
  &:hover {
    cursor: ${props => (props.disabled ? "default" : "pointer")};
  }
  &:focus {
    outline: none;
  }
`;

const GAME_SIZE = 25;
const INITIAL_BOARD = new Array(GAME_SIZE).fill(0);
const SOLUTIONS_COUNT = [9, 8, 7, 1];
const SOLUTIONS_COLORS = [
  "var(--team-1)",
  "var(--team-2)",
  "var(--neutral)",
  "var(--death)"
];
const CONFETTI_TIMER = 4000;

const initSeed = Math.floor(1000 + Math.random() * 9000).toString();

const checkWinner = (first, score) => {
  return (
    score[first] === SOLUTIONS_COUNT[0] ||
    score[1 - first] === SOLUTIONS_COUNT[1]
  );
};

const checkScore = (solution, board) => {
  const score = [0, 0, 0, 0];
  board.forEach((v, i) => {
    score[solution[i]] += v;
  });
  return score;
};

const addCardToScore = (key, board, updateBoard) => () => {
  const newBoard = board.slice(0);
  newBoard[key] = 1;
  updateBoard(newBoard);
};

const App = ({ history }) => {
  const params = useParams();
  const seed = params["seed"];
  if (!seed) {
    history.replace({
      pathname: `/${initSeed}`
    });
  }

  const [first, setFirst] = useState(0);
  const [words, setWords] = useState([]);
  const [board, updateBoard] = useState(INITIAL_BOARD);
  const [shuffledSolutions, setShuffledSolutions] = useState([]);
  const [score, setScore] = useState(new Array(SOLUTIONS_COUNT.length).fill(0));
  const [revealed, setReveal] = useState(false);
  const [gameOver, setGameover] = useState(false);

  useEffect(() => {
    const rng = seedRandom(seed + "\0");

    setFirst(Math.round(rng())); // 0 or 1

    const tempWords = [];
    for (; tempWords.length < GAME_SIZE; ) {
      var word;
      do {
        word = WORDS[Math.floor(rng() * WORDS.length)];
      } while (tempWords.includes(word));
      tempWords.push(word);
    }
    setWords(tempWords);
  }, [seed]);

  useEffect(() => {
    const solutions = SOLUTIONS_COUNT.flatMap((v, i) => Array(v).fill(i));
    if (first === 1) {
      solutions[SOLUTIONS_COUNT[0] - 1] = 1;
    }
    setShuffledSolutions(seededShuffle.shuffle(solutions, seed, true));
  }, [first, seed]);

  useEffect(() => {
    setScore(checkScore(shuffledSolutions, board));
  }, [shuffledSolutions, board]);

  useEffect(() => {
    if (checkWinner(first, score)) {
      confetti.start(); // eslint-disable-line
      setGameover(true);
      setTimeout(() => {
        confetti.stop(); // eslint-disable-line
      }, CONFETTI_TIMER);
    }
  }, [first, score]);

  // useEffect(() => {
  //   // Enable wake lock.
  //   // (must be wrapped in a user input event handler e.g. a mouse or touch handler)
  //   const noSleep = new NoSleep();
  //   const enableNoSleep = () => {
  //     document.removeEventListener("click", enableNoSleep, false);
  //     noSleep.enable();
  //   };
  //   document.addEventListener("click", enableNoSleep, false);
  // }, []);
  //
  return (
    <div className="App">
      <Header seed={seed} startingTeam={first} score={score} />
      <Board>
        {shuffledSolutions.map((v, i) => {
          return (
            <Card
              key={i}
              color={SOLUTIONS_COLORS[v]}
              content={words[i]}
              isMobile={isMobile}
              isRevealed={revealed}
              addCardToScore={addCardToScore(i, board, updateBoard)}
            />
          );
        })}
        {isMobile && !revealed && !gameOver && (
          <div
            style={{
              position: "absolute",
              bottom: 16,
              textAlign: "center",
              width: "100%"
            }}
          >
            <Button type={"submit"} onClick={() => setReveal(true)}>
              Reveal Board
            </Button>
          </div>
        )}
        {gameOver && (
          <div
            style={{
              position: "absolute",
              bottom: 16,
              textAlign: "center",
              width: "100%"
            }}
          >
            <Link to={`/${initSeed}`}>
              <Button type={"submit"} onClick={() => setGameover(false)}>
                <span style={{ fontSize: 30 }}>Start New Game</span>
              </Button>
            </Link>
          </div>
        )}
      </Board>
    </div>
  );
};

export default withRouter(App);
