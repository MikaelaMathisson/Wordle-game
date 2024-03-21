import React from "react";
function Navbar() {
  return (
    <nav>
      <div>
        <ul>
          <li>
            <a href="/">Play Wordle</a>
          </li>
          <li>
            <a href="/info">Information</a>
          </li>
          <li>
            <a href="/highscores">Highscores</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
