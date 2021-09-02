// const dataUrl = "https://raw.githubusercontent.com/prathamesh799/quiz-ajax/main/questions.json";
const dataUrl = "https://raw.githubusercontent.com/prathamesh799/quiz-ajax/main/questions-short.json";

const bodyContent = get("#body-id");
let currentQuestionNum = -1;
let all_questions = null;
let correctAnswers = [];
let markedAnswers = [];
let totQuestionCount = 0;
const timerElement = get(".timer");
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
        timerElement.innerHTML = '<p class="last-ten-secs"> Time left '+ min +":" + secs+'</p>';    
    }
    else {
        timerElement.innerHTML = '<p class="in-time"> Time left ' +min +":" + secs+'</p>';
    }    

    remainingSeconds --;

    if (remainingSeconds === 0) {
        clearInterval(displayTimer);
        timerElement.innerHTML = '<p class="last-ten-secs">Time Up!</p>';
        displayResults();
    }
}

function renderData() {
    console.log("currentQuestionNum " + currentQuestionNum);
    console.log(localStorage);
    content = "";

    if (currentQuestionNum == -1) {
        content = `
        <div class="center-container">
        <h2>Quizzo™</h2>
        <div id="login-info">
            <form>
                <div class="form-group">
                    <input type="text" class="form-control" id="inp-name" placeholder="Enter your name..."> </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="inp-roll" placeholder="Enter your roll number"> </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-light" id="submit-btn" value="Submit"> </div>
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

            if (name == "" || roll == "") {
                alert("All fields must be filled");
            }
            else {
                localStorage.setItem("name", name);
                localStorage.setItem("roll", roll);
                currentQuestionNum ++;
                renderData();
                displayTimer = setInterval(updateTimer, 1000);
            }
        };        
    };

    if (currentQuestionNum > -1 && currentQuestionNum < totQuestionCount) {

        content = '<form><fieldset><legend>' +'Q'+(currentQuestionNum +1) +". "+ all_questions[currentQuestionNum].question + '</legend>'
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
        // content += '<input type="submit" class="btn btn-info" id="submit-btn" value="Submit">';

        if (currentQuestionNum > 0) {
            content += '<button class="btn btn-info" id="prev-btn">Prev</button>';
        }

        if (currentQuestionNum < totQuestionCount - 1) {
            content += '<button class="btn btn-info" id="next-btn">Next</button>';
        }

        if (currentQuestionNum == totQuestionCount - 1) {
            content += '<button class="btn btn-success id="finish-btn"">Finish</button>';
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

        for (let i = 0; i < totQuestionCount; i++) {
            markedAnswers.push(localStorage.getItem(('userAnswer' + i).valueOf()));
            if (markedAnswers[i] == correctAnswers[i]) {
                correctCount ++;
            }
        }
        greetings = "<p class='center-container bold-text' style='font-size:larger;'>"+ "Hello "+ localStorage.getItem("name") + " (" + localStorage.getItem("roll") + ") </p>";
        score = '<p class="center-container" style="font-size:larger;"> Your score is ' + correctCount + '/' + all_questions.length;

        content += `<div class="container">
        <div class="row">
          <div class="col-8">
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#Q" aria-expanded="false" aria-controls="collapseExample">Show questions</button><br>
          </div>
          <div class="col-2 center-container">Correct answer</div>
          <div class="col-2 center-container">Marked answer</div>
        </div>`

        for (let q = 0; q < totQuestionCount; q++) {
            content += `
            <div class="row">
              <div class="col-8">
                <p class="result-q" style="margin-top:3px; margin-bottom:3px">
                  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#Q" aria-expanded="false" aria-controls="collapseExample" disabled>
                    Q`+ (q+1) +`
                  </button>
                </p>
                <div class="collapse" id="Q">
                  <div class="card card-body" style="padding:5px;">
                  <p style="margin:0px;margin-bottom:1rem;">`+ all_questions[q].question+`</p>
                    <br><p style="margin:0px;">Correct answer: ` + all_questions[q].answers[correctAnswers[q]] + ` </p>
                    <p style="margin:0px";>Your Answer: `
                    const ans = all_questions[q].answers[markedAnswers[q]];
                    if (ans == undefined) {
                        content += "Did not answer";
                    }
                    else {
                        content += ans;
                    }
                    content += `</p>
                  </div>
                </div>  
              </div>
              <div class="col center-container">
                `+ (parseInt(correctAnswers[q]) + 1).valueOf()+` 
              </div>`
            if (markedAnswers[q] === null) {
                content += '<div class="col center-container wrong"> - </div>'
            }
            else if (markedAnswers[q] == correctAnswers[q]) {
                content += '<div class="col center-container correct">' + (parseInt(markedAnswers[q]) + 1).valueOf() + '</div>'
                correctCount ++;
            }
            else {
                content += '<div class="col center-container wrong">' + (parseInt(markedAnswers[q]) + 1).valueOf() + '</div>'
            }
            content += '</div>'
         }
        bodyContent.innerHTML = greetings + score + content;
        localStorage.clear();
}
