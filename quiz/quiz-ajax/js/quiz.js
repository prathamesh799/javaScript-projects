// const dataUrl = "https://raw.githubusercontent.com/prathamesh799/quiz-ajax/main/questions.json";
const dataUrl = "https://raw.githubusercontent.com/prathamesh799/quiz-ajax/main/questions-short.json";

localStorage.clear();
const bodyContent = get("#body-id");
let currentQuestionNum = -1;
let all_questions = null;
let correctAnswers = [];
let markedAnswers = [];
let totQuestionCount = 0;
const timerElement = get("#timer");
let displayTimer = null;

const quizDuration = 1;
let remainingSeconds = quizDuration * 60;

function get(identifier) {
    return document.querySelector(identifier);
}

document.addEventListener("DOMContentLoaded", () => {   
    getData();
});

function getData() {
    const reqObj = new XMLHttpRequest();
    reqObj.open("GET", dataUrl, true);

    reqObj.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            all_questions = JSON.parse(this.responseText)['questions'];
            totQuestionCount = all_questions.length;

            for (question of all_questions) {
                correctAnswers.push(question.correctIndex);
            }
            renderData();
        }        
    }
    reqObj.send();
}

function updateTimer() {
    const min = Math.floor(remainingSeconds/60);
    let secs = remainingSeconds % 60;

    secs = secs < 10 ? '0' + secs: secs;
    
    if (remainingSeconds < 10) {
        timerElement.innerHTML = '<p class="last-ten-secs">'+ min +":" + secs+'</p>';    
    }
    else {
        timerElement.innerHTML = '<p>'+ min +":" + secs+'</p>';
    }    
    remainingSeconds --;
    if (remainingSeconds === 0) {
        clearInterval(displayTimer);
        timerElement.innerHTML = '<p>Time Up!</p>';
        displayResults();
    }
}

function renderData() {
    console.log("currentQuestionNum " + currentQuestionNum);
    // console.log("answers " + correctAnswers)
    console.log(localStorage);
    content = "";

    if (currentQuestionNum == -1) {
        content = `
        <div id = "center-container">
        <div id = "login-info">
        <h2>Welcome to quiz portal</h2>
        <form>
            <input id="inp-name" type="text" placeholder="Enter your name..."><br>
            <input id="inp-roll" type="text" placeholder="Enter your roll number"><br>
            <input id="submit-btn" type="submit" value="Submit">
        </form>
        </div>
        </div>
        `
        bodyContent.innerHTML = content;

        const subBtn = get("#submit-btn");
        const inpName = get("#inp-name");
        const inpRoll = get("#inp-roll");

        subBtn.onclick = function () {
            const name = inpName.value;
            const roll = inpRoll.value;

            if (name && roll) {
                localStorage.setItem("name", name);
                localStorage.setItem("roll", roll);
            }
            currentQuestionNum ++;
            renderData();
            displayTimer = setInterval(updateTimer, 1000);
        };        
    };

    if (currentQuestionNum > -1 && currentQuestionNum < totQuestionCount) {

        content = '<form><fieldset><legend>' + all_questions[currentQuestionNum].question + '</legend>'
        const options = all_questions[currentQuestionNum].answers;

        for (let i = 0; i < options.length; i++) {
            if (localStorage.hasOwnProperty('userAnswer' + currentQuestionNum) === true) {
                console.log("entered has own");
                const marked = localStorage.getItem('userAnswer'+currentQuestionNum);
                if (marked == i){
                    console.log("entered marked");
                    content += '<input id="option-' + (i + 1).valueOf() + '" type="radio" name="Q' + currentQuestionNum +'" value=' + i + ' checked >';
                }
                else {
                    content += '<input id="option-' + (i + 1).valueOf() + '" type="radio" name="Q' + currentQuestionNum +'" value=' + i + '>';
                }
            }
            else {
                content += '<input id="option-' + (i + 1).valueOf() + '" type="radio" name="Q' + currentQuestionNum +'" value=' + i + '>';
            }
            content += '<label id ="label-' + (i + 1).valueOf() + '" for="option-' + (i + 1).valueOf() + '">' + options[i] + '</label><br>';
        }
        content += '<input type="submit" id="submit-btn" value="Submit">';

        if (currentQuestionNum > 0) {
            content += '<button id="prev-btn">Prev</button>';
        }

        if (currentQuestionNum < totQuestionCount - 1) {
            content += '<button id="next-btn">Next</button>';
        }

        if (currentQuestionNum == totQuestionCount - 1) {
            content += '<button id="finish-btn">Finish</button>';
        }

        content += '</fieldset></form>'

        bodyContent.innerHTML = content;

        const form = get("form");
        form.addEventListener("submit", function(event) {
            const data = new FormData(form);
            for (let entry of data) {
                localStorage["userAnswer" + currentQuestionNum] = entry[1];
            }
            currentQuestionNum ++;
            renderData();
        });

        if (currentQuestionNum < totQuestionCount - 1) {
            const nextBtn = get("#next-btn");
            nextBtn.onclick = function () {
                const data = new FormData(form);

                for (let entry of data) {
                    localStorage["userAnswer" + currentQuestionNum] = entry[1];
                }
                currentQuestionNum ++;
                renderData();
            }
        }

        if (currentQuestionNum > 0) {
            const prevBtn = get("#prev-btn");
            prevBtn.onclick = function () {
                currentQuestionNum --;
                renderData();
            }
        }
        
    }

    if (currentQuestionNum == totQuestionCount) {
        displayResults();
    }
}

function displayResults() {
    clearInterval(displayTimer);
    let correctCount = 0;
    content = "";
        greetings = "<p> Hi " + localStorage.getItem("name") + "! (" + localStorage.getItem("roll") + ") </p>";

        for (let i = 0; i < totQuestionCount; i++) {
            markedAnswers.push(localStorage.getItem(('userAnswer' + i).valueOf()))
        }

        content += '<table id="result-table"><tr><th>Question no.</th><th>Correct answer</th><th>Your answer</th></tr>';
        for (let q = 0; q < totQuestionCount; q++) {
            content += '<tr><td>Q' + (q + 1).valueOf() + '</td><td>' + correctAnswers[q] + '</td>';

            if (markedAnswers[q] == correctAnswers[q]) {
                content += '<td class="answer correct">' + markedAnswers[q] + '</td></tr>'
                correctCount ++;
            }
            else {
                content += '<td class="answer wrong">' + markedAnswers[q] + '</td></tr>'
            }
        }
        bodyContent.innerHTML = greetings + content;
}
