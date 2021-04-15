const resultBtn = document.querySelector("#result-btn");
resultBtn.addEventListener("click", function (){
    const answers = {"q1":"a", "q2":"b", "q3":"a", "q4":"a", "q5":"b", "q6":"c", "q7":"d", "q8":"a", "q9":"b", "q10":"d"};
    let correct=0;
    const totQuestions = localStorage.length - 2;
    for (let i = 0; i < totQuestions; i++) {
        const s = 'q' + (i + 1).valueOf();
        console.log(s);
        console.log(answers[s], localStorage.getItem(s))
        if (answers[s] == localStorage.getItem(s)) {
            correct ++;
        }
    }
    console.log(correct);
    document.querySelector("#result-div").innerHTML = "<p> Your score is " + correct + " / " + totQuestions + "</p>"
});