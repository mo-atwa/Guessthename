// let test = document.querySelector("")

let theName = "Guess the player";
document.querySelector("h1").innerText = theName;
document.querySelector(
  "footer"
).innerHTML = `${theName} created by <span>Mohamed Atwa</span>`;
document.querySelector(".input");

//Setting game options
let numberOfTries = 5;
let currentTry = 1;
let numberOfHint = 3;

let guessButton = document.querySelector(".check");
let hintButton = document.querySelector(".hint");

let letterNumber;

// manage words
let wordToGuess = "";
let words = [
  "Messi",
  "Pele",
  "Maradona",
  "Zidane",
  "Neymar",
  "Mbappe",
  "Cristiano",
  "Ronaldo",
  "Einstein",
  "Newton",
  "Tesla",
  "Shakespeare",
  "Beethoven",
  "DaVinci",
  "Cleopatra",
  "Napoleon",
  "Gandhi",
  "Mandela",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase();

//manage hints
document.querySelector(".hint span").innerHTML = numberOfHint;
hintButton.addEventListener("click", getHint);

let numberOfLetters = wordToGuess.length;

function generateInput() {
  let inputsContainer = document.querySelector(".input");
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i} </span>`;
    if (i !== 1) tryDiv.classList.add("disabled-input");

    inputsContainer.appendChild(tryDiv);

    for (letterNumber = 1; letterNumber <= numberOfLetters; letterNumber++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${letterNumber}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
  }
  inputsContainer.children[0].children[1].focus();

  //Disable all input except frist one
  const inputDisabledDiv = document.querySelectorAll(".disabled-input input");
  inputDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target); //or this
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
      if (event.key === "Backspace") {
        const BackInput = currentIndex - 1;
        if (this.value.length === 0) inputs[BackInput].focus();
      }
      if (event.key === "Enter") {
        event.target.blur();
        guessButton.click();
      }
    });
  });
}

guessButton.addEventListener("click", hamdleGuess);

//check if inputField right or wrong
function hamdleGuess() {
  let successGuess = true;
  for (i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value;
    const actualLetter = wordToGuess[i - 1];
    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("wrong");
      successGuess = false;
    }
  }
  //check if user win or lose
  if (successGuess) {
    const allTrys = document.querySelectorAll(".input > div");
    allTrys.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));

    // add win massage
    const massage = document.querySelector(".message");
    massage.innerHTML = `<h3>Congratulations! 🎉</h3> <p>You find the word <span>${wordToGuess}</span> </p>`;
    massage.style.cssText = `
      background-color: #f0fdf4;
      color: #16a34a;
      border: solid #bbf7d0 1px;
    `;

    //Disabled buttons
    guessButton.disabled = true;
    hintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    const currentTryInput = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInput.forEach((input) => (input.disabled = true));

    currentTry++;
    const currentTryNextInput = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryNextInput.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      el.classList.remove("disabled-input");
      el.children[1].focus();
    } else {
      //Disabled buttons
      guessButton.disabled = true;
      hintButton.disabled = true;

      // add lose massage
      const massage = document.querySelector(".message");
      massage.innerHTML = `<h3>Game Over! </h3> <p>You didn't find the word <span>${wordToGuess}</span> </p>`;
      massage.style.cssText = `
         background-color: #fef2f2;
         color: #dc2626;
         border: 1px solid #fecaca;
    `;
    }
  }
}

//manage the hints
function getHint() {
  if (numberOfHint > 0) {
    numberOfHint--;
    document.querySelector(".hint span").innerHTML = numberOfHint;
  }
  if (numberOfHint === 0) {
    hintButton.disabled = true;
  }
  const enabledInputs = document.querySelectorAll(
    "input:not([disabled]):not(.hint)"
  );

  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyEnabledInputs.length > 0) {
    const rendomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[rendomIndex];
    const indexToFell = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFell !== -1) {
      randomInput.value = wordToGuess[indexToFell].toUpperCase();
    }
  }
}

window.onload = function () {
  generateInput();
};
