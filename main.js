var quizQuestions = [
    {
        question: "What does HTML stand for?",
        optionA: "Hypertext Markup Language",
        optionB: "Hyperlinks and Text Markup Language",
        optionC: "Home Tool Markup Language",
        optionD: "Hyper Tool Mark Language",
        correctAnswer: "optionA"
    },
    {
        question: "Which language is used for styling web pages?",
        optionA: "HTML",
        optionB: "JQuery",
        optionC: "CSS",
        optionD: "XML",
        correctAnswer: "optionC"
    },
    {
        question: "Which is not a JavaScript data type?",
        optionA: "Undefined",
        optionB: "Number",
        optionC: "Boolean",
        optionD: "Float",
        correctAnswer: "optionD"
    },
    {
        question: "Which company developed JavaScript?",
        optionA: "Netscape",
        optionB: "Bell Labs",
        optionC: "Sun Microsystems",
        optionD: "IBM",
        correctAnswer: "optionA"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        optionA: "//",
        optionB: "/* */",
        optionC: "#",
        optionD: "<!-- -->",
        correctAnswer: "optionA"
    },
    {
        question: "What is the correct syntax to create a function in JavaScript?",
        optionA: "function myFunction()",
        optionB: "function:myFunction()",
        optionC: "function = myFunction()",
        optionD: "function => myFunction()",
        correctAnswer: "optionA"
    },
    {
        question: "Which of the following is a JavaScript framework?",
        optionA: "React",
        optionB: "Laravel",
        optionC: "Django",
        optionD: "Flask",
        correctAnswer: "optionA"
    },
    {
        question: "How do you declare a JavaScript variable?",
        optionA: "var myVariable;",
        optionB: "v myVariable;",
        optionC: "variable myVariable;",
        optionD: "myVariable = var;",
        correctAnswer: "optionA"
    },
    {
        question: "Which method is used to round a number in JavaScript?",
        optionA: "Math.round()",
        optionB: "Math.floor()",
        optionC: "Math.ceil()",
        optionD: "Math.random()",
        correctAnswer: "optionA"
    },
    {
        question: "Which of the following is a correct way to write an if statement in JavaScript?",
        optionA: "if (i == 5)",
        optionB: "if i = 5 then",
        optionC: "if i == 5",
        optionD: "if (i = 5)",
        correctAnswer: "optionA"
    }
];



var index = 0;
var selectedAnswers = {};
var quizContainer = document.getElementById("quizContainer");
var nextButton = document.getElementById("nextBtn");
var prevButton = document.getElementById("prevBtn");
var detailedResultsContainer = document.getElementById("detailedResultsContainer");
var checkAnswersButton = document.getElementById("checkAnswers");
var passThreshold = 40;

function displayQuiz() {
    quizContainer.innerHTML = '';

    var optionA = '<input type="radio" name="quizOption" value="optionA">';
    var optionB = '<input type="radio" name="quizOption" value="optionB">';
    var optionC = '<input type="radio" name="quizOption" value="optionC">';
    var optionD = '<input type="radio" name="quizOption" value="optionD">';

    if (selectedAnswers[index] === 'optionA') {
        optionA = '<input type="radio" name="quizOption" value="optionA" checked>';
    }
    if (selectedAnswers[index] === 'optionB') {
        optionB = '<input type="radio" name="quizOption" value="optionB" checked>';
    }
    if (selectedAnswers[index] === 'optionC') {
        optionC = '<input type="radio" name="quizOption" value="optionC" checked>';
    }
    if (selectedAnswers[index] === 'optionD') {
        optionD = '<input type="radio" name="quizOption" value="optionD" checked>';
    }

    quizContainer.innerHTML = `
        <p>${quizQuestions[index].question}</p>
        <label>${optionA} ${quizQuestions[index].optionA}</label><br>
        <label>${optionB} ${quizQuestions[index].optionB}</label><br>
        <label>${optionC} ${quizQuestions[index].optionC}</label><br>
        <label>${optionD} ${quizQuestions[index].optionD}</label>
    `;

    nextButton.disabled = !selectedAnswers[index];
    prevButton.disabled = index === 0;
}

function nextQuestion() {
    var selectedOption = document.querySelector('input[name="quizOption"]:checked');
    if (selectedOption) {
        selectedAnswers[index] = selectedOption.value;
    }

    index++;
    if (index < quizQuestions.length) {
        displayQuiz();
    } else {
        showDetailedResults();
    }
}

function handlePrev() {
    var selectedOption = document.querySelector('input[name="quizOption"]:checked');
    if (selectedOption) {
        selectedAnswers[index] = selectedOption.value;
    }

    index--;
    displayQuiz();
}

function handleNext() {
    const selectedOption = document.querySelector('input[name="quizOption"]:checked');
    nextButton.disabled = !selectedOption;
}

function showDetailedResults() {
    var score = 0;
    var totalQuestions = quizQuestions.length;
    var status = "";

    for (var i = 0; i < quizQuestions.length; i++) {
        var question = quizQuestions[i];
        var userAnswer = selectedAnswers[i];
        var isCorrect = userAnswer === question.correctAnswer;

        if (isCorrect) {
            score++;
        }
    }

    var percentage = (score / totalQuestions) * 100;
    if (percentage >= passThreshold) {
        status = "Pass";
    }
    else {
        status = "Fail";
    }

    var remark = "";
    if (percentage >= 90) {
        remark = "Excellent";
    } else if (percentage >= 80) {
        remark = "Very Good";
    } else if (percentage >= 70) {
        remark = "Good";
    } else if (percentage >= 50) {
        remark = "Fair";
    } else {
        remark = "Poor";
    }

    let performanceMessage = '';

    if (remark === "Excellent") {
        performanceMessage = "Outstanding performance! You're a quiz master!";
    } else if (remark === "Very Good") {
        performanceMessage = "Great job! You have a solid understanding of the material.";
    } else if (remark === "Good") {
        performanceMessage = "Good effort! You have a good grasp of the content.";
    } else if (remark === "Fair") {
        performanceMessage = "Fair performance. Review the material and try again!";
    } else {
        performanceMessage = "Poor performance. Don't be discouraged, review the content and practice more.";
    }

    detailedResultsContainer.innerHTML = `
        <h2>Quiz Results</h2>
        <h3>Your Total Score: ${score} of ${totalQuestions}</h3>
        <h3>Your Percentage: ${percentage}%</h3>
        <h3>Status: ${status}</h3>
        <h3>Performance: ${remark}</h3>
        <p>${performanceMessage}</p>
        <button onclick="window.location.reload()">Restart Quiz</button>
        <button id="checkAnswers">Check Your Answers</button>
    `;

    detailedResultsContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';

    // Re-attach the event listener for checkAnswers button here
    checkAnswersButton = document.getElementById("checkAnswers");
    checkAnswersButton.addEventListener('click', checkAnswers);
}

function checkAnswers() {

    var selectedOption = selectedAnswers[index];
    var correctAnswer = quizQuestions[index].correctAnswer;

    var optionA = `<input type="radio" disabled ${selectedOption === 'optionA' ? 'checked' : ''}> ${quizQuestions[index].optionA}`;
    var optionB = `<input type="radio" disabled ${selectedOption === 'optionB' ? 'checked' : ''}> ${quizQuestions[index].optionB}`;
    var optionC = `<input type="radio" disabled ${selectedOption === 'optionC' ? 'checked' : ''}> ${quizQuestions[index].optionC}`;
    var optionD = `<input type="radio" disabled ${selectedOption === 'optionD' ? 'checked' : ''}> ${quizQuestions[index].optionD}`;

    var correctOption = `<span style="color:green;">Correct</span>`;
    var wrongOption = `<span style="color:red;">Wrong</span>`;

    if (correctAnswer === 'optionA') {
        optionA += ` ${correctOption}`;
    } else if (selectedOption === 'optionA') {
        optionA += ` ${wrongOption}`;
    }

    if (correctAnswer === 'optionB') {
        optionB += ` ${correctOption}`;
    } else if (selectedOption === 'optionB') {
        optionB += ` ${wrongOption}`;
    }

    if (correctAnswer === 'optionC') {
        optionC += ` ${correctOption}`;
    } else if (selectedOption === 'optionC') {
        optionC += ` ${wrongOption}`;
    }

    if (correctAnswer === 'optionD') {
        optionD += ` ${correctOption}`;
    } else if (selectedOption === 'optionD') {
        optionD += ` ${wrongOption}`;
    }

    quizContainer.innerHTML = `
        <p>${quizQuestions[index].question}</p>
        <label>${optionA}</label><br>
        <label>${optionB}</label><br>
        <label>${optionC}</label><br>
        <label>${optionD}</label><br><br>
    `;

    nextButton.style.display = 'block';
    prevButton.style.display = 'block';
    checkAnswersButton.style.display = 'none'; // Hide check answers button after checking
}

displayQuiz();
nextButton.addEventListener('click', nextQuestion);
prevButton.addEventListener('click', handlePrev);
quizContainer.addEventListener('click', handleNext);

// Attach the event listener for checkAnswers when it exists
if (checkAnswersButton) {
    checkAnswersButton.addEventListener('click', checkAnswers);
}















// var index = 0;
// var selectedAnswers = {};
// var quizContainer = document.getElementById("quizContainer");
// var nextButton = document.getElementById("nextBtn");
// var prevButton = document.getElementById("prevBtn");
// var detailedResultsContainer = document.getElementById("detailedResultsContainer");
// var passThreshold = 40;
// var checkAnswersButton = document.getElementById("checkAnswers");

// function displayQuiz() {
//     quizContainer.innerHTML = '';

//     var optionA = '<input type="radio" name="quizOption" value="optionA">';
//     var optionB = '<input type="radio" name="quizOption" value="optionB">';
//     var optionC = '<input type="radio" name="quizOption" value="optionC">';
//     var optionD = '<input type="radio" name="quizOption" value="optionD">';

//     if (selectedAnswers[index] === 'optionA') {
//         optionA = '<input type="radio" name="quizOption" value="optionA" checked>';
//     }
//     if (selectedAnswers[index] === 'optionB') {
//         optionB = '<input type="radio" name="quizOption" value="optionB" checked>';
//     }
//     if (selectedAnswers[index] === 'optionC') {
//         optionC = '<input type="radio" name="quizOption" value="optionC" checked>';
//     }
//     if (selectedAnswers[index] === 'optionD') {
//         optionD = '<input type="radio" name="quizOption" value="optionD" checked>';
//     }

//     quizContainer.innerHTML = `
//         <p>${quizQuestions[index].question}</p>
//         <label>${optionA} ${quizQuestions[index].optionA}</label><br>
//         <label>${optionB} ${quizQuestions[index].optionB}</label><br>
//         <label>${optionC} ${quizQuestions[index].optionC}</label><br>
//         <label>${optionD} ${quizQuestions[index].optionD}</label>
//     `;

//     nextButton.disabled = !selectedAnswers[index];
//     prevButton.disabled = index === 0;
// }

// function nextQuestion() {
//     var selectedOption = document.querySelector('input[name="quizOption"]:checked');
//     if (selectedOption) {
//         selectedAnswers[index] = selectedOption.value;
//     }

//     index++;
//     if (index < quizQuestions.length) {
//         displayQuiz();
//     } else {
//         showDetailedResults();
//     }
// }

// function handlePrev() {
//     var selectedOption = document.querySelector('input[name="quizOption"]:checked');
//     if (selectedOption) {
//         selectedAnswers[index] = selectedOption.value;
//     }

//     index--;
//     displayQuiz();
// }

// function handleNext() {
//     const selectedOption = document.querySelector('input[name="quizOption"]:checked');
//     nextButton.disabled = !selectedOption;
// }

// function showDetailedResults() {
//     var score = 0;
//     var totalQuestions = quizQuestions.length;
//     var status = "";

//     for (var i = 0; i < quizQuestions.length; i++) {
//         var question = quizQuestions[i];
//         var userAnswer = selectedAnswers[i];
//         var isCorrect = userAnswer === question.correctAnswer;

//         if (isCorrect) {
//             score++;
//         }
//     }

//     var percentage = (score / totalQuestions) * 100;
//     if (percentage >= passThreshold) {
//         status = "Pass";
//     }
//     else {
//         status = "Fail";
//     }


// var remark = "";
// if (percentage >= 90) {
//     remark = "Excellent";
// } else if (percentage >= 80) {
//     remark = "Very Good";
// } else if (percentage >= 70) {
//     remark = "Good";
// } else if (percentage >= 50) {
//     remark = "Fair";
// } else {
//     remark = "Poor";
// }

// let performanceMessage = '';

// if (remark === "Excellent") {
//     performanceMessage = "Outstanding performance! You're a quiz master!";
// } else if (remark === "Very Good") {
//     performanceMessage = "Great job! You have a solid understanding of the material.";
// } else if (remark === "Good") {
//     performanceMessage = "Good effort! You have a good grasp of the content.";
// } else if (remark === "Fair") {
//     performanceMessage = "Fair performance. Review the material and try again!";
// } else {
//     performanceMessage = "Poor performance. Don't be discouraged, review the content and practice more.";
// }

// detailedResultsContainer.innerHTML = `
//     <h2>Quiz Results</h2>
//     <h3>Your Total Score: ${score} of ${totalQuestions}</h3>
//     <h3>Your Percentage: ${percentage}%</h3>
//     <h3>Status: ${status}</h3>
//     <h3>Performance: ${remark}</h3>
//     <p>${performanceMessage}</p>
//     <button onclick="window.location.reload()">Restart Quiz</button>
//     <button id="checkAnswers">Check Your Answers</button>
// `;

// detailedResultsContainer.style.display = 'block';
// quizContainer.style.display = 'none';
// nextButton.style.display = 'none';
// prevButton.style.display = 'none';
// }

// var correctAnswer = "";



// unction checkAnswers() {
//     var selectedOption = selectedAnswers[index];
//     var correctAnswer = quizQuestions[index].correctAnswer;
    
//     var optionA = `<input type="radio" disabled ${selectedOption === 'optionA' ? 'checked' : ''}> ${quizQuestions[index].optionA}`;
//     var optionB = `<input type="radio" disabled ${selectedOption === 'optionB' ? 'checked' : ''}> ${quizQuestions[index].optionB}`;
//     var optionC = `<input type="radio" disabled ${selectedOption === 'optionC' ? 'checked' : ''}> ${quizQuestions[index].optionC}`;
//     var optionD = `<input type="radio" disabled ${selectedOption === 'optionD' ? 'checked' : ''}> ${quizQuestions[index].optionD}`;

//     var correctOption = `<span style="color:green;">Correct</span>`;
//     var wrongOption = `<span style="color:red;">Wrong</span>`;

//     // Highlight correct and wrong answers for current question
//     if (correctAnswer === 'optionA') {
//         optionA += ` ${correctOption}`;
//     } else if (selectedOption === 'optionA') {
//         optionA += ` ${wrongOption}`;
//     }

//     if (correctAnswer === 'optionB') {
//         optionB += ` ${correctOption}`;
//     } else if (selectedOption === 'optionB') {
//         optionB += ` ${wrongOption}`;
//     }

//     if (correctAnswer === 'optionC') {
//         optionC += ` ${correctOption}`;
//     } else if (selectedOption === 'optionC') {
//         optionC += ` ${wrongOption}`;
//     }

//     if (correctAnswer === 'optionD') {
//         optionD += ` ${correctOption}`;
//     } else if (selectedOption === 'optionD') {
//         optionD += ` ${wrongOption}`;
//     }

//     // Display the question with answers and feedback for this question
//     quizContainer.innerHTML = `
//         <p>${quizQuestions[index].question}</p>
//         <label>${optionA}</label><br>
//         <label>${optionB}</label><br>
//         <label>${optionC}</label><br>
//         <label>${optionD}</label><br><br>
//     `;

//     nextButton.style.display = 'block';
//     prevButton.style.display = 'block';
//     checkAnswers.style.display = 'none'; // Hide check answers button after checking
// }f











// function checkAnswers() {
//     var selectedOption = selectedAnswers[index];
//     var correctAnswer = quizQuestions[index].correctAnswer;

//     var optionA = `<input type="radio" disabled ${selectedOption === 'optionA' ? 'checked' : ''}> ${quizQuestions[index].optionA}`;
//     var optionB = `<input type="radio" disabled ${selectedOption === 'optionB' ? 'checked' : ''}> ${quizQuestions[index].optionB}`;
//     var optionC = `<input type="radio" disabled ${selectedOption === 'optionC' ? 'checked' : ''}> ${quizQuestions[index].optionC}`;
//     var optionD = `<input type="radio" disabled ${selectedOption === 'optionD' ? 'checked' : ''}> ${quizQuestions[index].optionD}`;

//     var correctOption = `<span style="color:green;">Correct</span>`;
//     var wrongOption = `<span style="color:red;">Wrong</span>`;

//     if (correctAnswer === 'optionA') {
//         optionA += ` ${correctOption}`;
//     } else if (selectedOption === 'optionA') {
//         optionA += ` ${wrongOption}`;
//     }

//     if (correctAnswer === 'optionB') {
//         optionB += ` ${correctOption}`;
//     } else if (selectedOption === 'optionB') {
//         optionB += ` ${wrongOption}`;
//     }

//     if (correctAnswer === 'optionC') {
//         optionC += ` ${correctOption}`;
//     } else if (selectedOption === 'optionC') {
//         optionC += ` ${wrongOption}`;
//     }

//     if (correctAnswer === 'optionD') {
//         optionD += ` ${correctOption}`;
//     } else if (selectedOption === 'optionD') {
//         optionD += ` ${wrongOption}`;
//     }

//     quizContainer.innerHTML = `
//         <p>${quizQuestions[index].question}</p>
//         <label>${optionA}</label><br>
//         <label>${optionB}</label><br>
//         <label>${optionC}</label><br>
//         <label>${optionD}</label><br><br>
//     `;

//     nextButton.style.display = 'block';
//     prevButton.style.display = 'block';
//     checkAnswersButton.style.display = 'none'; // Hide check answers button after checking
// }




// displayQuiz();
// nextButton.addEventListener('click', nextQuestion);
// prevButton.addEventListener('click', handlePrev);
// quizContainer.addEventListener('click', handleNext);
// checkAnswersButton.addEventListener('click', checkAnswers);