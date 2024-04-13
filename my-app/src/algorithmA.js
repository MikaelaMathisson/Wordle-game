function algorithmA(guess, correctWord) {
  guess = guess.toUpperCase();
  correctWord = correctWord.toUpperCase();

  return Array.from({ length: correctWord.length }, (_, i) => {
    const guessedLetter = guess[i];
    const correctLetter = correctWord[i];

    if (guessedLetter === correctLetter) {
      return { letter: guessedLetter, result: "correct" };
    }

    const isIncorrect =
      guess.split("").filter((char) => char === guessedLetter).length >
      correctWord.split("").filter((char) => char === guessedLetter).length;

    return {
      letter: guessedLetter,
      result: isIncorrect ? "incorrect" : "misplaced",
    };
  });
}

export default algorithmA;
