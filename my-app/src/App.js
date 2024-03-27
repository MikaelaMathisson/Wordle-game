import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "./Words";
import GameOver from "./components/GameOver";
import Nav from "./components/Nav";
import HighscoreForm from "./components/HighscoreForm"; // Import the HighscoreForm component
export const AppContext = createContext();

export default function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const [startTime, setStartTime] = useState(null); // Track start time
  const [endTime, setEndTime] = useState(null); // Track end time

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      setStartTime(new Date()); // Set start time when the game starts
    });
  }, []);

  useEffect(() => {
    if (gameOver.gameOver) {
      setEndTime(new Date()); // Set end time when the game ends
    }
  }, [gameOver]);

  const getTimeSpent = () => {
    if (startTime && endTime) {
      const timeDifference = endTime - startTime;
      // Convert milliseconds to seconds
      return Math.floor(timeDifference / 1000);
    }
    return 0;
  };
  const handleHighscoreSubmission = (formData) => {
    const timeSpent = getTimeSpent();
    const guessesMade = currAttempt.attempt; // Calculate guesses made based on the number of attempts
    const highscoreData = {
      name: formData.name,
      timeSpent,
      guessesMade,
      wordLength: formData.wordLength,
      uniqueLetters: formData.uniqueLetters,
      correctWord,
    };

    // Here, you can send highscoreData to your backend for storage
    console.log("Highscore submitted:", highscoreData);
  };

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      handleHighscoreSubmission(); // Call the function to submit highscore
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  return (
    <div className="App">
      <Nav />
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          setDisabledLetters,
          disabledLetters,
          setGameOver,
          gameOver,
          getTimeSpent,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          {gameOver.gameOver && (
            <HighscoreForm onSubmit={handleHighscoreSubmission} />
          )}{" "}
          {/* Render HighscoreForm component when game is over */}
          <p>Time spent playing: {getTimeSpent()} seconds</p>
        </div>
      </AppContext.Provider>
    </div>
  );
}
