import React, { useContext, useCallback, useEffect } from "react";
import { AppContext } from "../App";
import Key from "./Key";

export default function Keyboard() {
  const { onDelete, onEnter, onSelectLetter, disabledLetters } =
    useContext(AppContext);

  const handleKeyboard = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        const allKeys = [
          "Q",
          "W",
          "E",
          "R",
          "T",
          "Y",
          "U",
          "I",
          "O",
          "P",
          "A",
          "S",
          "D",
          "F",
          "G",
          "H",
          "J",
          "K",
          "L",
          "Z",
          "X",
          "C",
          "V",
          "B",
          "N",
          "M",
        ];
        const pressedKey = event.key.toUpperCase();
        if (allKeys.includes(pressedKey)) {
          onSelectLetter(pressedKey);
        }
      }
    },
    [onDelete, onEnter, onSelectLetter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      <div className="line1">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key
            key={key}
            keyVal={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>
      <div className="line2">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key
            key={key}
            keyVal={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>
      <div className="line3">
        <Key key={"Delete"} keyVal={"Delete"} bigKey disabled={false} />
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key
            key={key}
            keyVal={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
        <Key key={"Enter"} keyVal={"Enter"} bigKey disabled={false} />
      </div>
    </div>
  );
}
