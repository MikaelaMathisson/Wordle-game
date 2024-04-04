import React from "react";
function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Mikaela's Wordle game
      </a>
      <ul>
        <li className="active">
          <a href="/">Play Wordle</a>
        </li>
        <li>
          <a href="/about">Information</a>
        </li>
        <li>
          <a href="/highscores">Highscores</a>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
