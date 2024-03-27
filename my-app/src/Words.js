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
  try {
    const response = await fetch(wordBank);
    if (!response.ok) {
      throw new Error("Failed to fetch word bank");
    }
    const result = await response.text();
    const wordArr = result.split("\n").map((word) => word.trim()); // Trim whitespace
    const filteredWords = wordArr.filter((word) => word.length === wordLength);
    if (filteredWords.length === 0) {
      throw new Error("No words found for the specified length");
    }
    const todaysWord =
      filteredWords[Math.floor(Math.random() * filteredWords.length)];
    const wordSet = new Set(filteredWords);
    return { wordSet, todaysWord };
  } catch (error) {
    console.error("Error generating word set:", error);
    return { wordSet: new Set(), todaysWord: "" };
  }
};
