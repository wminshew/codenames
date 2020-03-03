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

const initSeed =
  localStorage.getItem("seed") ||
  Math.floor(1000 + Math.random() * 9000).toString();

if (localStorage.getItem("seed")) {
  localStorage.removeItem("seed");
}

const checkWinner = (first, solution, board) => {
  const score = checkScore(solution, board);
  console.log("First Remaining: " + (9 - score[first]));
  console.log("Second Remaining: " + (8 - score[1 - first]));
  return score[first] === 9 || score[1 - first] === 8;
};

const checkScore = (solution, board) => {
  const score = [0, 0, 0, 0];
  board.map((v, i) => {
    score[solution[i]] += v;
  });
  return score;
};

const App = () => {
  const [seed, changeSeed] = useState(initSeed);
  const [updating, setUpdating] = useState(false);
  const [board, updateBoard] = useState(INITIAL_BOARD);

  const changeSeedAndStore = newSeed => {
    setUpdating(true);
    localStorage.setItem("seed", newSeed);
    changeSeed(newSeed);
    updateBoard(INITIAL_BOARD);
    setTimeout(() => {
      setUpdating(false);
    }, 100);
  };

  const rng = seedRandom(seed);

  // TODO: use javascript set and then convert to array?
  const words = [];
  for (; words.length < GAME_SIZE; ) {
    var word;
    do {
      word = WORDS[Math.floor(rng() * WORDS.length)];
    } while (words.includes(word));
    words.push(word);
  }

  const solutions = SOLUTIONS_COUNT.flatMap((v, i) => Array(v).fill(i));
  const first = Math.round(rng()); // 0 or 1
  if (first === 1) {
    solutions[SOLUTIONS_COUNT[0] - 1] = first;
  }
  const shuffledSolutions = seededShuffle.shuffle(solutions, seed, true);

  useEffect(() => {
    if (checkWinner(first, shuffledSolutions, board)) {
      confetti.start(); // eslint-disable-line
    }
  }, [board]);

  const addCardToScore = key => {
    return () => {
      const newBoard = board.slice(0);
      newBoard[key] = 1;
      updateBoard(newBoard);
    };
  };

  // Enable wake lock.
  // (must be wrapped in a user input event handler e.g. a mouse or touch handler)
  const noSleep = new NoSleep();
  const enableNoSleep = () => {
    document.removeEventListener("click", enableNoSleep, false);
    document.removeEventListener("touchstart", enableNoSleep, false);
    noSleep.enable();
  };
  document.addEventListener("click", enableNoSleep, false);
  document.addEventListener("touchstart", enableNoSleep, false);

  return (
    <div className="App">
      <Header
        seed={seed}
        changeSeed={changeSeedAndStore}
        startingTeam={first}
      />{" "}
      <Board>
        {" "}
        {shuffledSolutions.map((v, i) => {
          return (
            <Card
              key={i}
              color={SOLUTIONS_COLORS[v]}
              content={words[i]}
              isMobile={isMobile}
              updating={updating}
              addCardToScore={addCardToScore(i)}
            />
          );
        })}{" "}
      </Board>{" "}
    </div>
  );
};

export default App;
