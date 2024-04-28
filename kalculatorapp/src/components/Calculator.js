import React, { useState, useEffect, useCallback, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

import Display from "./Display";
import "./Calculator.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);
  const [equation, setEquation] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);

  const buttonClickHandler = useCallback(
    (value) => {
       if (value === "C") {
         setDisplay("0");
         setMemory(null);
         setOperator(null);
         setEquation("");
         return;
       }
      
       if (["+", "-", "*", "/"].includes(value)) {
         setMemory(display);
         setOperator(value);
         setDisplay("0");
         setEquation(equation + display + " " + value + " ");
       } else if (value === "=") {
         if (!operator || !memory) {
           return;
         }
         const result = eval(memory + operator + display);
         setDisplay("");
         setMemory(null);
         setOperator(null);
         setEquation(equation + display + " = " + result);
       }


      if (value >= "0" && value <= "9") {
        if (display === "0") {
          setDisplay(value);
        } else {
          setDisplay(display + value);
        }
      } else if (value === "+/-") {
        setDisplay((parseFloat(display) * -1).toString());
      } else if (value === "%") {
        setDisplay((parseFloat(display) / 100).toString());
      } else if (value === "C") {
        setDisplay("0");
        setMemory(null);
        setOperator(null);
      } else if (value === "DEL") {
        if (display.length === 1) {
          setDisplay("0");
        } else {
          setDisplay(display.slice(0, -1));
        }
      } else if (["+", "-", "*", "/"].includes(value)) {
        setMemory(display);
        setOperator(value);
        setDisplay("0");
      } else if (value === "=") {
        if (!operator || !memory) {
          return;
        }
        let result;
        switch (operator) {
          case "+":
            result = parseFloat(memory) + parseFloat(display);
            break;
          case "-":
            result = parseFloat(memory) - parseFloat(display);
            break;
          case "*":
            result = parseFloat(memory) * parseFloat(display);
            break;
          case "/":
            result = parseFloat(memory) / parseFloat(display);
            break;
          default:
            break;
        }
        setDisplay("");
        setMemory(null);
        setOperator(null);
      }
    },
    [display, operator, memory, equation]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.key >= "0" && event.key <= "9") || event.key === ".") {
        buttonClickHandler(event.key);
      } else if (event.key === "Enter") {
        buttonClickHandler("=");
      } else if (event.key === "Backspace") {
        buttonClickHandler("DEL");
      } else if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/"
      ) {
        buttonClickHandler(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [buttonClickHandler]);

  return (
    <div className={`Calculator ${theme}`}>
      {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
      <div className="theme-switch">
        <span className="theme-text">Blue</span>
        <label className="switch">
          <input type="checkbox" onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
        <span className="theme-text">Red</span>
      </div>

      <Display value={equation + display} />
      <section className="buttons">
        <button onClick={() => buttonClickHandler("C")}>C</button>
        <button onClick={() => buttonClickHandler("+/-")}>+/-</button>
        <button onClick={() => buttonClickHandler("%")}>%</button>
        <button onClick={() => buttonClickHandler("/")}>/</button>
        {/* swap */}
        <button onClick={() => buttonClickHandler("7")}>7</button>
        <button onClick={() => buttonClickHandler("8")}>8</button>
        <button onClick={() => buttonClickHandler("9")}>9</button>
        {/* swap */}
        <button onClick={() => buttonClickHandler("*")}>*</button>
        <button onClick={() => buttonClickHandler("4")}>4</button>
        <button onClick={() => buttonClickHandler("5")}>5</button>
        <button onClick={() => buttonClickHandler("6")}>6</button>
        <button onClick={() => buttonClickHandler("-")}>-</button>
        {/* swap */}
        <button onClick={() => buttonClickHandler("1")}>1</button>
        <button onClick={() => buttonClickHandler("2")}>2</button>
        <button onClick={() => buttonClickHandler("3")}>3</button>
        {/* swap */}
        <button onClick={() => buttonClickHandler("+")}>+</button>
        <button onClick={() => buttonClickHandler("DEL")}>DEL</button>
        <button onClick={() => buttonClickHandler("0")}>0</button>
        <button onClick={() => buttonClickHandler(".")}>.</button>
        <button onClick={() => buttonClickHandler("=")}>=</button>
      </section>
    </div>
  );
}

export default Calculator;
