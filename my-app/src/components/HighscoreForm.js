import React, { useState } from "react";

const HighscoreForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    guessesMade: 0,
    wordLength: 0,
    uniqueLetters: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the onSubmit function passed from App.js
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default HighscoreForm;
