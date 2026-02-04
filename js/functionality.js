const xaxis = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const yaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let boards = ["playerBoard", "computerBoard"];
for (let a = 0; a < boards.length; a++) {
    let gridLayout = "<div><h3>" + boards[a] + "</h3></div><hr/>";
    for (let j = 0; j < xaxis.length; j++) {
        gridLayout = gridLayout + ` <ul class="list-unstyled inlineColumns"><li> <h2 class="text-capitalize text-center pt-2">${xaxis[j]}</h2></li>`;
        for (let i = 0; i < yaxis.length; i++) {
            gridLayout = gridLayout + `<li class='alert'  data-value='${xaxis[j] + yaxis[i]}' onClick="selectSq(&#34;#${boards[a]} li[data-value='${xaxis[j]}${yaxis[i]}']&#34;)" data-status="empty">${xaxis[j] + yaxis[i]} </li>`;
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


        // console.log("rowsUsed.length: " + rowsUsed.length);

        // console.log("columnsUsed: " + columnsUsed);

        column = Math.floor(Math.random() * (10 - 0) + 0);

        row = Math.floor(Math.random() * (10 - 0) + 0);



        //  console.log("boatsObj[i].type: " + boatsObj[i].type);


        let ranOnce = false;
        if (!ranOnce) {
            ranOnce = true;
            switch (boatsObj[i].type) {
                case "Carrier":
                    let carrierSuccess = 0;

                    function runCarrier() {

                        let CarrierDirection = Math.floor(Math.random() * (2 - 0) + 0);
                        carrierSuccess = 0;
                        console.log("direction[CarrierDirection]: " + direction[CarrierDirection]);
                        if (direction[CarrierDirection] === "horizontal") {

                            for (let j = 1; j < 6; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column - 5] + rows[row] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.status = "occupied";
                                    console.log("horizontal Carrier")
                                    // carrierSuccess = carrierSuccess++;
                                } else {
                                    //  console.log("columns[column + j] + rows[row]: " + columns[column + j] + rows[row]);
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "'][data-status='empty']")) {

                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.status = "occupied";
                                        console.log("horizontal Carrier")
                                        // carrierSuccess = carrierSuccess++;
                                    }

                                }
                            }

                        } else {
                            for (let j = 1; j < 6; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 5] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.status = "occupied";
                                    console.log("vertical Carrier")
                                    // carrierSuccess = carrierSuccess++;
                                } else {
                                    // console.log("columns[column] + rows[row + j]: " + columns[column] + rows[row + j])
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "'][data-status='empty']")) {

                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.status = "occupied";
                                        console.log("vertical carrier")
                                        //carrierSuccess = carrierSuccess++;
                                    }

                                }
                            }

                        }



                    }


                    [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Carrier']"), (e) => {
                        carrierSuccess = carrierSuccess + 1;
                    });

                    console.log("carrierSuccess: " + carrierSuccess);
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
                        console.log("direction[BattleshipDirection]: " + direction[BattleshipDirection]);
                        if (direction[BattleshipDirection] === "horizontal") {
                            for (let j = 1; j < 5; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column - 4] + rows[row] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column - j] + rows[row] + "']").dataset.status = "occupied";
                                    console.log("horizontal Battleship")
                                    //  battleshipSuccess = battleshipSuccess++;
                                } else {
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "'][data-status='empty']")) {

                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column + j] + rows[row] + "']").dataset.status = "occupied";
                                        console.log("vertical Battleship")
                                        // battleshipSuccess = battleshipSuccess++;
                                    }

                                }
                            }


                        } else {

                            for (let j = 1; j < 5; j++) {
                                if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - 4] + "'][data-status='empty']")) {

                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.type = boatsObj[i].type;
                                    document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row - j] + "']").dataset.status = "occupied";
                                    console.log("vertical Battleship 1");
                                    //   battleshipSuccess = battleshipSuccess + 1;
                                } else {
                                    if (document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "'][data-status='empty']")) {

                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.type = boatsObj[i].type;
                                        document.querySelector("#computerBoard li[data-value='" + columns[column] + rows[row + j] + "']").dataset.status = "occupied";
                                        console.log("vertical Battleship 2");
                                        //  battleshipSuccess = battleshipSuccess + 1;
                                    }

                                }
                            }

                        }

                    }


                    [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Battleship']"), (e) => {
                        battleshipSuccess = battleshipSuccess + 1;
                    });


                    console.log("how many battleshipe squares: " + battleshipSuccess);
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
                        console.log("direction[CruiserDirection]: " + direction[CruiserDirection]);
                        if (direction[CruiserDirection] === "horizontal") {
                            for (let j = 1; j < 5; j++) {
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
                            for (let j = 1; j < 5; j++) {
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


                    console.log("how many Cruiser squares: " + cruiserSuccess);
                    if (cruiserSuccess !== 4) {
                        [].forEach.call(document.querySelectorAll("#computerBoard li[data-type='Cruiser']"), (e) => {
                            e.removeAttribute("data-type");
                            e.dataset.status = "empty";
                        });
                        runCruiser();
                    }

                    break;














                /* 
              
                                  
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
                             }*/
                /*
           
           
           
           
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
                       } */

            }
        }

        //   console.log("row: " + row + " - column: " + column);



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
/*
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
}*/


/*

No.	Class of ship	Size
1	Carrier	5
2	Battleship	4
3	Cruiser	3
4	Submarine	3
5	Destroyer	2

*/
