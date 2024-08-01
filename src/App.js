import "./App.css";
import { useState, useEffect } from "react";
import Square from "./components/square";
import { Patterns } from "./Patterns";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("⭕");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [win, setWin] = useState(false);

  useEffect(() => {
    checkWin();
    checkTie();
    if (player === "⭕") {
      setPlayer("❌");
    } else {
      setPlayer("⭕");
    }
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      setWin(true);
    }
  }, [result]);

  const handleClick = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx === square && !val) {
          return player;
        }
        return val;
      })
    );
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer) {
        let foundWinningPattern = true;
        currPattern.forEach((idx) => {
          if (board[idx] !== firstPlayer) {
            foundWinningPattern = false;
          }
        });
        if (foundWinningPattern) {
          setResult({ winner: player, state: "Won" });
        }
      }
    });
  };

  const checkTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === null) {
        filled = false;
      }
    });

    if (filled && result.state === "none") {
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("⭕");
    setResult({ winner: "none", state: "none" });
    setWin(false);
  };

  return (
    <div className="App">
      <div className="board">
        <h1 className="title">
          Let's Play <br /> Tic Tac Toe
        </h1>
        <div className="row">
          <Square
            chooseSquare={() => handleClick(0)}
            val={board[0]}
          />
          <Square
            chooseSquare={() => handleClick(1)}
            val={board[1]}
          />
          <Square
            chooseSquare={() => handleClick(2)}
            val={board[2]}
          />
        </div>
        <div className="row">
          <Square
            chooseSquare={() => handleClick(3)}
            val={board[3]}
          />
          <Square
            chooseSquare={() => handleClick(4)}
            val={board[4]}
          />
          <Square
            chooseSquare={() => handleClick(5)}
            val={board[5]}
          />
        </div>
        <div className="row">
          <Square
            chooseSquare={() => handleClick(6)}
            val={board[6]}
          />
          <Square
            chooseSquare={() => handleClick(7)}
            val={board[7]}
          />
          <Square
            chooseSquare={() => handleClick(8)}
            val={board[8]}
          />
        </div>
      </div>
      {win && (
        <div className="overlay">
          <div className="message">
            {result.state === "Won" ? `Winner: ${result.winner}` : "It's a Tie!"}
          </div>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
