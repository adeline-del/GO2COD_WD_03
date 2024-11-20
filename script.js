const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const historyList = document.querySelector("#history-list");
const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
const clearHistoryBtn = document.querySelector("#clear-history");


// Initialize display and history
display.innerText = "";
renderHistory();

// Button click handling
buttons.forEach((button) => {
    button.onclick = () => {
        if (button.id === "clear") {
            display.innerText = "";
        } else if (button.id === "backspace") {
            display.innerText = display.innerText.slice(0, -1);
        } else if (button.id === "equal") {
            try {
                const result = eval(display.innerText);
                addToHistory(display.innerText, result);
                display.innerText = result;
            } catch {
                display.innerText = "Error";
                setTimeout(() => (display.innerText = ""), 2000);
            }
        } else {
            display.innerText += button.id;
        }
    };
});

// Theme toggling
themeToggleBtn.onclick = () => {
    calculator.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
};

// Add to history
function addToHistory(expression, result) {
    const entry = `${expression} = ${result}`;
    history.push(entry);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();
}

// Render history
function renderHistory() {
    historyList.innerHTML = history
        .map(
            (item, index) =>
                `<li data-index="${index}">${item}</li>`
        )
        .join("");

    // Make history items clickable
    const historyItems = document.querySelectorAll("#history-list li");
    historyItems.forEach((item) => {
        item.onclick = () => {
            const [expression] = item.innerText.split(" = ");
            display.innerText = expression;
        };
    });
}



// Clear history button functionality
clearHistoryBtn.onclick = () => {
    history.length = 0; 
    localStorage.removeItem("calcHistory");
    renderHistory();
};

