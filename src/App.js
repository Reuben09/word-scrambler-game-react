import { useState, useEffect, useRef } from "react";
import "./styles.css";
import { Words } from "./word";

export default function App() {
  const [startGame, setStartGame] = useState(false);
  const [wordData, setWordData] = useState(Words);
  const [randomObject, setRandomObject] = useState();
  const [randomIndex, setRandomIndex] = useState();
  const [shuffledWordArray, setShuffledWordArray] = useState();
  const [wordInputValue, setWordInputValue] = useState("");
  const [timer, setTimer] = useState(30);

  const initGame = () => {
    setStartGame(true);
    // get random object from words
    let randomIndex = Math.floor(Math.random() * wordData.length); // get random index value
    setRandomIndex(randomIndex);
    let randomObject = wordData[randomIndex];
    setRandomObject(randomObject);
    //split the word into an array and shuffle
    let wordArray = randomObject.word.split(""); //split each letter of word into an array of letters
    let shuffledWordArray = wordArray.sort(() => Math.random() - 0.5);
    setShuffledWordArray(shuffledWordArray);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    const myTimer = setInterval(() => {
      setTimer((timer) => timer - 1);
      if (timer === 0) {
        alert(`Time up! the answer is ${randomObject.word}`);
        setTimer(30);
        initGame();
      }
    }, 1000);
    return () => clearInterval(myTimer);
  }, [timer]);

  const checkWord = () => {
    if (!wordInputValue) {
      alert("input a value");
    } else if (wordInputValue.toLowerCase() !== randomObject.word) {
      alert(`${wordInputValue} wrong word`);
    } else {
      alert(`ahh nice, ${wordInputValue} is the right word`);
      setWordInputValue("");
      initGame();
      setTimer(30);
    }
  };
  const refreshWord = () => {
    initGame();
    setTimer(30);
  };
  return (
    <div className="App-container">
      <div className="title-container">
        <h1>Word Scramble</h1>
      </div>
      <div className="word-container">
        {startGame &&
          shuffledWordArray.map((item) => {
            return <h1>{item}</h1>;
          })}
      </div>
      <div className="hint-container">
        <p>Hint: {startGame && randomObject.hint}</p>
      </div>
      <div className="time-container">
        <p>Time: {startGame && timer}s</p>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={wordInputValue}
          onChange={(e) => setWordInputValue(e.target.value)}
          maxlength={startGame && randomObject.word.length}
          placeholder="Enter a valid word"
        />
      </div>
      <div className="button-container">
        <button className="refresh" onClick={refreshWord}>
          Refresh Word
        </button>
        <button className="check" onClick={checkWord}>
          Check Word
        </button>
      </div>
    </div>
  );
}
