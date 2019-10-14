//This variable exists in the global scope, which means it's less secure and can be accessed by anything
var global;

function testFunction() {
}

(function() {
    var insideIIFE = true;
})();


(function() {

    var variable = 10;
    
    var quizContainer = document.getElementById("quiz");
    var resultsContainer = document.getElementById("results");
    var submitButton = document.getElementById("submit");
    var resetButton = document.getElementById("reset");

    var myQuestions = [];

    var question1 = {
        question: "What color is the sky?",
        answers: {
            a: "Blue",
            b: "Brown",
            c: "Green"
        },
        correctAnswer: "a"
    }

    console.log(question1.question); 
    console.log(question1.answers.b); 

    var question2 = {
        question: "What is the state capitol of Texas?",
        answers: {
            a: "Austin",
            b: "Fort Worth",
            c: "Dallas"
        },
        correctAnswer: "a"
    }

    var question3 = {
        question: "What is the state bird of Texas?",
        answers: {
            a: "Hummingbird",
            b: "Blue Jay",
            c: "Cardinal",
            d: "Mockingbird"
        },
        correctAnswer: "d"
    }

    
    myQuestions.push(question1, question2, question3);

   
    function buildQuiz() {
       

        for (var i = 0; i < myQuestions.length; i++) {
           
            var questionDiv = document.createElement("div");

            questionDiv.innerText = myQuestions[i].question;

            var answersDiv = document.createElement("div");
            answersDiv.classList.add("answers");

            for (letter in myQuestions[i].answers) {
                
                var label = document.createElement("label");

                var input = document.createElement("input");
              
                input.type = "radio";
                input.name = "question" + i;
                input.value = letter;

                label.appendChild(input);

                var labelText = document.createTextNode(`${letter} : ${myQuestions[i].answers[letter]}`);

                label.appendChild(labelText);

                answersDiv.appendChild(label);
            }

            questionDiv.appendChild(answersDiv);

            quizContainer.appendChild(questionDiv);
        }
    }

    buildQuiz();

    function showResults() {
        var answerContainers = quizContainer.querySelectorAll(".answers"); 
       
        var numCorrect = 0;
        
        for (var i = 0; i < answerContainers.length; i++) {
           
            var answerContainer = answerContainers[i];

            var selector = `input[name=question${i}]:checked`;
            var userAnswer = (answerContainer.querySelector(selector) || {}).value; 

            if (userAnswer === myQuestions[i].correctAnswer) {
                numCorrect++;
                answerContainer.style.color = "green";
            } else {
                answerContainer.style.color = "red";
            }
        }
        resultsContainer.innerText = "You got " + numCorrect + " out of " + myQuestions.length;
    }

    submitButton.addEventListener("click", showResults);
    function resetQuiz() {
        resultsContainer.innerText = "";
        quizContainer.innerHTML = "";
        buildQuiz();
    }
    resetButton.addEventListener("click", resetQuiz);
})();