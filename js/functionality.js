const xaxis = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const yaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let boards = ["playerBoard", "computerBoard"];
let rowsHTML = "";
let columnsHTML = "";
for (let i = 0; i < xaxis.length; i++) {
    rowsHTML = rowsHTML + "<option value='" + xaxis[i] + "'>" + xaxis[i] + "</option>";
    columnsHTML = columnsHTML + "<option value='" + yaxis[i] + "'>" + yaxis[i] + "</option>";
}

document.querySelector("select[name='rows']").innerHTML = rowsHTML;
document.querySelector("select[name='columns']").innerHTML = columnsHTML;

for (let a = 0; a < boards.length; a++) {
    let gridLayout = "";
    for (let j = 0; j < xaxis.length; j++) {
        gridLayout = gridLayout + ` <ul class="list-unstyled inlineColumns"><li> <h2 class="text-capitalize text-center pt-2">${xaxis[j]}</h2></li>`;
        for (let i = 0; i < yaxis.length; i++) {
            gridLayout = gridLayout + `<li class='alert'  data-value='${xaxis[j] + yaxis[i]}' onClick="selectSq('${xaxis[j] + yaxis[i]}')" data-status="empty">${xaxis[j] + yaxis[i]} </li>`;
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



let hunting = false;
function hunt(startpoint) {

    console.log("(typeof startpoint): " + (typeof startpoint));
    console.log("startpoint: " + startpoint + " - startpoint.length; " + startpoint.length);
    startpoint = startpoint.toString();

    let xPosition = startpoint[0];
    let yPosition = startpoint[1];/**/
    yPosition = Number(yPosition);

    /* if (startpoint && startpoint.length >= 2) {
         // Return the character at the second index (index 1 in zero-based indexing).
         yPosition = startpoint[1];
         console.log("startpoint[1]: " + startpoint[1]);
     } else {
         // Return undefined or a default value if there are fewer than two numbers.
         console.log("undefined: " + undefined);
     }
 
     /*
     const xaxis = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
     const yaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
     
     */
    let targetArr = [];


    function buildTargetArr(xPosition, yPosition) {

        targetArr.push(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition + 1)]);
        targetArr.push(xaxis[xaxis.indexOf(xPosition) + 1] + yaxis[yaxis.indexOf(yPosition)]);
        targetArr.push(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - 1)]);
        targetArr.push(xaxis[xaxis.indexOf(xPosition) - 1] + yaxis[yaxis.indexOf(yPosition)]);


    };

    console.log("xPosition: " + xPosition + " xaxis.indeOf(xPosition): " + xaxis.indexOf(xPosition));
    console.log("yPosition: " + yPosition + " yaxis.indeOf(yPosition): " + yaxis.indexOf(yPosition));
    buildTargetArr(xPosition, yPosition);
    console.log("targetArr: " + targetArr);
}




function selectSq(cell) {
    console.log("cell: " + cell);

    console.log("status: " + document.querySelector("#computerBoard  li[data-value='" + cell + "']").dataset.status)
    if (document.querySelector("#computerBoard  li[data-value='" + cell + "']").dataset.status === "empty") {
        document.querySelector("#computerBoard  li[data-value='" + cell + "']").classList.add("alert-info");
    } else {
        document.querySelector("#computerBoard  li[data-value='" + cell + "']").dataset.status = "hit";
        document.querySelector("#computerBoard  li[data-value='" + cell + "']").classList.add("alert-danger");
        hunt(cell);
    }

    if (document.querySelectorAll("#computerBoard  li[data-status='hit']").length === 17) {
        document.getElementById("placementPanel").classList.remove("hide");
        document.getElementById("gamePanel").classList.add("hide");
        globalAlert("alert-success", "You won!");
        return false;

    }


    /***the computer's turn */
    let alreadyCalled = [];
    function generate() {
        let row;
        let column;
        column = yaxis[Math.floor(Math.random() * (10 - 0) + 0)];
        row = xaxis[Math.floor(Math.random() * (10 - 0) + 0)];
        return row + column;
    }



    function aiSelect() {
        let thisCall = generate();

        console.log("AI's turn to play! hunting: " + hunting);

        if (hunting) {

            thisCall = targetArr[0];

            if (document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").dataset.status === "empty") {
                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").classList.add("alert-info");
            } else {
                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").dataset.status = "hit";
                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").classList.add("alert-danger");
                hunting = true;

            }

            targetArr = targetArr.substring(1);
            console.log("targetArr from AI: " + targetArr);


        } else {
            if (alreadyCalled.indexOf(thisCall) == -1) {
                console.log("thisCall from line 38: " + thisCall);
                //  console.log("status: " + document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").dataset.status)
                if (document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").dataset.status === "empty") {
                    document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").classList.add("alert-info");
                } else {
                    document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").dataset.status = "hit";
                    document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").classList.add("alert-danger");

                    hunt(thisCall);
                }
                alreadyCalled.push(thisCall);

            }
        }


    }
    console.log("alreadyCalled: " + alreadyCalled);
    aiSelect();



};



if (document.querySelectorAll("#playerBoard  li[data-status='hit']").length === 17) {
    document.getElementById("placementPanel").classList.remove("hide");
    document.getElementById("gamePanel").classList.add("hide");
    globalAlert("alert-success", "You won!");


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
let boatTotal = 0;

const boatsObj = [{
    type: "Carrier", count: 5
},
{
    type: "Battleship", count: 4
},
{
    type: "Cruiser", count: 3
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
    let = boatListHTML = "";
    for (let i = 0; i < boatsObj.length; i++) {

        boatListHTML = boatListHTML + `<li><button class='btn btn-secondary form-control my-2' data-boat="${boatsObj[i].type}" data-count="${boatsObj[i].count}" onClick="selectBoat('${boatsObj[i].type}')" >${boatsObj[i].type}</button></li>`;


        let row;
        let column;
        column = Math.floor(Math.random() * (10 - 0) + 0);
        row = Math.floor(Math.random() * (10 - 0) + 0);

        let ranOnce = false;
        if (!ranOnce) {
            ranOnce = true;
            switch (boatsObj[i].type) {
                case "Carrier":
                    let carrierSuccess = 0;

                    function runCarrier() {

                        let CarrierDirection = Math.floor(Math.random() * (2 - 0) + 0);
                        carrierSuccess = 0;
                        //   console.log("direction[CarrierDirection]: " + direction[CarrierDirection]);
                        if (direction[CarrierDirection] === "horizontal") {

                            for (let j = 1; j < 6; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column - 5] + rows[row] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.status = "occupied";
                                    //  console.log("horizontal Carrier")
                                    // carrierSuccess = carrierSuccess++;
                                } else {
                                    //  console.log("columns[column + j] + rows[row]: " + columns[column + j] + rows[row]);
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "'][data-status='empty']")) {

                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.status = "occupied";
                                        // console.log("horizontal Carrier")
                                        // carrierSuccess = carrierSuccess++;
                                    }

                                }
                            }

                        } else {
                            for (let j = 1; j < 6; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 5] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.status = "occupied";
                                    //  console.log("vertical Carrier")
                                    // carrierSuccess = carrierSuccess++;
                                } else {
                                    // console.log("columns[column] + rows[row + j]: " + columns[column] + rows[row + j])
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "'][data-status='empty']")) {

                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.status = "occupied";
                                        // console.log("vertical carrier")
                                        //carrierSuccess = carrierSuccess++;
                                    }

                                }
                            }
                        }
                    }


                    [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Carrier']"), (e) => {
                        carrierSuccess = carrierSuccess + 1;
                    });

                    // console.log("carrierSuccess: " + carrierSuccess);
                    if (carrierSuccess !== 5) {
                        [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Carrier']"), (e) => {
                            e.removeAttribute("data-type");
                            e.dataset.status = "empty";
                        });
                        runCarrier();
                    }
                    break;



                case "Battleship":

                    let battleshipSuccess = 0;
                    function runBattleship() {
                        battleshipSuccess = 0;




                        let BattleshipDirection = Math.floor(Math.random() * (2 - 0) + 0);
                        // console.log ("direction[BattleshipDirection]: " + direction[BattleshipDirection]);
                        if (direction[BattleshipDirection] === "horizontal") {
                            for (let j = 1; j < 5; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column - 4] + rows[row] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.status = "occupied";
                                    //  console.log("horizontal Battleship")
                                    //  battleshipSuccess = battleshipSuccess++;
                                } else {
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "'][data-status='empty']")) {

                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.status = "occupied";
                                        // console.log("vertical Battleship")
                                        // battleshipSuccess = battleshipSuccess++;
                                    }

                                }
                            }


                        } else {

                            for (let j = 1; j < 5; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 4] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.status = "occupied";
                                    //  console.log("vertical Battleship 1");
                                    //   battleshipSuccess = battleshipSuccess + 1;
                                } else {
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "'][data-status='empty']")) {

                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.status = "occupied";
                                        //  console.log("vertical Battleship 2");
                                        //  battleshipSuccess = battleshipSuccess + 1;
                                    }

                                }
                            }

                        }

                    }


                    [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Battleship']"), (e) => {
                        battleshipSuccess = battleshipSuccess + 1;
                    });


                    //   console.log("how many battleshipe squares: " + battleshipSuccess);
                    if (battleshipSuccess !== 4) {
                        [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Battleship']"), (e) => {
                            e.removeAttribute("data-type");
                            e.dataset.status = "empty";
                        });
                        runBattleship();
                    }
                    break;


                case "Cruiser":
                    let cruiserSuccess = 0;
                    function runCruiser() {
                        cruiserSuccess = 0;
                        let CruiserDirection = Math.floor(Math.random() * (2 - 0) + 0);

                        if (direction[CruiserDirection] === "horizontal") {
                            for (let j = 1; j < 4; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column - 4] + rows[row] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.status = "occupied";
                                } else {
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "'][data-status='empty']")) {
                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.status = "occupied";
                                    }


                                }
                            }
                        } else {
                            for (let j = 1; j < 4; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 4] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.status = "occupied";
                                } else {

                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "'][data-status='empty']")) {
                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.status = "occupied";
                                    }

                                }
                            }
                        }

                    }

                    [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Cruiser']"), (e) => {
                        cruiserSuccess = cruiserSuccess + 1;
                    });


                    //  console.log("how many Cruiser squares: " + cruiserSuccess);
                    if (cruiserSuccess !== 3) {
                        [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Cruiser']"), (e) => {
                            e.removeAttribute("data-type");
                            e.dataset.status = "empty";
                        });
                        runCruiser();
                    }

                    break;

                case "Submarine":
                    let submarineSuccess = 0;
                    function runSubmarine() {
                        submarineSuccess = 0;
                        let SubmarineDirection = Math.floor(Math.random() * (2 - 0) + 0);
                        //  console.log("direction[SubmarineDirection]: " + direction[SubmarineDirection]);
                        if (direction[SubmarineDirection] === "horizontal") {
                            for (let j = 1; j < 4; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column - 3] + rows[row] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.status = "occupied";
                                } else {
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "'][data-status='empty']")) {

                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.status = "occupied";
                                    }

                                }
                            }

                        } else {
                            for (let j = 1; j < 4; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 3] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.status = "occupied";
                                } else {
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "'][data-status='empty']"))

                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.status = "occupied";
                                }
                            }

                        }

                    }


                    [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Submarine']"), (e) => {
                        submarineSuccess = submarineSuccess + 1;
                    });


                    // console.log("how many Submarine squares: " + submarineSuccess);
                    if (submarineSuccess !== 3) {
                        [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Submarine']"), (e) => {
                            e.removeAttribute("data-type");
                            e.dataset.status = "empty";
                        });
                        runSubmarine();
                    }
                    break;

                case "Destroyer":
                    let destroyerSuccess = 0;
                    function runDestroyer() {
                        destroyerSuccess = 0;
                        let DestroyerDirection = Math.floor(Math.random() * (2 - 0) + 0);
                        // console.log("direction[DestroyerDirection]: " + direction[DestroyerDirection]);
                        if (direction[DestroyerDirection] === "horizontal") {
                            for (let j = 1; j < 3; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column - 2] + rows[row] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.status = "occupied";
                                } else {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.status = "occupied";
                                }
                            }

                        } else {
                            for (let j = 1; j < 3; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 2] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.status = "occupied";
                                } else {
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "'][data-status='empty']")) {
                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.status = "occupied";
                                    }

                                }
                            }
                        }
                    }
                    [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Destroyer']"), (e) => {
                        destroyerSuccess = destroyerSuccess + 1;
                    });


                    // console.log("how many Destroyer squares: " + destroyerSuccess);
                    if (destroyerSuccess !== 3) {
                        [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Destroyer']"), (e) => {
                            e.removeAttribute("data-type");
                            e.dataset.status = "empty";
                        });
                        runDestroyer();
                    }

                    break;
            }
        }
    }

    document.getElementById("userBoats").innerHTML = boatListHTML;
    let boatLengths = [document.querySelectorAll("[data-type='Carrier']").length,
    document.querySelectorAll("[data-type='Battleship']").length,
    document.querySelectorAll("[data-type='Cruiser']").length,
    document.querySelectorAll("[data-type='Submarine']").length,
    document.querySelectorAll("[data-type='Destroyer']").length];

    for (let i = 0; i < boatLengths.length; i++) {
        // console.log("Boat: " + boatsObj[i].type + " - has this many: " + boatLengths[i]);
        boatTotal = boatTotal + boatLengths[i];
    }

    if (boatTotal !== 17) {
        // console.log("Boat total: " + boatTotal);
        [].forEach.call(document.querySelectorAll("[data-type]"), (e) => {
            e.removeAttribute("data-type");
            e.dataset.status = "empty";
        });
        // console.log("run layoutBoats() again!");
        boatTotal = 0;
        layoutBoats();
    }
}


layoutBoats();



/*

No.	Class of ship	Size
1	Carrier	5
2	Battleship	4
3	Cruiser	3
4	Submarine	3
5	Destroyer	2

*/
//Use place boats start*/


function selectBoat(whichBoat) {
    // console.log("whichBoat: " + whichBoat);
    document.getElementById("boatSelectedTitle").innerHTML = whichBoat;
    [].forEach.call(document.querySelectorAll("#userBoats button"), (e) => {
        if (e.dataset.boat === whichBoat) {
            e.classList.add("active");
        } else {
            e.classList.remove("active");
        }
    })

}


function placeBoat() {
    if (!document.querySelector("#userBoats button.active[data-boat]")) {
        document.getElementById("errorMessage").innerHTML = "Please select a boat."
        return false;
    }

    document.getElementById("errorMessage").innerHTML = "";
    let direction = document.querySelector("select[name='direction']").value;
    let row = document.querySelector("select[name='rows']").value;
    let column = document.querySelector("select[name='columns']").value;
    let activeBoat = document.querySelector("#userBoats button.active[data-boat]").dataset.boat;
    let activeSize = document.querySelector("#userBoats button.active[data-boat]").dataset.count;

    if (!document.querySelector("#playerBoard li[data-value='" + row + column + "']").dataset.status === "empty") {
        document.getElementById("errorMessage").innerHTML = "Please select a vacant spot.";
        return false;
    }



    document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.add("alert-success");

    if (direction === "down") {
        for (let i = 0; i < activeSize; i++) {
            if (document.querySelector("#playerBoard li[data-value='" + row + (Number(column) + i) + "'][data-status='empty']")) {
                document.querySelector("#playerBoard li[data-value='" + row + (Number(column) + i) + "']").classList.add("alert-success");
                document.querySelector("#playerBoard li[data-value='" + row + (Number(column) + i) + "']").dataset.status = activeBoat;
            } else {

                document.getElementById("errorMessage").innerHTML = "That boat will go off your board. Pleas try again.";
                document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.remove("alert-success");
                [].forEach.call(document.querySelectorAll("#playerBoard [data-status='" + activeBoat + "']"), (e) => {
                    e.dataset.status = "empty";
                    e.classList.remove("alert-success");

                });
                return false;

            }

        }
    }

    if (direction === "up") {
        for (let i = 0; i < activeSize; i++) {
            if (document.querySelector("#playerBoard li[data-value='" + row + (column - i) + "'][data-status='empty']")) {
                document.querySelector("#playerBoard li[data-value='" + row + (column - i) + "']").classList.add("alert-success");
                document.querySelector("#playerBoard li[data-value='" + row + (column - i) + "']").dataset.status = activeBoat;
            } else {

                document.getElementById("errorMessage").innerHTML = "That boat will go off your board. Pleas try again.";
                document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.remove("alert-success");
                [].forEach.call(document.querySelectorAll("#playerBoard [data-status='" + activeBoat + "']"), (e) => {
                    e.dataset.status = "empty";
                    e.classList.remove("alert-success");

                })

            }

        }
    }
    /*to the right******************************************************/
    if (direction === "right") {
        let start = xaxis.indexOf(row);

        for (let i = 0; i < activeSize; i++) {

            if (document.querySelector("#playerBoard li[data-status='empty'][data-value='" + xaxis[start + i] + column + "']")) {


                console.log("start: " + start)
                console.log("xaxis[row + i] + column: " + xaxis[start + i] + column);
                document.querySelector("#playerBoard li[data-value='" + xaxis[start + i] + column + "']").classList.add("alert-success");
                document.querySelector("#playerBoard li[data-value='" + xaxis[start + i] + column + "']").dataset.status = activeBoat;
            } else {

                document.getElementById("errorMessage").innerHTML = "That boat will go off your board. Pleas try again.";
                document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.remove("alert-success");
                [].forEach.call(document.querySelectorAll("#playerBoard [data-status='" + activeBoat + "']"), (e) => {
                    e.dataset.status = "empty";
                    e.classList.remove("alert-success");

                })

            }

        }
    }

    /*to the left******************************************************/

    if (direction === "left") {
        let start = xaxis.indexOf(row);
        for (let i = 0; i < activeSize; i++) {
            if (document.querySelector("#playerBoard li[data-status='empty'][data-value='" + xaxis[start - i] + column + "']")) {



                console.log("start: " + start)
                console.log("xaxis[row + i] + column: " + xaxis[start + i] + column);
                document.querySelector("#playerBoard li[data-value='" + xaxis[start - i] + column + "']").classList.add("alert-success");
                document.querySelector("#playerBoard li[data-value='" + xaxis[start - i] + column + "']").dataset.status = activeBoat;
            } else {

                document.getElementById("errorMessage").innerHTML = "That boat will go off your board. Pleas try again.";
                document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.remove("alert-success");
                [].forEach.call(document.querySelectorAll("#playerBoard [data-status='" + activeBoat + "']"), (e) => {
                    e.dataset.status = "empty";
                    e.classList.remove("alert-success");

                })

            }

        }
    }
    if ((typeof document.querySelectorAll("#playerBoard  [data-status='" + activeBoat + "']").length) === "number") {
        document.querySelector("button[data-boat='" + activeBoat + "']").remove();

    }

    if (!document.querySelector("#userBoats button[data-boat]")) {

        document.getElementById("placementPanel").classList.add("hide");
        document.getElementById("gamePanel").classList.remove("hide");
        /*  <div id="gamePanel" class="hide"><h1>Hunt down the enemy!</h1></div>
  <div id="placementPanel"></div>*/
    }

}