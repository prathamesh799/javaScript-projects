// localStorage.clear();
const subBtn = document.getElementById("submit-btn");
const inpName = document.getElementById("inp-name");
const inpRoll = document.getElementById("inp-roll");
subBtn.onclick = function () {
    const name = inpName.value;
    const roll = inpRoll.value;

    if (name && roll) {
        localStorage.setItem("name", name);
        localStorage.setItem("roll", roll);
    }
    console.log(localStorage);
    window.open("questions/q1.html");   
};

