      // The array of questions for our quiz game.
      var questions = [
        { q: 'Arrays1 in Javascript can be used to store __________.', 
          a: 'all of the above', 
          choices: ["1. numbers", "2. booleans", "3. strings", "4, all of the above"]
        },
        { q: 'Arrays2 in Javascript can be used to store __________.', 
          a: 'all of the above', 
          choices: ["1. numbers", "2. booleans", "3. strings", "4, all of the above"]
        },
        { q: 'Arrays3 in Javascript can be used to store __________.', 
          a: 'all of the above', 
          choices: ["1. numbers", "2. booleans", "3. strings", "4, all of the above"]
        },
        { q: 'Arrays4 in Javascript can be used to store __________.', 
          a: 'all of the above', 
          choices: ["1. numbers", "2. booleans", "3. strings", "4, all of the above"]
        },
        { q: 'Arrays5 in Javascript can be used to store __________.', 
          a: 'all of the above', 
          choices: ["1. numbers", "2. booleans", "3. strings", "4, all of the above"]
        },
      ];

      // We start the game with a score of 0.
      var score = 0;

      // Loop over every question object
      for (var i = 0; i < questions.length; i++) {
        // Display current question to user and ask OK/Cancel
        var answer = prompt(questions[i].q);
        console.log(answer)
        console.log(questions[i].a)

        // Compare answers
        if (questions[i].a === answer) {
          // Increase score
          score++;
          }
        else {
          score--;
        }
      };

      // Show total at end
      alert('You got ' + score + '/' + questions.length);