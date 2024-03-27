/*
1. Red: Write a Failing Test
2. Green: Write the Minimum Code to Pass the Test
3. Refactor: Improve Code Without Changing Functionality
4. Repeat: Iterate the Cycle
*/

function selectWord(wordList, length, uniqueLetters) {
  if (length <= 0) {
    throw new Error("Invalid length parameter");
  }

  const validWords = wordList.filter((word) => word.length === length);

  if (validWords.length === 0) {
    throw new Error("No matching words found.");
  }

  const randomIndex = Math.floor(Math.random() * validWords.length);

  return validWords[randomIndex];
}
module.exports = selectWord;
