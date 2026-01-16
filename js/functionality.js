const xaxis = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const yaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let boards = ["playerBoard", "computerBoard"];
for (let a = 0; a < boards.length; a++) {
    let gridLayout = "<div><h3>" + boards[a] + "</h3></div><hr/>";
    for (let j = 0; j < xaxis.length; j++) {
        gridLayout = gridLayout + ` <ul class="list-unstyled inlineColumns"><li> <h2 class="text-capitalize text-center pt-2">${xaxis[j]}</h2></li>`;
        for (let i = 0; i < yaxis.length; i++) {
            gridLayout = gridLayout + `<li class='alert'  data-value='${xaxis[j] + yaxis[i]}' onClick="selectSq(&#34;#${boards[a]} li[data-value='${xaxis[j]}${yaxis[i]}']&#34;)" >${xaxis[j] + yaxis[i]} </li>`;
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

function selectSq(whichSq) {
    console.log("whichSq: " + whichSq);
    document.querySelector(whichSq).classList.add("clicked");
}

/*

No.	Class of ship	Size
1	Carrier	5
2	Battleship	4
3	Cruiser	3
4	Submarine	3
5	Destroyer	2

*/


const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const direction = ["horizontal", "vertical"];
let boatDirection = Math.floor(Math.random() * (2 - 0) + 0);
const boatsObj = [{
    type: "Carrier", count: 5
},
{
    type: "Battleship", count: 4
},
{
    type: "Cruiser", count: 4
},
{
    type: "Submarine", count: 3
},
{
    type: "Destroyer", count: 2
},
];

let rowsUsed = [];
let columnsUsed = [];


function layoutBoats() {
    for (let i = 0; i < boatsObj.length; i++) {

        let row;
        let column;


        console.log("rowsUsed.length: " + rowsUsed.length);

        console.log("columnsUsed: " + columnsUsed);

        column = Math.floor(Math.random() * (10 - 0) + 0);

        row = Math.floor(Math.random() * (10 - 0) + 0);



        console.log("boatsObj[i].type: " + boatsObj[i].type);
        if (direction[boatDirection] === "horizontal") {



            switch (boatsObj[i].type) {
                case "Carrier":
                    for (let j = 1; j < 6; j++) {
                        if (document.querySelector("#computerBoard li[data-value='" + columns[column - 5] + rows[row] + "']")) {
                            document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                        } else {
                            console.log("columns[column + j] + rows[row]: " + columns[column + j] + rows[row]);
                            document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                        }
                    }
                    break;
                case "Battleship":
                    for (let j = 1; j < 5; j++) {
                        if (document.querySelector("#computerBoard li[data-value='" + columns[column - 4] + rows[row] + "']")) {
                            document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                        } else {
                            document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                        }
                    }
                    break;
                case "Cruiser":
                    for (let j = 1; j < 5; j++) {
                        if (document.querySelector("#computerBoard li[data-value='" + columns[column - 4] + rows[row] + "']")) {
                            document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                        } else {
                            document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                        }
                    }
                    break;
                case "Submarine":
                    for (let j = 1; j < 4; j++) {
                        if (document.querySelector("#computerBoard li[data-value='" + columns[column - 3] + rows[row] + "']")) {
                            document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                        } else {
                            document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                        }
                    }
                    break;
                case "Destroyer":
                    for (let j = 1; j < 3; j++) {
                        if (document.querySelector("#computerBoard li[data-value='" + columns[column - 2] + rows[row] + "']")) {
                            document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                        } else {
                            document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                        }
                    }
                    break;
            }
        } else {




            switch (boatsObj[i].type) {
                case "Carrier":
                    for (let j = 1; j < 6; j++) {
                        if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 5] + "']")) {
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                        } else {
                            console.log("columns[column] + rows[row + j]: " + columns[column] + rows[row + j])
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                        }
                    }
                    break;
                case "Battleship":
                    for (let j = 1; j < 5; j++) {
                        if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 4] + "']")) {
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                        } else {
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                        }
                    }
                    break;
                case "Cruiser":
                    for (let j = 1; j < 5; j++) {
                        if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 4] + "']")) {
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                        } else {
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                        }
                    }
                    break;
                case "Submarine":
                    for (let j = 1; j < 4; j++) {
                        if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 3] + "']")) {
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                        } else {
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                        }
                    }
                    break;
                case "Destroyer":
                    for (let j = 1; j < 3; j++) {
                        if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 2] + "']")) {
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                        } else {
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").classList.add("alert-primary");
                            document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                        }
                    }
                    break;
            }
        }

        console.log("row: " + row + " - column: " + column);




    }
}




layoutBoats();

if (document.querySelector("[data-type='Carrier']").length !== 5) {
    [].forEach.call(document.querySelectorAll("[data-type]"), (e) => {
        e.classList.remove("alert-primary")
    });

    layoutBoats();
}
if (document.querySelector("[data-type='Battleship']").length !== 4) {
    [].forEach.call(document.querySelectorAll("[data-type]"), (e) => {
        e.classList.remove("alert-primary")
    });
    layoutBoats();
}

if (document.querySelector("[data-type='Cruiser']").length !== 3) {
    [].forEach.call(document.querySelectorAll("[data-type]"), (e) => {
        e.classList.remove("alert-primary")
    });
    layoutBoats();
}

if (document.querySelector("[data-type='Submarine']").length !== 3) {
    [].forEach.call(document.querySelectorAll("[data-type]"), (e) => {
        e.classList.remove("alert-primary")
    });
    layoutBoats();
}

if (document.querySelector("[data-type='Destroyer']").length !== 2) {
    [].forEach.call(document.querySelectorAll("[data-type]"), (e) => {
        e.classList.remove("alert-primary")
    });
    layoutBoats();
}


/*

No.	Class of ship	Size
1	Carrier	5
2	Battleship	4
3	Cruiser	3
4	Submarine	3
5	Destroyer	2

*/
