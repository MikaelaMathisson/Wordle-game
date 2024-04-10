import React from "react";
import { useLocation } from "react-router-dom";

export function About() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/about" && (
        <div>
          <h1>Information</h1>
          <p>
            <h3>Welcome to the Wordle Game!</h3>
            <p>
              Wordle is a word puzzle game where players try to guess a hidden
              word within a limited number of attempts.
            </p>
            Each guess is scored based on how close it is to the target word and
            how many letters it shares with the target word. In our version of
            the game, you'll be presented with a blank board where you can enter
            your guesses. The game will provide feedback on each guess, helping
            you narrow down the possibilities until you find the correct word.
            Challenge yourself to solve the puzzle in as few attempts as
            possible and compete with friends to see who can achieve the highest
            score!
            <p>Enjoy playing Wordle and have fun!</p>
          </p>
        </div>
      )}
    </div>
  );
}
