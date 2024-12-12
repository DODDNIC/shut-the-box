const firstDice = document.querySelector("#first-dice");
const secondDice = document.querySelector("#second-dice");

const startBtn = document.querySelector("#play-btn");
startBtn.disabled = false;
const rollBtn = document.querySelector("#roll");
rollBtn.disabled = true;
const indBtn = document.querySelector("#individual");
indBtn.disabled = true;
const sumBtn = document.querySelector("#sum");
sumBtn.disabled = true;
const endBtn = document.querySelector("#end");
endBtn.disabled = true;

const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let p1NameInput = document.querySelector("#p1name");
let p2NameInput = document.querySelector("#p2name");

let p1TotalPoints = 0;
let p2TotalPoints = 0;
let p1Name = "";
let p2Name = "";
let playerTurn = 1;
let round = 1;
let dice1 = Math.floor(Math.random() * 6) + 1;
let dice2 = Math.floor(Math.random() * 6) + 1;
let sum = 0;
let p1Total = 0;
let p2Total = 0;

//To toggle visability
const start = document.querySelector("#start");
const game = document.querySelector("#game");
const dice = document.querySelector("#roll-element");


startBtn.addEventListener('click', function(){
    if(p1NameInput.value.trim() === ""){
            console.log("try typing an actual name");
        } else if (p2NameInput.value.trim() === ""){
                console.log("try typing an actual name");
            } else {
                rollBtn.disabled = false;
                startBtn.disabled = true;
                start.style.display = 'none';
                game.style.display = 'grid';
                dice.style.display = 'grid';
                p1Name = p1NameInput.value;
                p2Name = p2NameInput.value;
                const pn = document.querySelector("#player-name");
                pn.textContent = p1Name;
            }

            });

rollBtn.addEventListener('click', function(){
    rollDice();
    firstDice.className = `bi bi-dice-${dice1}`;
    secondDice.className = `bi bi-dice-${dice2}`;
    rollBtn.disabled = true;
    indBtn.disabled = false;
    sumBtn.disabled = false;
    endBtn.disabled = true;
    sum = dice1 + dice2;
        if(sum > 9){
            sumBtn.disabled = true;
        } else if (boxes[sum] === "x"){
        sumBtn.disabled = true;
        } else {
            sumBtn.disabled = false;
        }

        if(dice1 === dice2){
            indBtn.disabled = true;
        } else if (boxes[dice2] === "x"){
            indBtn.disabled = true;
        } else if (boxes[dice1] === "x") {
            indBtn.disabled = true;
        } else {
            indBtn.disabled = false;
        }

    if(indBtn.disabled === true){
        if (sumBtn.disabled === true){
            endBtn.disabled = false;
        }
    }
});

indBtn.addEventListener('click', function(){
    boxes[dice1] = 'x';
    boxes[dice2] = 'x';
    console.log(boxes);
    indBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
    shut(dice1);
    shut(dice2);
});

sumBtn.addEventListener('click', function(){
    boxes[sum] = "x";
    console.log(boxes);
    indBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
    shut(sum);
});

function shut(boxNumber){
    let box = document.querySelector(`#box${boxNumber}`);
    box.classList.add("shut");
    box.textContent = "X";
}

function rollDice(){
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
};

endBtn.addEventListener('click', function(){
    console.log(boxes);
    const s = document.querySelector("#score");
    s.style.display = 'grid';
    endBtn.disabled = true;
    rollBtn.disabled = false;
    const pn = document.querySelector("#player-name");
    const head = document.querySelector("#head");
    head.style.display = "";
    scoring();


    if(playerTurn === 2){
        const td2 = document.querySelector(`.round${round}`);
        td2.textContent = boxes[0];
        p2Total = p2Total + boxes[0];

        pn.textContent = p1Name;
        playerTurn = playerTurn - 1;
        round = round + 1;
        if(round > 5){
            gameOver();
        }
    } else {
        createRow(round, boxes[0]);
        p1Total = p1Total + boxes[0];
        pn.textContent = p2Name;
        playerTurn = playerTurn + 1;
    }
    resetBoard();
});

function scoring(){
    for(let i=1; i < 10; i++) {
        if(boxes[i] === 0){
            boxes[0] = boxes[0] + i;
        }
    }
}

function resetBoard(){
    boxes.fill(0);
    for (let i = 1; i < 10; i++) {
        const t = document.querySelector(`#box${i}`);
            t.textContent = `${i}`;
            t.classList.remove("shut");
    }

}

function createRow(rnd, points){

        const tr = document.createElement("tr");
        tr.setAttribute("id", `round${rnd}`);
        const body = document.querySelector("#body");
        body.insertAdjacentElement("beforeend", tr);

        const th = document.createElement("th");
        th.textContent = `round ${round}`;

        const td = document.createElement("td");
        td.setAttribute("class", "p1Pts");
        td.textContent = points;

        // const p1 = document.querySelector("#p1name");
        // p1.textContent = p1Name;
        // const p2 = document.querySelector("p2name");
        // p2.textContent = p2Name;

        tr.insertAdjacentElement("beforeend", th);
        tr.insertAdjacentElement("beforeend", td);

        const td2 = document.createElement("td");
        td2.setAttribute("class", "p2Pts");
        td2.setAttribute("class", `round${rnd}`);
        tr.insertAdjacentElement("beforeend", td2);

}

function gameOver(){
    const game = document.querySelector("#game");
    game.style.display = 'none';
    const dice = document.querySelector("#roll-element");
    dice.style.display = 'none';

    const win = document.querySelector("#win");
    win.style.display = 'grid';

    const winner = document.querySelector("#winner");
    if(p1Total < p2Total){
        winner.textContent = `winner: ${p1Name}!`;
    } else if (p2Total < p1Total) {
        winner.textContent = `winner: ${p2Name}!`;
    } else {
        winner.textContent = "It's a tie! Nobody wins!";
    }

    const res = document.createElement("button");
    res.setAttribute("id", "reset-Button");
    res.setAttribute("class", "reset");
    win.insertAdjacentElement("afterend", res);
    res.textContent = "Reset The Game";

const resetBtn = document.querySelector("#reset-Button");

resetBtn.addEventListener("click", function(){
    p1NameInput = document.querySelector("#p1name");
    p2NameInput = document.querySelector("#p2name");
    p1TotalPoints = 0;
    p2TotalPoints = 0;
    p1Name = "";
    p2Name = "";
    playerTurn = 1;
    round = 1;
    sum = 0;
    p1Total = 0;
    p2Total = 0;
    const win = document.querySelector("#win");
    win.style.display = 'none';
    const start = document.querySelector("#start");
    start.style.display = "grid";
    startBtn.disabled = false;
    rollBtn.disabled = true;
    indBtn.disabled = true;
    sumBtn.disabled = true;
    endBtn.disabled = true;
    res.style.display = "none";
    const head = document.querySelector("#head");
    head.style.display = "none";
    for (let i = 1; i < 6; i++) {
        const tr = document.querySelector(`#round${i}`);
        tr.remove();
    }
});
}


