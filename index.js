/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 *
 * Winner has to be decided and has to be flashed
 *
 * Extra points will be given for the Creativity
 *
 * Use of Google is not encouraged
 *
 */
let grid = [];
const GRID_LENGTH = 3;
let turn = "X";
let countState = {
  X: 0,
  O: 0
};

function getOverallCount() {
  return countState["X"] + countState["O"];
}
function reset() {
  // Reset the game
  countState = {
    X: 0,
    O: 0
  };
  grid = [];
  init();
  turn = "X";

  window.location.reload(true);
}
function initializeGrid() {
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    const tempArray = [];
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      tempArray.push(0);
    }
    grid.push(tempArray);
  }
}

function getRowBoxes(colIdx) {
  let rowDivs = "";

  for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
    let additionalClass = "darkBackground";
    let content = "";
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      additionalClass = "lightBackground";
    }
    const gridValue = grid[colIdx][rowIdx];
    if (gridValue === 1) {
      content = '<span class="cross">X</span>';
    } else if (gridValue === 2) {
      content = '<span class="cross">O</span>';
    }
    rowDivs =
      rowDivs +
      '<div colIdx="' +
      colIdx +
      '" rowIdx="' +
      rowIdx +
      '" class="box ' +
      additionalClass +
      '">' +
      content +
      "</div>";
  }
  return rowDivs;
}

function renderMainGrid() {
  const parent = document.getElementById("grid");
  const columnDivs = getColumns();
  parent.innerHTML = '<div class="columnsStyle">' + columnDivs + "</div>";
}

function checkFlag(flag) {
  // Check if the flag is 0 or 1 . If 1 , then winner else continue
  if (flag) {
    let player = getUser();
    alert(`${player} wins ! Winner Winner Chicken Dinner`);
    // reset game after displaying winner
    reset();
  } else if (getOverallCount() === 9) {
    alert("Game Draw! No one wins");
    window.location.reload(true);
  }
}

function getUser() {
  let player = turn === "X" ? "User" : "Computer";
  return player;
}
function toggleTurn() {
  turn = turn === "X" ? "O" : "X";
}
function getTurnValue() {
  return turn === "X" ? 1 : 2;
}
function checkDiag() {
  value = getTurnValue();
  let lflag = true;
  let rflag = true;
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      if (colIdx === rowidx && grid[colIdx][colIdx] !== value) {
        lflag = lflag * false;
      } else if (
        colIdx + rowidx === GRID_LENGTH - 1 &&
        grid[colIdx][rowidx] !== value
      ) {
        rflag = rflag * false;
      }
    }
  }
  // Check for Primary Diagonal
  checkFlag(lflag);
  // Check for Secondary Diagonal
  checkFlag(rflag);
}

function getColumns() {
  let columnDivs = "";
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    let coldiv = getRowBoxes(colIdx);
    coldiv = '<div class="rowStyle">' + coldiv + "</div>";
    columnDivs = columnDivs + coldiv;
  }
  return columnDivs;
}

function checkRow() {
  let flag;
  let value = getTurnValue();
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    flag = true;
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      if (grid[colIdx][rowidx] !== value) {
        flag = flag * false;
      }
    }
    checkFlag(flag);
  }
}

function checkCol() {
  let flag;
  let value = getTurnValue();
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    flag = true;
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      if (grid[rowidx][colIdx] !== value) {
        flag = flag * false;
      }
    }
    checkFlag(flag);
  }
}
function checkGameState() {
  let player = getUser();
  console.log(`Check State for ${player}`);
  checkDiag();
  checkRow();
  checkCol();
}
function onBoxClick() {
  var rowIdx = this.getAttribute("rowIdx");
  var colIdx = this.getAttribute("colIdx");
  // Can't undo the change
  if (grid[colIdx][rowIdx] === 0) {
    let value = getTurnValue();
    grid[colIdx][rowIdx] = value;
    countState[turn] = countState[turn] + 1;
    renderMainGrid();
    // Game starts post 2 chances
    if (countState[turn] >= 3) {
      checkGameState();
    }
    // Player done . Toggle player .

    addClickHandlers();
    toggleTurn();
  }
}

function addClickHandlers() {
  var boxes = document.getElementsByClassName("box");
  for (var idx = 0; idx < boxes.length; idx++) {
    boxes[idx].addEventListener("click", onBoxClick, false);
  }
}

function init() {
  initializeGrid();
  renderMainGrid();
  addClickHandlers();
}

init();
