const form = document.querySelector("form");    
const nextBtn = document.getElementById("next-btn");

// nextBtn.addEventListener("click", function() {

form.addEventListener("submit", function(event) {
    // console.log("clicked")
    const data = new FormData(form);
    for (let entry of data) {        
        localStorage.setItem(entry[0], entry[1]);
    }    
    replace();
});

function replace() {
    console.log(page);
    window.location = page;
}


