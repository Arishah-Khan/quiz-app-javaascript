var quizQuestions = [
    {
        question: "What does CSS stand for?",
        optionA: "Cascading Style Sheets",
        optionB: "Computer Style Sheets",
        optionC: "Creative Style Sheets",
        correctAnswer: "optionA"
    },
    {
        question: "Which HTML tag is used to define an image?",
        optionA: "<img>",
        optionB: "<picture>",
        optionC: "<image>",
        optionD: "<photo>",
        correctAnswer: "optionA"
    },
    {
        question: "Which of the following is a valid JavaScript function declaration?",
        optionA: "function myFunction() {}",
        optionB: "func myFunction() {}",
        optionC: "myFunction() => {}",
        optionD: "function:myFunction() {}",
        correctAnswer: "optionA"
    },
    {
        question: "Which of the following is a JavaScript library?",
        optionA: "React",
        optionB: "Laravel",
        optionC: "Django",
        optionD: "Flask",
        correctAnswer: "optionA"
    },
    {
        question: "How can you access the value of an HTML input element in JavaScript?",
        optionA: "document.getElementById('input').value",
        optionB: "document.querySelector('#input').value",
        optionC: "document.input.value",
        optionD: "document.getElementByName('input').value",
        optionE: "document.getValue('input')",
        correctAnswer: "optionA"
    },
    {
        question: "Which CSS property controls the text size?",
        optionA: "font-size",
        optionB: "text-size",
        optionC: "text-style",
        correctAnswer: "optionA"
    },
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        optionA: "push()",
        optionB: "pop()",
        optionC: "shift()",
        optionD: "unshift()",
        correctAnswer: "optionA"
    },
    {
        question: "Which of the following HTML elements defines navigation links?",
        optionA: "<nav>",
        optionB: "<links>",
        optionC: "<navigate>",
        optionD: "<menu>",
        correctAnswer: "optionA"
    },
    {
        question: "What is the purpose of the <footer> tag in HTML?",
        optionA: "To define footer content",
        optionB: "To create a header",
        optionC: "To include scripts",
        optionD: "To define main content",
        optionE: "To create a sidebar",
        correctAnswer: "optionA"
    },
    {
        question: "Which of the following is NOT a valid data type in JavaScript?",
        optionA: "Number",
        optionB: "String",
        optionC: "Boolean",
        optionD: "Character",
        correctAnswer: "optionD"
    }
];


var index = 0;
var quizContainer = document.getElementById("quizContainer");
var nextButton = document.getElementById("nextBtn");
var prevButton = document.getElementById("prevBtn");
var detailedResultsContainer = document.getElementById("resultsContainer");
var timerDisplay = document.getElementById("timer");
var selectedAnswers = [];
var score = 0;
var timer
var timeLeft = 300;

function startTimer() {
    timer = setInterval(function () {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft - (minutes * 60);
        timerDisplay.textContent = `Time Remaining:
        ${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextButton.disabled = true;
            prevButton.disabled = true;
            timerDisplay.textContent = 'Time’s up!'; 
            showResults();
        } else {
            timeLeft--;
        }
    }, 1000);
}

function showQuestions() {
    quizContainer.innerHTML = '';

    const currentQuestion = quizQuestions[index];
    quizContainer.innerHTML += `<h3 class="animate__animated animate__fadeIn">${currentQuestion.question}</h3>`;

    const questionsOptions = ["optionA", "optionB", "optionC", "optionD", "optionE"];
    for (var i = 0; i < questionsOptions.length; i++) {
        var option = questionsOptions[i];
        if (currentQuestion[option]) {
            const optionLabel = document.createElement("label");
            const optionInput = document.createElement("input");

            optionInput.type = "radio";
            optionInput.name = "options";
            optionInput.value = option;


            if (selectedAnswers[index] === option) {
                optionInput.checked = true;
            }

            optionLabel.className = "d-block mb-2";
            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(currentQuestion[option]));

            quizContainer.appendChild(optionLabel);
            quizContainer.appendChild(document.createElement("br"));

            
            optionInput.addEventListener("change", function () {
                nextButton.disabled = false;
            });
        }
    }
    nextButton.disabled = !selectedAnswers[index]; 
}

nextButton.addEventListener('click', function () {



    var selectedOptions = document.getElementsByName('options');
    var isOptionSelected = false;

    
    for (var i = 0; i < selectedOptions.length; i++) {
        if (selectedOptions[i].checked) {
            selectedAnswers[index] = selectedOptions[i].value; 
            isOptionSelected = true;
            break; 
        }
    }

    if (!isOptionSelected) {
        nextButton.disabled = true;
        return;
    }

    index++;
    if (index >= quizQuestions.length) {
        showResults();
    } else {
        showQuestions();
    }

    prevButton.disabled = index === 0; 
});

prevButton.addEventListener('click', function () {
    index--;
    showQuestions();
    prevButton.disabled = index === 0; 
});

function showResults() {
    clearInterval(timer); 
    quizContainer.style.display = "none";
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';

    
    var score = 0;
    for (var i = 0; i < quizQuestions.length; i++) {
        if (selectedAnswers[i] === quizQuestions[i].correctAnswer) {
            score++;
        }
    }

    
    var totalQuestions = quizQuestions.length;
    var percentage = (score / totalQuestions) * 100;
    var status = percentage >= 50 ? "Pass" : "Fail";

 
    var remark;
    if (percentage >= 90) {
        remark = "Excellent work! You have a strong grasp of the material and demonstrated exceptional knowledge.";
    } else if (percentage >= 80) {
        remark = "Very Good! You have a solid understanding of the material with only a few areas to improve.";
    } else if (percentage >= 70) {
        remark = "Good effort! You understand the material well but there are some areas that could use more study.";
    } else if (percentage >= 50) {
        remark = "Fair performance, you have a basic understanding but would benefit from reviewing the material further.";
    } else {
        remark = "Poor performance, consider revisiting the material and practicing more to improve your understanding.";
    }

   
    detailedResultsContainer.innerHTML = `
        <h2 class="animate__animated animate__fadeIn result">Quiz Results</h2>
        <h4>Your Total Score: ${score} out of ${totalQuestions}</h3>
        <h4>Your Percentage: ${percentage}%</h3>
        <h4>Status: ${status}</h3>
        <p class="para"><span>Performance:</span> ${remark}</p>
        <div class="restartBtn">
        <button class="restart" onclick="window.location.reload()">Restart Quiz</button></div>
    `;

    detailedResultsContainer.style.display = 'block';
    detailedResultsContainer.classList.add('animate__animated', 'animate__fadeIn');
}

startTimer();
showQuestions();
