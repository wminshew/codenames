import React from "react";
import "./App.css";

import { Header } from "./components/Header";
import { Board } from "./components/Board";
import { Card } from "./components/Card";

import { WORDS } from "./words.js"
const GAME_SIZE = 25;
const SOLUTIONS_COUNT = [ 9, 8, 7, 1 ];
const SOLUTIONS_COLORS = [
  "#a83236",
  "#1d18ab",
  "#baad18",
  "#000000",
]

const SeededShuffle = require('seededshuffle');
const seed = Date.now();

const words = [];
for(; words.length < GAME_SIZE; ) {
  var word;
  do {
    word = WORDS[Math.floor(Math.random() * WORDS.length)];
  } while (words.includes(word));
  words.push(word);
}

const solutions = SOLUTIONS_COUNT.flatMap( (v, i) =>
  Array(v).fill(i) );

const first = Math.round(Math.random()); // 0 or 1
if ( first === 1 ) {
  solutions[SOLUTIONS_COUNT[0] - 1] = first;
}

const shuffledSolutions = SeededShuffle.shuffle(solutions, seed, true);

const App = () => {
  return (
    <div className="App">
      <Header />
      <Board>
        {shuffledSolutions.map( (v, i) => {
          return <Card key={i} color={SOLUTIONS_COLORS[v]} content={words[i]} />;
        })}
      </Board>
    </div>
  );
}

export default App;
