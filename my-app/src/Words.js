import wordBank from "./wordle-bank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async (wordLength) => {
  let wordSet;
  let todaysWord;
  try {
    const response = await fetch(wordBank);
    if (!response.ok) {
      throw new Error("Failed to fetch word bank");
    }
    const result = await response.text();
    const wordArr = result.split("\n");
    const filteredWords = wordArr.filter((word) => word.length === wordLength);
    todaysWord =
      filteredWords[Math.floor(Math.random() * filteredWords.length)];
    wordSet = new Set(filteredWords);
    return { wordSet, todaysWord };
  } catch (error) {
    console.error("Error generating word set:", error);
    return { wordSet: new Set(), todaysWord: "" };
  }
};
