      var containerQuestionEl = document.getElementById("question-container");
      var containerStartEl = document.getElementById("starter-container");
      var containerEndEl = document.getElementById("end-container")
      var containerScore = document.getElementById("score-banner")
      var formInitials = document.getElementById("initials-form")
      var containerhighscores = document.getElementById("high-score-container")
      var ViewHighScoreEl = document.getElementById("view-high-scores")
      var listHighScoreEl = document.getElementById("high-score-list")
      //buttons
      var startbtnEl = document.querySelector("#start-game");
      //questions/answers element
      var questionEl = document.getElementById("question")
      var answerbuttonsEl = document.getElementById("answer-buttons")
      var timerEl = document.querySelector("#timer");
      var score = 0;
      var timerEl = 0;

      //High Score Array
      var HighScores = []

       //assign array details for questions 
      var arrayShuffledQuestions
      var QuestionIndex = 0

    
      
      // The array of questions for our quiz game.
      var questions = [
        { q: 'Arrays0 in Javascript can be used to store __________.', 
          a: '4. all of the above', 
          choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
        },
        { q: 'Arrays8 in Javascript can be used to store __________.', 
          a: '4. all of the above', 
          choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
        },
        { q: 'Arrays3 in Javascript can be used to store __________.', 
          a: '4. all of the above', 
          choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
        },
        { q: 'Arrays1 in Javascript can be used to store __________.', 
          a: '4. all of the above', 
          choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
        },
        { q: 'Arrays2 in Javascript can be used to store __________.', 
          a: '4. all of the above', 
          choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
        },
      ];
    

    
    var startGame = function() {
        //add classes to show/hide start and quiz screen
        containerStartEl.classList.add('hide');
        containerStartEl.classList.remove('show');
        containerQuestionEl.classList.remove('hide');
        containerQuestionEl.classList.add('show');
        //Shuffle the questions so they show in random order
        arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
        setQuestion()
      }

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

    //check if answer is correct    
    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
                score++
                console.log("WOW")
            }
              else {
              score--
              console.log("NOOO")
              //subrtract time
          };

          //go to next question, check if there is more questions
          QuestionIndex++
            if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               showScore()
                }
        }

        var showScore = function () {
            containerQuestionEl.classList.add("hide");
            containerEndEl.classList.remove("hide");
            containerEndEl.classList.add("show");

            var scoreDisplay = document.createElement("p");
            scoreDisplay.innerText = ("Your final score is " + score + "!");
            containerScore.appendChild(scoreDisplay);
        }

        var saveHighScore = function (event) {

            event.preventDefault()
            console.log(score)

            var initials = document.querySelector("#initials").value;
            if (initials === "") {
                alert("Enter your intials!")
            }

            var arrayHighScores = [
                {initials: initials,
                score: score} ]
            
            HighScores.push(arrayHighScores)
            console.log(arrayHighScores)

            localStorage.setItem("HighScores", JSON.stringify(HighScores))

            displayHighScores()
            
        }

        var loadHighScore = function () {
            var LoadedHighScores = localStorage.getItem('HighScores')
            if (!LoadedHighScores) {
                return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li")
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl)

        }
        }  

        var displayHighScores = function() {

            containerhighscores.classList.remove("hide")
            containerhighscores.classList.add("show")

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
 
            loadHighScore()
        }
        
        
      //on start click, start game
      startbtnEl.addEventListener("click", startGame)
      //on submit button -- enter or click
      formInitials.addEventListener("submit", saveHighScore)
      //when view high-scores is clicked
      ViewHighScoreEl.addEventListener("click", displayHighScores)