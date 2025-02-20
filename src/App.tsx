import React from "react";
import { Header } from "./components/Header/Header";
import { BettingBoard } from "./components/BettingBoard/BettingBoard";
import "./styles/global.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <BettingBoard />
    </div>
  );
}

export default App;
