const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers:[
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
            {text: "Rhinoceros", correct: false},
            {text: "Blue Whale", correct: true}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers:[
            {text: "Vatican City", correct: true},
            {text: "Monaco", correct: false},
            {text: "San Marino", correct: false},
            {text: "Liechtenstein", correct: false}
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers:[
            {text: "Amazon River", correct: false},
            {text: "Nile River", correct: true},
            {text: "Yangtze River", correct: false},
            {text: "Mississippi River", correct: false}
        ]
    },
    {
        question: "Which is the largest ocean in the world?",
        answers:[
            {text: "Pacific Ocean", correct: true},
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Arctic Ocean", correct: false}
        ]
    },
    {
        question: "Which is the largest country in the world?",
        answers:[
            {text: "Russia", correct: true},
            {text: "Canada", correct: false},
            {text: "China", correct: false},
            {text: "USA", correct: false}
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if(button.dataset.correct){
            button.classList.add("correct");
        }
    });
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
