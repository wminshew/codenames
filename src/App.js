import React, { useState } from "react";
import "./App.css";

import { Header } from "./components/Header";
import { Board } from "./components/Board";
import { Card } from "./components/Card";
import { WORDS } from "./words.js";
import { isMobile } from "utils/isMobile";

import seedRandom from "seedrandom";
import seededShuffle from "seededshuffle";

const GAME_SIZE = 25;
const SOLUTIONS_COUNT = [9, 8, 7, 1];
const SOLUTIONS_COLORS = [
  "var(--team-1)",
  "var(--team-2)",
  "var(--neutral)",
  "var(--death)"
];

const initSeed = localStorage.getItem('seed') ||
  Math.floor(1000 + Math.random() * 9000);

if (localStorage.getItem('seed')) {
  localStorage.removeItem('seed');
}

const App = () => {
  const [seed, changeSeed] = useState(initSeed);
  const [updating, setUpdating] = useState(false);
  const changeSeedAndStore = (newSeed) => {
    setUpdating(true);
    localStorage.setItem('seed', newSeed);
    changeSeed(newSeed);
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

  return (
    <div className="App">
      <Header seed={seed} changeSeed={changeSeedAndStore} startingTeam={first} />
      <Board>
        {shuffledSolutions.map((v, i) => {
          return (
            <Card
              key={i}
              color={SOLUTIONS_COLORS[v]}
              content={words[i]}
              revealed={isMobile}
              updating={updating}
            />
          );
        })}
      </Board>
    </div>
  );
};

export default App;
