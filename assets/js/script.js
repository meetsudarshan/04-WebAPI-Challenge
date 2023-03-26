var timeLeft = 60;
var tiktok = document.getElementById("timer");
var scorer = document.getElementById("scorer");
var buttonsClick = document.getElementById("buttons");
var startQuiz = document.getElementById("start");
var askQuestion= document.getElementById("question-div");
var output = document.getElementById("results");
var options = document.getElementById("choices");
var questionCount = 0;
var score = 0


startQuiz.addEventListener("click", setTime);


function displayQuestions() {
  removeElements(startQuiz);

  if (questionCount < questions.length) {
    askQuestion.innerHTML = questions[questionCount].title;
    options.textContent = "";

    for (var i = 0; i < questions[questionCount].multiChoice.length; i++) {
      var myQuestion = document.createElement("button");
      myQuestion.innerText = questions[questionCount].multiChoice[i];
      myQuestion.setAttribute("data-id", i);
      myQuestion.addEventListener("click", function (event) {
        event.stopPropagation();

        if (myQuestion.innerText === questions[questionCount].answer) {
          score += timeLeft;
        } else {
          score -= 10;
          timeLeft = timeLeft - 15;
        }
       
        if (questionCount === questions.length) {
          return;
        } else {
          questionCount++;
          displayQuestions();
        }
      });
      options.append(myQuestion);
    }
  }
}



function captureUserScore() {
  tiktok.remove();
  options.textContent = "";


  output.innerHTML = `You scored ${score} points!`;
}

const removeElements = (...els) => {
  for (let myQuestion of els) myQuestion.remove();
}

viewScores();

function setTime() {
  displayQuestions();
  var timerInterval = setInterval(function() {
    timeLeft--;
    // tiktok.textContent = "";
    tiktok.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      captureUserScore();
    } 
  }, 1000);
}