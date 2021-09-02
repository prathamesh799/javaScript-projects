const resultBtn = document.querySelector("#result-btn");
resultBtn.addEventListener("click", function (){
    const answers = {"q1":"a", "q2":"b", "q3":"a", "q4":"a", "q5":"b", "q6":"c", "q7":"d", "q8":"a", "q9":"b", "q10":"d"};
    let correctCount=0;
    const totQuestions = localStorage.length - 2;
    let tableContent = '<table id="result-table"><tr><th>Question no.</th><th>Correct answer</th><th>Your answer</th></tr>';
    for (let i = 0; i < totQuestions; i++) {
        const s = 'q' + (i + 1).valueOf();
        console.log(s);
        let userAnswer = localStorage.getItem(s);
        console.log(answers[s], userAnswer)
        tableContent += '<tr><td>Q' + (i + 1).valueOf() + '</td><td>' +answers[s] + '</td>'
        if (answers[s] == userAnswer) {
            correctCount ++;
            tableContent += '<td class="answer correct">' + userAnswer + '</td></tr>'
        }
        else {
            tableContent += '<td class="answer wrong">' + userAnswer + '</td></tr>'
        }        
    }
    console.log(correctCount);
    const greeting = "<p> Hi " + localStorage.getItem("name") + "! (" + localStorage.getItem("roll") + ") </p>";
    const score = "<p> Your score is " + correctCount + " / " + totQuestions + "</p>"
    tableContent += '</table>'
    document.querySelector("#result-div").innerHTML = greeting + score + tableContent;
});
localStorage.clear();