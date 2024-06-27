const questions = [
    {
        question: "What is the rarest blood type?",
        answers: ["A", "B", "O", "AB-"],
        correct: "AB-"
    },
    {
        question: "Which planet has the most moons?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Saturn"
    },
    {
        question: "What is the longest river in the world?",
        answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correct: "Nile"
    },
    {
        question: "Who is the author of the 'Harry Potter' series?",
        answers: ["J.R.R. Tolkien", "George R.R. Martin", "J.K. Rowling", "C.S. Lewis"],
        correct: "J.K. Rowling"
    },
    {
        question: "Which element is said to keep bones strong?",
        answers: ["Iron", "Calcium", "Potassium", "Vitamin D"],
        correct: "Calcium"
    },
    {
        question: "What is the capital of Iceland?",
        answers: ["Oslo", "Reykjavik", "Helsinki", "Copenhagen"],
        correct: "Reykjavik"
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        answers: ["Tiger", "Elephant", "Lion", "Giraffe"],
        correct: "Lion"
    },
    {
        question: "Who painted the ceiling of the Sistine Chapel?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Michelangelo", "Leonardo da Vinci"],
        correct: "Michelangelo"
    },
    {
        question: "Which is the smallest continent by land area?",
        answers: ["Europe", "Antarctica", "Australia", "South America"],
        correct: "Australia"
    },
    {
        question: "What year did the first manned moon landing occur?",
        answers: ["1965", "1969", "1972", "1975"],
        correct: "1969"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timerInterval;

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('end-container').style.display = 'none';
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        answersDiv.appendChild(button);
    });
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').classList.remove('show-feedback');
    document.getElementById('next-button').style.display = 'none';
    timer = 15;
    document.getElementById('timer').textContent = `Time left: ${timer} seconds`;
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = `Time left: ${timer} seconds`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            checkAnswer('');
        }
    }, 1000);
}

function checkAnswer(answer) {
    clearInterval(timerInterval);
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct) {
        document.getElementById('feedback').textContent = 'Correct!';
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
    } else {
        document.getElementById('feedback').textContent = `Incorrect! The correct answer is ${currentQuestion.correct}.`;
    }
    document.getElementById('feedback').classList.add('show-feedback');
    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('end-container').style.display = 'block';
    document.getElementById('final-score').textContent = `Your final score is ${score}.`;
}

function restartQuiz() {
    startQuiz();
}

document.addEventListener('DOMContentLoaded', startQuiz);
