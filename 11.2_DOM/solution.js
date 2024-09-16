
// Aaron Binay
// 9/16/2024

document.getElementById("task1").innerText = "Changed using 'innerText'.";

document.getElementById("task2").innerHTML = `<button type="submit">Submit</button>`;

document.body.style.backgroundColor = "#232323"

document.querySelectorAll(".item").forEach(item => {
    item.style.border = "2px solid black"
});

document.getElementById("task5").href = "https://www.springboard.com/";

document.getElementById("task6").value = "DOM Master";

document.getElementById("task7").classList.add("new-class");

const newButton = document.createElement("button");
newButton.innerText = "Button";
document.getElementById("task8").append(newButton);

document.getElementById("task9").remove();