const gameText = document.getElementById('game-text');
const choicesDiv = document.getElementById('choices');

let totalScore = 0;
let step = 0;

const story = [
  {
    text: [
      "It’s 3:00 AM.",
      "You wake up to violent knocking on your apartment door.",
      "It’s pitch dark, no electricity, and your phone has no signal.",
      "A shadow is standing still under the door.",
      "What would you like to do?"
    ],
    options: ["Open the door", "Look through the peephole"]
  },
  {
    text: [
      "You open the door... no one is there.",
      randomKitchenEvent(),
      "What would you like to do?"
    ],
    options: ["Enter the kitchen to check it out", "Close the door quickly and lock it"]
  },
  {
    text: [
      'You encounter a dark entity, red eyes glowing, whispering: "If you touch me... you’ll see the truth."',
      "What would you like to do?"
    ],
    options: ["Touch the entity", "Run and hide"]
  },
  {
    text: [
      "You see memories that aren’t yours... fire, blood, screams.",
      "You lose control.",
      "What would you like to do?"
    ],
    options: ["Scream and try to wake up", "Surrender"]
  }
];

function randomKitchenEvent() {
  const events = [
    "A cold wind blows through the kitchen.",
    "You see a shadow move quickly to the kitchen.",
    "The kitchen door opens by itself, and black smoke seeps out."
  ];
  return events[Math.floor(Math.random() * events.length)];
}

function startGame() {
  totalScore = 0;
  step = 0;
  showStep();
}

function showStep() {
  gameText.innerHTML = "";
  story[step].text.forEach(line => {
    const p = document.createElement('p');
    p.textContent = line;
    gameText.appendChild(p);
  });

  choicesDiv.innerHTML = "";
  story[step].options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => handleChoice(index + 1);
    choicesDiv.appendChild(button);
  });
}

function handleChoice(choice) {
  if (step === 0) {
    totalScore += (choice === 1) ? 5 : 10;
  } else if (step === 1) {
    totalScore += 5;
  } else if (step === 2) {
    totalScore += (choice === 1) ? -5 : 10;
  } else if (step === 3) {
    endGame(choice);
    return;
  }
  step++;
  showStep();
}

function endGame(finalChoice) {
  gameText.innerHTML = "";
  choicesDiv.innerHTML = "";

  if (finalChoice === 1) {
    totalScore += 20;
    gameText.innerHTML = `
      <p>You leave the apartment, the sun rises, and it feels like you escaped a nightmare.</p>
      <p>But you know you’ll never be the same again...</p>
    `;
  } else {
    totalScore -= 10;
    gameText.innerHTML = `
      <p>You wake up again in the same place...</p>
      <p>You’ve become part of the entity inside the apartment.</p>
    `;
  }

  setTimeout(() => {
    if (totalScore >= 15) {
      gameText.innerHTML += `<h2>Congratulations, you won! 🎉</h2>`;
    } else {
      gameText.innerHTML += `<h2>Unfortunately, you lost. GAME OVER. ☠️</h2>`;
    }

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = "Play Again";
    playAgainButton.onclick = startGame;
    choicesDiv.appendChild(playAgainButton);

    const endButton = document.createElement('button');
    endButton.textContent = "End Game";
    endButton.onclick = () => {
      gameText.innerHTML += `<p>Thank you for playing my game! 🌟</p>`;
      choicesDiv.innerHTML = "";
    };
    choicesDiv.appendChild(endButton);
  }, 1500);
}

startGame();
