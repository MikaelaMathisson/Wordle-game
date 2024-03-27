import React, { useState, useContext } from "react";
import { AppContext } from "./App";

const HighscoreForm = ({ onClose }) => {
  const { getTimeSpent, correctWord, board } = useContext(AppContext);
  const [name, setName] = useState("");
  const [wordLength, setWordLength] = useState(5); // Default value
  const [uniqueLetters, setUniqueLetters] = useState(false); // Default value

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect all the data and submit to your backend or storage solution
    const highscoreData = {
      name,
      timeSpent: getTimeSpent(),
      guesses: board.map((row) => row.join("")),
      wordLength,
      uniqueLetters,
    };
    console.log("Submitted Highscore:", highscoreData);
    onClose(); // Close the form after submission
  };

  return (
    <div className="highscore-form">
      <h2>Submit Highscore</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Word Length:
          <input
            type="number"
            value={wordLength}
            onChange={(e) => setWordLength(parseInt(e.target.value))}
            min={3}
            max={10}
            required
          />
        </label>
        <label>
          Unique Letters:
          <input
            type="checkbox"
            checked={uniqueLetters}
            onChange={(e) => setUniqueLetters(e.target.checked)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HighscoreForm;
