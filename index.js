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

let currentIndex = 0; //current question index
let numberOfCorrect = 0; //number of correct answers
let questionsLeft = 5; // total number of questions
let selectedAnswer, correctAnswer, answerElement;
let answered = false;

//displays the current question
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

//shuffles the position of the correct answer
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

//gets the correct answer from the question object
function getCorrectAnswer(obj, index) {
    return obj[index].correct_answer;
}

//displays the list of options
function displayAnswers(arr) {
    let answerText = "";
    for (let item of arr) {
        answerText += `<li onclick="getAnswer()">${item}</li>`;
    }
    return answerText;
}

//gets the element the player selected
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

//display the correct answer
function displayCorrectAnswer(correctAnswer) {
    let answersArr = [...document.getElementsByTagName("li")];
    for (let item of answersArr) {
        if (item.textContent === correctAnswer) {
            item.classList.add("correct");
        }
    }
}

//gets the answer the player selected
function getAnswer() {
    submitAnswer.classList.remove("disabled");
    answerElement = selectAnswer();
    selectedAnswer = answerElement.textContent;
}

//reset game and display player score
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



let next = document.getElementById("next"); //next button selector
let submitAnswer = document.getElementById("submit"); //submit button selector
let numOfQuestions = document.getElementById("numOfQuestion"); //number of questions span selector
let correctDisplay = document.getElementById("counter"); // number of correct answer span selector
let span = document.getElementsByClassName("close")[0]; //modal close button selector
let modal = document.getElementById("myModal"); // modal elemnent selector
let modalContent = document.getElementById("modalContent"); //modal content selectore
correctAnswer = getCorrectAnswer(questions, currentIndex); //stores the current questions correct answer
displayQuestion(questions, currentIndex); //displays the first question
numOfQuestions.textContent = questionsLeft; //displayes the questions left
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