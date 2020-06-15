      var containerQuestionEl = document.getElementById("question-container");
      var containerStartEl = document.getElementById("starter-container");
      var containerEndEl = document.getElementById("end-container")
      var containerScoreEl = document.getElementById("score-banner")
      var formInitials = document.getElementById("initials-form")
      var containerHighScoresEl = document.getElementById("high-score-container")
      var ViewHighScoreEl = document.getElementById("view-high-scores")
      var listHighScoreEl = document.getElementById("high-score-list")
      var correctEl = document.getElementById("correct")
      var wrongEl = document.getElementById("wrong")
      //buttons
      var btnStartEl = document.querySelector("#start-game");
      var btnGoBackEl = document.querySelector("#go-back")
      var btnClearScoresEl = document.querySelector("#clear-high-scores")
      //questions/answers element
      var questionEl = document.getElementById("question")
      var answerbuttonsEl = document.getElementById("answer-buttons")
      var timerEl = document.querySelector("#timer");
      var score = 0;
      var timeleft;
      var gameover
      timerEl.innerText = 0;

      //High Score Array
      var HighScores = [];

       //assign array details for questions 
      var arrayShuffledQuestions
      var QuestionIndex = 0

    
      
      // The array of questions for our quiz game.
      var questions = [
        { q: 'Arrays in Javascript can be used to store __________.', 
          a: '4. all of the above', 
          choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
        },
        { q: 'Inside which HTML element do we put the javascript?', 
          a: '3. <script>', 
          choices: [{choice: '1. <h1>'}, {choice: '2. <js>'}, {choice: '3. <script>'}, {choice: '4. <head>'}]
        },
        { q: 'In the code -- setinterval(time(),1000) -- what is time()?', 
          a: '1. callback function', 
          choices: [{choice: '1. callback function'}, {choice: '2. undefined'}, {choice: '3. variable'}, {choice: '4. all of the above'}]
        },
        { q: 'What syntax would call a function?', 
          a: '4. function()', 
          choices: [{choice: '1. var function'}, {choice: '2. function'}, {choice: '3. call function'}, {choice: '4. function()'}]
        },
        { q: 'When did javascript first appear?', 
          a: '1. 1995', 
          choices: [{choice: '1. 1995'}, {choice: '2. Roaring twenties'}, {choice: '3. 2005'}, {choice: '4. 2000'}]
        },
        { q: 'What does DOM stand for?', 
          a: '2. Document Object Model', 
          choices: [{choice: '1. Do Overnight Modules'}, {choice: '2. Document Object Model'}, {choice: '3. Divas Obviously Model'}, {choice: '4. Do Oo Mo'}]
        },
      ];
      
        //if go back button is hit on high score page
    var renderStartPage = function () {
        containerHighScoresEl.classList.add("hide")
        containerHighScoresEl.classList.remove("show")
        containerStartEl.classList.remove("hide")
        containerStartEl.classList.add("show")
        containerScoreEl.removeChild(containerScoreEl.lastChild)
        QuestionIndex = 0 
        score = 0
    }

    var setTime = function () {
        timeleft = 30;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

    }, 1000)
    }

    var startGame = function() {
        //add classes to show/hide start and quiz screen
        containerStartEl.classList.add('hide');
        containerStartEl.classList.remove('show');
        containerQuestionEl.classList.remove('hide');
        containerQuestionEl.classList.add('show');
        //Shuffle the questions so they show in random order
        arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        setQuestion()
      }
    
    //set next question for quiz
    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayShuffledQuestions[QuestionIndex])
    }

    //remove answer buttons
    var resetAnswers = function() {
        while (answerbuttonsEl.firstChild) {
            answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
        };
    };

    //display question information (including answer buttons)
    var displayQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.choices[i].choice
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            answerbuttonsEl.appendChild(answerbutton)
            }
        };
    
    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            wrongEl.classList.remove("banner")
            wrongEl.classList.add("hide")
            }
        }  

    var answerWrong = function() {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }

    //check if answer is correct    
    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 5
            }

            else {
              answerWrong()
              score = score - 2;
              timeleft = timeleft - 3;
          };

        //go to next question, check if there is more questions
          QuestionIndex++
            if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
        }

        //Display total score screen at end of game
    var showScore = function () {
        containerQuestionEl.classList.add("hide");
        containerEndEl.classList.remove("hide");
        containerEndEl.classList.add("show");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        containerScoreEl.appendChild(scoreDisplay);
        }       

    var createHighScore = function(event) { 
        event.preventDefault() 
        var initials = document.querySelector("#initials").value;
        if (!initials) {
          alert("Enter your intials!");
          return;
          }

      formInitials.reset()

      var HighScore = [
      {initials: initials,
      score: score} ] 

      HighScores.push(HighScore)
    
      var highscoreEl = document.createElement("li")
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = initials + " - " + score;
      listHighScoreEl.appendChild(highscoreEl)

      saveHighScore()
      displayHighScores()

    }

    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
            
    }

    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        console.log(LoadedHighScores)


        for (var i = 0; i < LoadedHighScores.length; i++) {
            var loadedinitials = LoadedHighScores[i].initials;
            var loadedscore = LoadedHighScores[i].score;
            var highscoreEl = document.createElement("li")
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = loadedinitials + " - " + loadedscore;
            listHighScoreEl.appendChild(highscoreEl)

        HighScores.push(LoadedHighScores[i])
            
        }
    }  

    var displayHighScores = function() {

        containerHighScoresEl.classList.remove("hide")
        containerHighScoresEl.classList.add("show")

        if (containerEndEl.className = "show") {
            containerEndEl.classList.remove("show")
            containerEndEl.classList.add("hide")
            }
        if (containerStartEl.className = "show") {
            containerStartEl.classList.remove("show")
            containerStartEl.classList.add("hide")
            }
            
        if (containerQuestionEl.className = "show") {
            containerQuestionEl.classList.remove("show")
            containerQuestionEl.classList.add("hide")
            }
        
    }

    var clearScores = function () {
        HighScores = []

        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild)
        }

        localStorage.clear(HighScores);

    } 

    loadHighScore()
        
      //on start click, start game
      btnStartEl.addEventListener("click", startGame)
      //on submit button -- enter or click
      formInitials.addEventListener("submit", createHighScore)
      //when view high-scores is clicked
      ViewHighScoreEl.addEventListener("click", displayHighScores)
      //Go back button
      btnGoBackEl.addEventListener("click", renderStartPage)
      //clear scores button
      btnClearScoresEl.addEventListener("click", clearScores)