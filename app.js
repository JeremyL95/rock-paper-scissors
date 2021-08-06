const game = () => {
  let pScore = 0;
  let cScore = 0;
  const resultDisplay = document.getElementById("result");

  //start game
  const startGame = () => {
    const btnStart = document.getElementById("btn-start");
    const introScene = document.querySelector(".intro");
    const gameScene = document.querySelector(".container");

    btnStart.addEventListener("click", () => {
      introScene.classList.add("fadeOut");
      gameScene.classList.add("fadeIn");
    });
  };

  const gameLogic = () => {
    const choices = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const compHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    //reset the hands animation once player and comp chose
    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    //computer choice
    const compOptions = ["rock", "paper", "scissors"];

    choices.forEach((choice) => {
      choice.addEventListener("click", function () {
        //generate random choices
        const generateRandom = Math.floor(Math.random() * 3);
        const compChoices = compOptions[generateRandom];

        setTimeout(() => {
          //passing player choice and computer choice to compare result
          getResult(this.textContent, compChoices);

          //updating images
          playerHand.src = `img/${this.textContent}.png`;
          compHand.src = `img/${compChoices}.png`;
        }, 2000);

        resultDisplay.innerHTML = "One Two Choose...";

        //add animation for both hands
        playerHand.style.animation = "playerChoosing 2s ease";
        compHand.style.animation = "computerChoosing 2s ease";
      });
    });
  };

  //updating score
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const compScore = document.querySelector(".computer-score p");
    const gameScene = document.querySelector(".container");
    const finalScore = document.querySelector(".final-score");
    const outroScene = document.querySelector(".outro");

    playerScore.textContent = pScore;
    compScore.textContent = cScore;

    //checking score
    if (pScore === 3) {
      setTimeout(() => {
        finalScore.innerHTML = "You Win";
        outroScene.classList.add("fadeIn");
        gameScene.classList.remove("fadeIn");
        gameScene.classList.add("fadeOut");
      }, 2000);
    }

    if (cScore === 3) {
      setTimeout(() => {
        finalScore.innerHTML = "Computer Wins";
        outroScene.classList.add("fadeIn");
        gameScene.classList.remove("fadeIn");
        gameScene.classList.add("fadeOut");
      }, 2000);
    }
  };

  //comparing result
  const getResult = (playerChoice, computerChoice) => {
    switch (playerChoice + computerChoice) {
      case "paperrock":
      case "scissorspaper":
      case "rockscissors":
        resultDisplay.innerHTML = "You Win";
        pScore++;
        updateScore();
        break;

      case "rockpaper":
      case "paperscissors":
      case "scissorsrock":
        resultDisplay.innerHTML = "Computer Wins";
        cScore++;
        updateScore();
        break;

      case "paperpaper":
      case "scissorsscissors":
      case "rockrock":
        resultDisplay.innerHTML = "It is a draw";
        break;
    }
  };

  startGame();
  gameLogic();
};

game();
