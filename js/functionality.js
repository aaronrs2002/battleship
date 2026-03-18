const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const direction = ["horizontal", "vertical"];


let alreadyCalled = [];
let availableCells = [];

function buildAvailable() {
    for (let i = 0; i < columns.length; i++) {
        for (let j = 0; j < rows.length; j++) {
            availableCells.push(columns[i] + rows[j]);
        }
    }

}


let boatTotal = 0;
let anchorHit;
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
let bet = 0;
let playerMoney = 500;
if (localStorage.getItem("balance") && Number(localStorage.getItem("balance"))) {
    playerMoney = Number(localStorage.getItem("balance"));
}
document.querySelector("#playerMoney").innerHTML = playerMoney;

function enableBts() {
    /*forEach was not working*/
    [].forEach.call(document.querySelectorAll('.dealAmt'), function (e) {
        e.disabled = false;
    });
}

function setPlayerMoney(passPlayerMoney, status, bet) {
    document.getElementById("playerMoney").innerHTML = passPlayerMoney;
    document.querySelector("#playerMoney").innerHTML = passPlayerMoney;/*SAFARI BUG NEEDS BOTH*/
    localStorage.setItem("balance", passPlayerMoney);


    if (status.indexOf("win") === 0 || status.indexOf("lose") === 0) {
        document.getElementById("lostWon").innerHTML = status + " $" + bet + "</label>";
    } else {
        status = status.replace("split", ("TOTAL BET: $" + bet))
        document.getElementById("lostWon").innerHTML = "<label class='text-uppercase'>" + status + "</label>";
    }

}

/*END DOES NOT RESET AT DEAL*/


function showAlert(status, message, type) {

    if (message === "default") {

    } else {
        document.getElementById("message").innerHTML = message;

        [].forEach.call(document.querySelectorAll('.dealAmt'), function (e) {
            e.disabled = false;
        });
    }


    enableBts();
    ckHighScore();
    return false;
}

/*start battleship code********************************************************************/
let rowsUsed = [];
let columnsUsed = [];
let waitForNextTurn = false;
const xaxis = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const yaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let boards = ["playerBoard", "computerBoard"];
let targetArr = [];


function buildGrid() {


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
                gridLayout = gridLayout + `<li class='alert'  data-value='${xaxis[j] + yaxis[i]}'  onClick="selectSq('${xaxis[j] + yaxis[i]}','${boards[a]}')" data-status="empty">${xaxis[j] + yaxis[i]} </li>`;
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
}
buildGrid();
let hunting = false;

/*function generate(availableCells) {
    let row;
    let column;
    column = yaxis[Math.floor(Math.random() * (10 - 0) + 0)];
    row = xaxis[Math.floor(Math.random() * (10 - 0) + 0)];
    return row + column;
}*/

const generate = (arr) => {

    console.log("GENERATE WAS CALLED arr: " + arr);
    let selected = [];
    let tempAvailable = [];
    const chosenCell = arr[Math.floor(Math.random() * arr.length)];
    console.log("chosenCell: " + chosenCell);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === chosenCell) {
            selected = arr[i];
            // alreadyCalled.push(arr[i])
        } else {
            tempAvailable.push(arr[i]);
        }

    }

    availableCells = tempAvailable;
    console.log("selected: " + selected);
    return selected;
}





function buildTargetArr(xPosition, yPosition, direction) {
    thisCall = xPosition + yPosition;
    yPosition = Number(yPosition);
    // targetArr = [];
    if (direction === "circle") {

        if (xaxis[xaxis.indexOf(xPosition)] && yaxis[yaxis.indexOf(yPosition + 1)]) {
            if (alreadyCalled.indexOf(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition + 1)]) === -1) {

                targetArr.push(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition + 1)]);
                console.log("pushed " + xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition + 1)]);
            }

        } else {
            /* while (alreadyCalled.indexOf(thisCall) !== -1) {
                 thisCall = generate();
             }*/

            thisCall = generate(availableCells);
            //alreadyCalled.push(thisCall);
            console.log("did not push " + xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition + 1)]);
        }
        if (xaxis[xaxis.indexOf(xPosition) + 1] && yaxis[yaxis.indexOf(yPosition)]) {
            if (alreadyCalled.indexOf(xaxis[xaxis.indexOf(xPosition) + 1] + yaxis[yaxis.indexOf(yPosition)]) === -1) {
                targetArr.push(xaxis[xaxis.indexOf(xPosition) + 1] + yaxis[yaxis.indexOf(yPosition)]);
                console.log("pushed " + xaxis[xaxis.indexOf(xPosition) + 1] + yaxis[yaxis.indexOf(yPosition)]);
            }

        } else {
            /*while (alreadyCalled.indexOf(thisCall) !== -1) {
                thisCall = generate();
            }*/
            thisCall = generate(availableCells);
            // alreadyCalled.push(thisCall);
            console.log("did not push " + xaxis[xaxis.indexOf(xPosition) + 1] + yaxis[yaxis.indexOf(yPosition)]);
        }

        if (xaxis[xaxis.indexOf(xPosition)] && yaxis[yaxis.indexOf(yPosition - 1)]) {
            if (alreadyCalled.indexOf(xaxis[xaxis.indexOf(xPosition)] && yaxis[yaxis.indexOf(yPosition - 1)]) === -1) {
                targetArr.push(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - 1)]);
                console.log("pushed " + xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - 1)]);
            }

        } else {
            /* while (alreadyCalled.indexOf(thisCall) !== -1) {
                 thisCall = generate();
             }*/
            thisCall = generate(availableCells);
            //alreadyCalled.push(thisCall);
            console.log("did not push " + xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - 1)]);
        }
        console.log("xaxis[xaxis.indexOf(xPosition) - 1]: " + xaxis[xaxis.indexOf(xPosition) - 1] + "  - yaxis[yaxis.indexOf(yPosition)]: " + yaxis[yaxis.indexOf(yPosition)]);

        if (xaxis[xaxis.indexOf(xPosition) - 1] && yaxis[yaxis.indexOf(yPosition)]) {
            if (alreadyCalled.indexOf(xaxis[xaxis.indexOf(xPosition) - 1] + yaxis[yaxis.indexOf(yPosition)]) === -1) {
                targetArr.push(xaxis[xaxis.indexOf(xPosition) - 1] + yaxis[yaxis.indexOf(yPosition)]);
                console.log("pushed " + xaxis[xaxis.indexOf(xPosition - 1)] + yaxis[yaxis.indexOf(yPosition)]);
            }

        } else {
            /* while (alreadyCalled.indexOf(thisCall) !== -1) {
                 thisCall = generate();
             }*/
            thisCall = generate(availableCells);
            //alreadyCalled.push(thisCall);
            console.log("did not push " + xaxis[xaxis.indexOf(xPosition) - 1] + yaxis[yaxis.indexOf(yPosition)]);
        }
    }

    if (direction === "runXY") {
        for (let i = 1; i < 6; i++) {
            if (xaxis[xaxis.indexOf(xPosition + i)] && yaxis[yaxis.indexOf(yPosition)]) {
                if (alreadyCalled.indexOf(xaxis[xaxis.indexOf(xPosition + i)] + yaxis[yaxis.indexOf(yPosition)]) === -1 && targetArr.indexOf(xaxis[xaxis.indexOf(xPosition + i)] + yaxis[yaxis.indexOf(yPosition)]) === -1) {

                    targetArr.push(xaxis[xaxis.indexOf(xPosition + i)] + yaxis[yaxis.indexOf(yPosition)]);
                    document.querySelector("li[data-value=" + xaxis[xaxis.indexOf(xPosition + i)] + yaxis[yaxis.indexOf(yPosition)] + "]").classList.add("target");
                    console.log("pushed " + xaxis[xaxis.indexOf(xPosition + i)] + yaxis[yaxis.indexOf(yPosition)]);
                }

            } else {
                /*while (alreadyCalled.indexOf(thisCall) !== -1) {
                    thisCall = generate();
                }*/
                thisCall = generate(availableCells);
                // alreadyCalled.push(thisCall);
            }

            if (xaxis[xaxis.indexOf(xPosition)] && yaxis[yaxis.indexOf(yPosition - i)]) {
                if (alreadyCalled.indexOf(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - i)]) === -1 && targetArr.indexOf(xaxis[xaxis.indexOf(xPosition - i)] + yaxis[yaxis.indexOf(yPosition)]) === -1) {
                    document.querySelector("li[data-value=" + xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - i)] + "]").classList.add("target");
                    targetArr.push(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - i)]);
                    console.log("pushed " + xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - i)]);
                }

            } else {
                /* while (alreadyCalled.indexOf(thisCall) !== -1) {
                     thisCall = generate();
                 }*/
                thisCall = generate(availableCells);
                // alreadyCalled.push(thisCall);
            }

            if (xaxis[xaxis.indexOf(xPosition)] && yaxis[yaxis.indexOf(yPosition + i)]) {
                if (alreadyCalled.indexOf(xaxis[xaxis.indexOf(xPosition)] && yaxis[yaxis.indexOf(yPosition + i)]) === -1 && targetArr.indexOf(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition + i)]) === -1) {
                    document.querySelector("li[data-value=" + xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition + i)] + "]").classList.add("target");
                    targetArr.push(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition + i)]);
                    console.log("pushed " + xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition + i)]);
                }

            } else {
                /* while (alreadyCalled.indexOf(thisCall) !== -1) {
                     thisCall = generate();
                 }*/
                thisCall = generate(availableCells);
                // alreadyCalled.push(thisCall);
            }

            if (xaxis[xaxis.indexOf(xPosition)] && yaxis[yaxis.indexOf(yPosition - i)]) {
                if (alreadyCalled.indexOf(xaxis[xaxis.indexOf(xPosition)] && yaxis[yaxis.indexOf(yPosition - i)]) === -1 && targetArr.indexOf(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - 1)]) === -1) {
                    targetArr.push(xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - 1)]);
                    document.querySelector("li[data-value=" + xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - i)] + "]").classList.add("target");
                    console.log("pushed " + xaxis[xaxis.indexOf(xPosition)] + yaxis[yaxis.indexOf(yPosition - i)]);
                }

            } else {
                /* while (alreadyCalled.indexOf(thisCall) !== -1) {
                     thisCall = generate();
                 }*/
                thisCall = generate(availableCells);
                // alreadyCalled.push(thisCall);
            }

        }




    }

    /* if ((typeof direction) === "number") {
 
         if (alreadyCalled.indexOf(anchorHit) > targetArr.indexOf(anchorHit)) {
 
 
         }
 
 
 
     }*/
    // alreadyCalled.push(xPosition + yPosition);

    let tempTargetArr = [];
    for (let i = 0; i < targetArr.length; i++) {
        if (alreadyCalled.indexOf(targetArr[i]) === -1) {

            tempTargetArr.push(targetArr[i]);
            // alreadyCalled.push(targetArr[i]);
            document.querySelector("#computerBoard  li[data-value='" + targetArr[i] + "']").classList.remove("target");
        }

    }
    targetArr = tempTargetArr;
};


function hunt(startpoint, direction) {
    startpoint = startpoint.toString();
    let xPosition = startpoint[0];
    let yPosition = startpoint.substring(1);
    yPosition = Number(yPosition);

    if (direction === "runXY") {
        buildTargetArr(xPosition, yPosition, direction);
    }

    if (targetArr.length === 0) {
        buildTargetArr(xPosition, yPosition, direction);
    }
}

function selectSq(cell, player) {
    console.log("PLAYER: " + JSON.stringify(player))
    if (player === "playerBoard") {
        globalAlert("alert-danger", "Why do you want to sink your own ships? That is your board.");
        return false;
    }
    if (document.querySelectorAll("#playerBoard  li[data-status='hit']").length === 17) {
        document.getElementById("placementPanel").classList.remove("hide");
        document.getElementById("gamePanel").classList.add("hide");
        globalAlert("alert-danger", "You lost!");
        playerMoney = (playerMoney - bet);
        setPlayerMoney(playerMoney, "lose", bet);
        document.getElementById("bothPanels").classList.add("hide");
        enableBts();
        return false;
    }

    if (document.querySelectorAll("#computerBoard  li[data-status='hit']").length === 17) {
        document.getElementById("placementPanel").classList.remove("hide");
        document.getElementById("gamePanel").classList.add("hide");
        globalAlert("alert-success", "You won!");
        playerMoney = (playerMoney - bet);
        setPlayerMoney(playerMoney, "win", bet);
        document.getElementById("bothPanels").classList.add("hide");
        enableBts();
        return false;
    }

    if (document.querySelector("#computerBoard  li[data-value='" + cell + "']").dataset.status === "empty") {
        document.querySelector("#computerBoard  li[data-value='" + cell + "']").classList.add("alert-info");
    } else {
        document.querySelector("#computerBoard  li[data-value='" + cell + "']").dataset.status = "hit";
        document.querySelector("#computerBoard  li[data-value='" + cell + "']").classList.add("alert-danger");
        document.querySelector("#computerBoard  li[data-value='" + cell + "']").classList.remove("alert-success");
        if (player === "playerBoard") {
            hunt(cell, "circle");
        }
    }

    /* if (document.querySelectorAll("#computerBoard  li[data-status='hit']").length === 17) {
         document.getElementById("placementPanel").classList.remove("hide");
         document.getElementById("gamePanel").classList.add("hide");
         globalAlert("alert-success", "You won!");
         return false;
     }*/
    /***the computer's turn */


    function aiSelect() {


        let thisCall = ""

        let howManyleft = 0;
        [].forEach.call(document.querySelectorAll("#playerBoard .alert-success[data-value]"), (e) => {
            howManyleft = (howManyleft + 1);
        });


        if (howManyleft <= 6) {
            [].forEach.call(document.querySelectorAll("#playerBoard li.alert-success[data-value]"), (e) => {
                if (targetArr.indexOf(e.dataset.value) === -1) {
                    targetArr.push(e.dataset.value);
                }


            });

            console.log("we just pushed the last 5 targetArr: " + targetArr);
        } else {
            console.log(`howManyleft: ` + howManyleft);
        }




        if (!document.querySelector("#playerBoard .target[data-value]")) {
            /*while (alreadyCalled.indexOf(thisCall) !== -1) {
                thisCall = generate();
            }*/
            console.log("availableCells FROM INITITAL CHOICE: " + availableCells);
            thisCall = generate(availableCells);
            //alreadyCalled.push(thisCall);
        } else {
            [].forEach.call(document.querySelectorAll("#playerBoard .target[data-value]"), (e, i) => {

                if (i === 0) {
                    thisCall = e.dataset.value;
                    e.classList.remove("target");
                    let tempArr = [];
                    for (let i = 0; i < targetArr.length; i++) {
                        if (targetArr[i] !== thisCall) {
                            tempArr.push(targetArr[i]);
                        }

                    }
                    targetArr = tempArr;
                }
            });

        }
        console.log("this call: " + thisCall);

        if (!thisCall || thisCall === "") {
            availableCells = [];
            for (let i = 0; i < columns.length; i++) {
                for (let j = 0; j < rows.length; j++) {
                    if (alreadyCalled.indexOf((columns[i] + rows[j])) === -1) {
                        availableCells.push(columns[i] + rows[j]);
                    }

                }
            }
            console.log("WE REBUILT THE AVAILABLE CELLS!")
            aiSelect();
        }

        /*if (!thisCall) {
            thisCall = generate(availableCells);
        }*/

        if (targetArr.length === 0) {
            if (document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").dataset.status === "empty") {
                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").classList.add("alert-info");
                alreadyCalled.push(thisCall);

                hunting = false;
            } else {

                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").dataset.status = "hit";
                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").classList.add("alert-danger");
                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").classList.remove("alert-success");
                alreadyCalled.push(thisCall);
                hunting = true;
                buildTargetArr(thisCall[0], thisCall.substring(1), "circle")
                for (let i = 0; i < targetArr.length; i++) {
                    if (document.querySelector("#playerBoard li[data-value='" + targetArr[i] + "']")) {
                        document.querySelector("#playerBoard li[data-value='" + targetArr[i] + "']").classList.add("target");
                    }

                }
            }


            console.log("alreadyCalled: " + alreadyCalled + " - targetArr: " + targetArr);
        } else {


            //  console.log("status: " + document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").dataset.status)
            if (document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").dataset.status === "empty") {
                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").classList.add("alert-info");
                alreadyCalled.push(thisCall);
            } else {
                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").dataset.status = "hit";
                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").classList.add("alert-danger");
                document.querySelector("#playerBoard  li[data-value='" + thisCall + "']").classList.remove("alert-success");
                document.querySelector("#playerBoard li[data-value='" + thisCall + "']").classList.remove("target");
                alreadyCalled.push(thisCall);
                hunt(thisCall, "runXY");
                anchorHit = thisCall;
            }

            let tempArr = [];
            for (let i = 0; i < targetArr.length; i++) {
                if (alreadyCalled.indexOf(targetArr[i]) === -1) {
                    tempArr.push(targetArr[i]);
                    document.querySelector("#playerBoard li[data-value='" + targetArr[i] + "']").classList.add("target");
                }

            }
            targetArr = tempArr;
            console.log("One less targetArr: " + targetArr);


        }



    }
    console.log("alreadyCalled: " + alreadyCalled);
    aiSelect();



};

/*
No.	Class of ship	Size
1	Carrier	5
2	Battleship	4
3	Cruiser	3
4	Submarine	3
5	Destroyer	2
*/

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
                        if (direction[CarrierDirection] === "horizontal") {

                            for (let j = 1; j < 6; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column - 5] + rows[row] + "'][data-status='empty']")) {

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
                            for (let j = 1; j < 6; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 5] + "'][data-status='empty']")) {
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
    let placementError = false;
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

    if (document.querySelector("#playerBoard li[data-value='" + row + column + "']").dataset.status !== "empty") {
        document.getElementById("errorMessage").innerHTML = "Please select a vacant spot.";
        document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.add("alert-success");
        return false;
    }



    document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.add("alert-success");

    if (direction === "down") {
        for (let i = 0; i < activeSize; i++) {
            if (document.querySelector("#playerBoard li[data-value='" + row + (Number(column) + i) + "'][data-status='empty']")) {
                document.querySelector("#playerBoard li[data-value='" + row + (Number(column) + i) + "']").classList.add("alert-success");
                document.querySelector("#playerBoard li[data-value='" + row + (Number(column) + i) + "']").dataset.status = activeBoat;
            } else {

                document.getElementById("errorMessage").innerHTML = "That boat will go off your board. Please try again.";
                document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.remove("alert-success");
                [].forEach.call(document.querySelectorAll("#playerBoard [data-status='" + activeBoat + "']"), (e) => {
                    e.dataset.status = "empty";
                    e.classList.remove("alert-success");

                });
                placementError = true;
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

                document.getElementById("errorMessage").innerHTML = "That boat will go off your board. Please try again.";
                document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.remove("alert-success");
                [].forEach.call(document.querySelectorAll("#playerBoard [data-status='" + activeBoat + "']"), (e) => {
                    e.dataset.status = "empty";
                    e.classList.remove("alert-success");

                });
                placementError = true;

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

                document.getElementById("errorMessage").innerHTML = "That boat will go off your board. Please try again.";
                document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.remove("alert-success");
                [].forEach.call(document.querySelectorAll("#playerBoard [data-status='" + activeBoat + "']"), (e) => {
                    e.dataset.status = "empty";
                    e.classList.remove("alert-success");

                });
                placementError = true;

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

                document.getElementById("errorMessage").innerHTML = "That boat will go off your board. Please try again.";
                document.querySelector("#playerBoard li[data-value='" + row + column + "']").classList.remove("alert-success");
                [].forEach.call(document.querySelectorAll("#playerBoard [data-status='" + activeBoat + "']"), (e) => {
                    e.dataset.status = "empty";
                    e.classList.remove("alert-success");

                });

                placementError = true;
            }

        }
    }
    if ((typeof document.querySelectorAll("#playerBoard  [data-status='" + activeBoat + "']").length) === "number") {
        if (!placementError) {
            document.querySelector("button[data-boat='" + activeBoat + "']").remove();
        }


    }

    if (!document.querySelector("#userBoats button[data-boat]")) {

        document.getElementById("placementPanel").classList.add("hide");
        document.getElementById("gamePanel").classList.remove("hide");
        /*  <div id="gamePanel" class="hide"><h1>Hunt down the enemy!</h1></div>
  <div id="placementPanel"></div>*/
    }


    [].forEach.call(document.querySelectorAll("button[data-boat]"), (e, i) => {
        if (i === 0) {
            selectBoat(e.dataset.boat);
        }
    });


}


/*DOES NOT RESET AT DEAL******************************************/

function deal(playerBet) {
    alreadyCalled = [];
    availableCells = [];
    buildAvailable();
    targetArr = [];
    boatTotal = 0;
    anchorHit;
    rowsUsed = [];
    columnsUsed = [];
    waitForNextTurn = false;
    buildGrid();
    layoutBoats();

    document.getElementById("bothPanels").classList.remove("hide");
    if (playerBet === "any") {
        playerBet = Number(document.querySelector("[name='anyAmount']").value);
        document.getElementById("betAny").setAttribute("alt", playerBet);
        document.querySelector("[name='anyAmount']").value = "";
    }
    [].forEach.call(document.querySelectorAll('.dealAmt'), function (e) {
        e.classList.remove('active');
        e.disabled = true;
    });
    document.querySelector(".dealAmt[alt='" + playerBet + "']").classList.add("active");
    bet = playerBet;
    document.getElementById("betTarget").innerHTML = "Bet: $" + bet;

    document.getElementById("playerTotal").innerHTML = playerMoney;

    document.getElementById("playerTotal").classList.add("hide");

    toggle("default");
    selectBoat('Carrier');
    showAlert("default", "default", "hide");




}