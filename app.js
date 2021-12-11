// Array of options
const GAMEOPTIONS = ["Rock", "Paper", "Scissor"];

// Score cards on screen
let humanScoreCard = document.querySelector(".humanScoreCard");
let computerScoreCard = document.querySelector(".computerScoreCard");

// Points
let humanPoints = 0;
let computerPoints = 0;

// Update Points
function updatePoints() {
  humanScoreCard.innerText = String(humanPoints);
  computerScoreCard.innerText = String(computerPoints);
}

// Human and computer hand
let humanHand = (hand) => GAMEOPTIONS.indexOf(hand);
let computerHand = () => Math.floor(Math.random() * GAMEOPTIONS.length);

// Result calculator
let result = (user, computer) => {
  if (user === computer) {
    return "tie";
  } else if ((user === 0 && computer === 2) || user === computer + 1) {
    humanPoints++;
    return "human";
  } else {
    computerPoints++;
    return "computer";
  }
};

function updateFrontEnd(human, computer, winner) {
  // Human update

  let humanVote = document.querySelector(
    `.${GAMEOPTIONS[human].toLocaleLowerCase()}.human`
  );
  humanVote.classList.add("selected");

  // Computer update
  let computerVote = document.querySelector(
    `.${GAMEOPTIONS[computer].toLocaleLowerCase()}.computer`
  );
  computerVote.classList.add("selected");

  if (humanPoints === 5 || computerPoints === 5) {
    winnerUpdate(winner);
    return;
  }

  if (winner !== "tie") {
    var winnerTag = document.querySelector(`.player.${winner}`);
    winnerTag.innerText = "Winner!";
    document.querySelector(`#${winner}`).classList.add("winner");
  } else {
    document.querySelector(".player.human").innerText = "Tie!";
    document.querySelector(".player.computer").innerText = "Tie!";
  }

  // Update Points
  updatePoints();

  // Clean Shop
  setTimeout(function () {
    humanVote.classList.remove("selected");
    computerVote.classList.remove("selected");

    if (winner !== "tie") {
      winnerTag.innerText = winner.charAt(0).toUpperCase() + winner.slice(1);
      document.querySelector(`#${winner}`).classList.remove("winner");
    } else {
      document.querySelector(".player.human").innerText = "Human";
      document.querySelector(".player.computer").innerText = "Computer";
    }
  }, 500);
}

function winnerUpdate(winner) {
  var announcement = document.querySelector(".announcement");
  announcement.classList.add("visible");

  let win = document.querySelector(".win");
  if (winner === "human") {
    win.innerText = "You win!";
  } else {
    win.innerText = "You lose!";
  }

  setTimeout(function () {
    announcement.classList.remove("visible");
    location.reload();
  }, 2000);
}

function game(e) {
  let human = humanHand(e);
  let computer = computerHand();
  let winner = result(human, computer);

  updateFrontEnd(human, computer, winner);
}

window.addEventListener("click", function (e) {
  const click = e.srcElement.innerText;

  if (GAMEOPTIONS.includes(click)) {
    game(click);
  }
});

window.addEventListener("touchstart", function (e) {
  const click = e.srcElement.innerText;

  if (GAMEOPTIONS.includes(click)) {
    game(click);
  }
});
