const form = document.querySelector("form");    
form.addEventListener("submit", function(event) {
    console.log()
    const data = new FormData(form);
    for (let entry of data) {
        
        localStorage.setItem(entry[0], entry[1]);
        console.log(localStorage)
    }
});

