import React, { useState, useEffect } from "react";
import "./App.css";

import { Header } from "./components/Header";
import { Board } from "./components/Board";
import { Card } from "./components/Card";
import { WORDS } from "./words.js";
import { isMobile } from "utils/isMobile";

import NoSleep from "nosleep.js";
import seedRandom from "seedrandom";
import seededShuffle from "seededshuffle";

const GAME_SIZE = 25;
const INITIAL_BOARD = new Array(GAME_SIZE).fill(0);
const SOLUTIONS_COUNT = [9, 8, 7, 1];
const SOLUTIONS_COLORS = [
  "var(--team-1)",
  "var(--team-2)",
  "var(--neutral)",
  "var(--death)"
];

const initSeed = localStorage.getItem("seed") ||
      Math.floor(1000 + Math.random() * 9000).toString();

if (localStorage.getItem("seed")) {
  localStorage.removeItem("seed");
}

const checkWinner = (first, score) => {
  return score[first] === SOLUTIONS_COUNT[0] || score[1 - first] === SOLUTIONS_COUNT[1];
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

const setSeedAndStore = (setUpdating, setSeed, updateBoard) => newSeed => {
  setUpdating(true);
  localStorage.setItem("seed", newSeed);
  setSeed(newSeed);
  updateBoard(INITIAL_BOARD);
  setTimeout(() => {
    setUpdating(false);
  }, 100);
};

const App = () => {
  const [seed, setSeed] = useState(initSeed);
  const [updating, setUpdating] = useState(false);
  const [first, setFirst] = useState(0);
  const [words, setWords] = useState([]);
  const [board, updateBoard] = useState(INITIAL_BOARD);
  const [shuffledSolutions, setShuffledSolutions] = useState([]);
  const [score, setScore] = useState(new Array(SOLUTIONS_COUNT.length).fill(0));

  useEffect( () => {
    const rng = seedRandom(seed);

    setFirst(Math.round(rng())); // 0 or 1

    const tempWords = [];
    for (; tempWords.length < GAME_SIZE; ) {
      var word;
      do {
        word = WORDS[Math.floor(rng() * WORDS.length)];
      } while (tempWords.includes(word));
      tempWords.push(word);
    }
    setWords(tempWords)
  }, [seed])

  useEffect(() => {
    const solutions = SOLUTIONS_COUNT.flatMap((v, i) => Array(v).fill(i));
    if (first === 1) {
      solutions[SOLUTIONS_COUNT[0] - 1] = 1;
    }
    setShuffledSolutions(seededShuffle.shuffle(solutions, seed, true));
  }, [first, seed])

  useEffect(() => {
    setScore(checkScore(shuffledSolutions, board))
  }, [shuffledSolutions, board]);

  useEffect(() => {
    if (checkWinner(first, score)) {
      confetti.start(); // eslint-disable-line
    }
  }, [first, score]);

  useEffect(() => {
    // Enable wake lock.
    // (must be wrapped in a user input event handler e.g. a mouse or touch handler)
    const noSleep = new NoSleep();
    const enableNoSleep = () => {
      document.removeEventListener("click", enableNoSleep, false);
      noSleep.enable();
    };
    document.addEventListener("click", enableNoSleep, false);
  }, []);

  return (
    <div className="App">
      <Header
        seed={seed}
        setSeed={setSeedAndStore(setUpdating, setSeed, updateBoard)}
        startingTeam={first}
        score={score}
      />
      <Board>
        {shuffledSolutions.map((v, i) => {
          return (
            <Card
              key={i}
              color={SOLUTIONS_COLORS[v]}
              content={words[i]}
              isMobile={isMobile}
              updating={updating}
              addCardToScore={addCardToScore(i, board, updateBoard)}
            />
          );
        })}
      </Board>
    </div>
  );
};

export default App;
