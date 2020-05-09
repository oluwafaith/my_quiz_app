//questions
const questions = [{
        question: "what does hyper text markup language stand for?",
        correct_answer: "html",
        incorrect_answers: ["xhml", "hxml", "htmg"],
    },
    {
        question: "who teaches html at atart.ng?",
        correct_answer: "Eniola",
        incorrect_answers: ["kingabesh", "xylus", "codedgift"],
    },
    {
        question: "what is the colour of the sky?",
        correct_answer: "blue",
        incorrect_answers: ["peach", "pink", "green"],
    },
    {
        question: "In what year did nigeria gain independence?",
        correct_answer: "1960",
        incorrect_answers: ["1961", "1962", "1963"],
    },
    {
        question: "Matter is made up of one of these?",
        correct_answer: "solid",
        incorrect_answers: ["stone", "block", "chain"],
    },
];

let currentIndex = 0;
let numberOfCorrect = 0;
let questionsLeft = 5;
let selectedAnswer, correctAnswer, answerElement;
let answered = false;

// current question
function displayQuestion(obj, index) {
    let answers = document.getElementById("answers");
    let questionContainer = document.getElementById("Currentquestion");
    answers.innerHTML = "";
    let shuffledAnswers = shuffle(obj, index);
    let answerText = displayAnswers(shuffledAnswers);
    answers.innerHTML = answerText;
    answerText = "";
    questionContainer.textContent = obj[index].question;
}

//correct answer1
function shuffle(obj, index) {
    let array = [...obj[index].incorrect_answers, obj[index].correct_answer];
    const length = array.length;
    if (!length) {
        return [];
    }
    let i = -1;
    const lastIndex = length - 1;
    const result = [...array];
    while (++i < length) {
        const rand = i + Math.floor(Math.random() * (lastIndex - i + 1));
        const value = result[rand];
        result[rand] = result[i];
        result[i] = value;
    }
    return result;
}

//next answer
function getCorrectAnswer(obj, index) {
    return obj[index].correct_answer;
}

//choices
function displayAnswers(arr) {
    let answerText = "";
    for (let item of arr) {
        answerText += `<li onclick="getAnswer()">${item}</li>`;
    }
    return answerText;
}

//selected answers
function selectAnswer() {
    let answersArr = [...document.getElementsByTagName("li")];
    for (let item of answersArr) {
        if ([...item.classList].includes("selected")) {
            item.classList.remove("selected");
        }
    }
    event.target.classList.add("selected");
    return event.target;
}

//correct answer
function displayCorrectAnswer(correctAnswer) {
    let answersArr = [...document.getElementsByTagName("li")];
    for (let item of answersArr) {
        if (item.textContent === correctAnswer) {
            item.classList.add("correct");
        }
    }
}

//answer2
function getAnswer() {
    submitAnswer.classList.remove("disabled");
    answerElement = selectAnswer();
    selectedAnswer = answerElement.textContent;
}

//reset and score
function resetgame() {
    correctDisplay.textContent = numberOfCorrect;
    modal.style.display = "block";
    modalContent.textContent = `You Score: ${numberOfCorrect}`;
    currentIndex = 0;
    numberOfCorrect = 0;
    questionsLeft = 5;
    correctDisplay.textContent = numberOfCorrect;
    numOfQuestions.textContent = questionsLeft;
}



let next = document.getElementById("next");
let submitAnswer = document.getElementById("submit");
let numOfQuestions = document.getElementById("numOfQuestion");
let correctDisplay = document.getElementById("counter");
let span = document.getElementsByClassName("close")[0];
let modal = document.getElementById("myModal");
let modalContent = document.getElementById("modalContent");
correctAnswer = getCorrectAnswer(questions, currentIndex);
displayQuestion(questions, currentIndex);
numOfQuestions.textContent = questionsLeft;
span.onclick = function() {
    modal.style.display = "none";
}
next.addEventListener('click', function(e) {
    e.preventDefault();
    if (answered) {
        questionsLeft--
        numOfQuestions.textContent = questionsLeft
        next.classList.add('disabled')
        submitAnswer.classList.add('disabled')
        currentIndex++;
        if (currentIndex >= questions.length) {
            resetgame()
        }
        displayQuestion(questions, currentIndex);
        correctAnswer = getCorrectAnswer(questions, currentIndex);
        answered = false;
    }

})

submitAnswer.addEventListener('click', function(e) {
    e.preventDefault();
    if (selectedAnswer) {
        next.classList.remove('disabled')
        if (selectedAnswer === correctAnswer) {
            numberOfCorrect++
            correctDisplay.textContent = numberOfCorrect;
        } else {
            answerElement.classList.add('incorrect')
        }
        displayCorrectAnswer(correctAnswer)
        answered = true;
        selectedAnswer = false;
    }
})