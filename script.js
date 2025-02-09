const inputbar = document.getElementById("input-bar");
const addlist = document.getElementById("taskcolumn");
let increasebox = document.querySelector(".box");

function addtask() {
    if (inputbar.value.trim() === "") {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbar.value;
        addlist.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        manageheight(50);
    }
    inputbar.value = "";
    savedata();
}

addlist.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("firsttask");
        savedata();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savedata();
        manageheight(-50);
    }
}, false);

function savedata() {
    localStorage.setItem("data", addlist.innerHTML);
    localStorage.setItem("boxHeight", increasebox.style.height);
}

function showtask() {
    let savedData = localStorage.getItem("data");
    if (savedData) {
        addlist.innerHTML = savedData;
    }
    restoreBoxHeight();
}

function manageheight(change) {
    let currentHeight = parseInt(getComputedStyle(increasebox).height);
    let newHeight = Math.max(currentHeight + change, 100);
    increasebox.style.height = newHeight + "px";
    localStorage.setItem("boxHeight", newHeight + "px");
}

function restoreBoxHeight() {
    let savedHeight = localStorage.getItem("boxHeight");
    if (savedHeight) {
        increasebox.style.height = savedHeight;
    }
}

showtask();
