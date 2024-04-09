import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "./Words";
import GameOver from "./components/GameOver";
import Nav from "./components/Nav";
import HighscoreForm from "./components/HighscoreForm";
export const AppContext = createContext();
import { About } from "./pages/About";
import { Highscore } from "./pages/Highscores";

const defaultSettings = {
  wordLength: "", // Default word length
  allowRepetition: false, // Default: Do not allow repetition of letters
};

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
  const [settings, setSettings] = useState(defaultSettings); // State for settings

  useEffect(() => {
    generateWordSet(settings.wordLength, settings.allowRepetition).then(
      (words) => {
        setWordSet(words.wordSet);
        setCorrectWord(words.todaysWord);
        setStartTime(new Date()); // Set start time when the game starts
      }
    );
  }, [settings]);

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
  const handleHighscoreSubmission = async (formData) => {
    const timeSpent = getTimeSpent();
    const guessesMade = currAttempt.attempt; // Calculate guesses made based on the number of attempts
    const highscoreData = {
      name: formData.name,
      timeSpent,
      guessesMade,
      wordLength: settings.wordLength,
      allowRepetition: settings.allowRepetition,
      correctWord,
    };
    // SKA SKICKAS HÄR TILL server/server.js filen som sedan skickar till mongodb
    // databas och sedan hämtar alla highscores form mongodb och  visar på highscore listan
    await fetch("http://localhost:5080/api/highscores", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(highscoreData),
    });
    //FIXA: SEND highscoreData to backend
    console.log("Highscore submitted:", highscoreData);
  };

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > settings.wordLength - 1) return;
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
    if (currAttempt.letterPos !== settings.wordLength) return;

    let currWord = "";
    for (let i = 0; i < settings.wordLength; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      handleHighscoreSubmission(); // Function to submit highscore
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const handleSettingsChange = (updatedSettings) => {
    console.log("Updated settings:", updatedSettings);

    // Validate the word length
    const newWordLength = parseInt(updatedSettings.wordLength);
    if (
      isNaN(newWordLength) || // Check if it's not a number
      newWordLength < 3 || // Check if it's less than 3
      newWordLength > 5 // Check if it's greater than 5
    ) {
      console.log(
        "Invalid word length. Please enter a number between 3 and 5."
      );
      return; // Don't update settings if the input is invalid
    }

    setSettings(updatedSettings);
  };

  return (
    <div className="App">
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/highscores" element={<Highscore />} />
          </Routes>
        </div>
      </Router>
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
          <div>
            <label>
              Word Length:
              <input
                type="number"
                value={settings.wordLength}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  console.log("Word length changed:", newValue);
                  if (!isNaN(newValue)) {
                    handleSettingsChange({
                      ...settings,
                      wordLength: newValue,
                    });
                  }
                }}
              />
            </label>
            <label>
              Allow Repetition:
              <input
                type="checkbox"
                checked={settings.allowRepetition}
                onChange={(e) => {
                  console.log("Allow repetition changed:", e.target.checked);
                  handleSettingsChange({
                    ...settings,
                    allowRepetition: e.target.checked,
                  });
                }}
              />
            </label>
          </div>
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
