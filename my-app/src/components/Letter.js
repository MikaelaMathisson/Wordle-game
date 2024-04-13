import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currAttempt, setDisabledLetters } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct =
    correctWord && correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);
  const incorrect = !correct && !almost;

  let letterState = ""; // Default to empty string, resulting in "letter" class

  if (currAttempt.attempt > attemptVal && correct) {
    letterState = "correct";
  } else if (almost) {
    letterState = "almost";
  } else if (incorrect) {
    letterState = "error";
  }

  useEffect(() => {
    if (letter !== "" && incorrect) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [letter, incorrect, setDisabledLetters]);

  return <div className={`letter ${letterState}`}>{letter}</div>;
}

export default Letter;
