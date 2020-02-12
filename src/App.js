import React from "react";
import "./App.css";

import { Header } from "./components/Header";
import { Board } from "./components/Board";
import { Card } from "./components/Card";

const cards = [
  {
    id: 1,
    content: "Content?",
    color: "#DDD"
  },
  {
    id: 2,
    content: "Content?",
    color: "#DDD"
  },
  {
    id: 3,
    content: "Content?",
    color: "#747298"
  },
  {
    id: 4,
    content: "Content?",
    color: "#DDD"
  },
  {
    id: 5,
    content: "Content?",
    color: "#39F"
  },
  {
    id: 6,
    content: "Content?",
    color: "#DDD"
  },
  {
    id: 7,
    content: "Content?",
    color: "#DDD"
  },
  {
    id: 8,
    content: "Content?",
    color: "#DDD"
  },
  {
    id: 9,
    content: "Content?",
    color: "#DDD"
  },
  {
    id: 10,
    content: "Content?",
    color: "#DDD"
  },
  {
    id: 11,
    content: "Content?",
    color: "#DDD"
  },
  {
    id: 12,
    content: "Content?",
    color: "#DDD"
  }
];

function App() {
  return (
    <div className="App">
      <Header />
      <Board>
        {cards.map(i => {
          return <Card key={i.id} color={i.color} content={i.content} />;
        })}
      </Board>
    </div>
  );
}

export default App;
