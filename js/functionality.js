const xaxis = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const yaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let boards = ["playerBoard", "computerBoard"];
for (let a = 0; a < boards.length; a++) {
    let gridLayout = "<div><h3>" + boards[a] + "</h3></div><hr/>";
    for (let j = 0; j < xaxis.length; j++) {
        gridLayout = gridLayout + ` <ul class="list-unstyled inlineColumns"><li> <h2 class="text-capitalize text-center pt-2">${xaxis[j]}</h2></li>`;
        for (let i = 0; i < yaxis.length; i++) {
            gridLayout = gridLayout + "<li data-value='" + xaxis[j] + yaxis[i] + "'>" + xaxis[j] + yaxis[i] + "</li>";
        }
        gridLayout = gridLayout + "</ul>";
    }
    switch (boards[a]) {
        case "playerBoard":
            document.getElementById("playerBoard").innerHTML = gridLayout;
            break;
        case "computerBoard":
            document.getElementById("computerBoard").innerHTML = gridLayout;
            break;
    }
}