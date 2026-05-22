const questions = [

    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Transfer Machine Language", correct: false },
            { text: "Hyper Transfer Mark Language", correct: false },
            { text: "Home Text Machine Language", correct: false }
        ]
    },

    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "C++", correct: false }
        ]
    },

    {
        question: "Which language is used for web functionality?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C", correct: false }
        ]
    },

    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Google", correct: false },
            { text: "Microsoft", correct: false },
            { text: "Netscape", correct: true },
            { text: "Apple", correct: false }
        ]
    },

    {
        question: "Which tag is used for inserting an image in HTML?",
        answers: [
            { text: "<img>", correct: true },
            { text: "<image>", correct: false },
            { text: "<pic>", correct: false },
            { text: "<src>", correct: false }
        ]
    },

    {
        question: "Which CSS property changes text color?",
        answers: [
            { text: "font-color", correct: false },
            { text: "background-color", correct: false },
            { text: "color", correct: true },
            { text: "text-style", correct: false }
        ]
    },

    {
        question: "Inside which HTML element do we write JavaScript?",
        answers: [
            { text: "<js>", correct: false },
            { text: "<javascript>", correct: false },
            { text: "<script>", correct: true },
            { text: "<code>", correct: false }
        ]
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "<!-- -->", correct: false },
            { text: "**", correct: false },
            { text: "##", correct: false }
        ]
    },

    {
        question: "Which method is used to print in console?",
        answers: [
            { text: "console.print()", correct: false },
            { text: "print.console()", correct: false },
            { text: "console.log()", correct: true },
            { text: "log.console()", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used to create a link?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false }
        ]
    }

];
 
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
 
let currentQuestionIndex = 0;
let score = 0;
 
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    resultContainer.classList.add("hide");
    nextButton.style.display = "none";

    showQuestion();
} 

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}
 
function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}


nextButton.addEventListener("click", () => {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});


function showScore() {

    resetState();

    questionElement.innerText = "Quiz Completed!";

    resultContainer.classList.remove("hide");

    scoreElement.innerText = `${score} / ${questions.length}`;
}

restartButton.addEventListener("click", startQuiz);

startQuiz();