// Elements
var undo = document.getElementById("undo");
var redo = document.getElementById("redo");
var add_block = document.getElementById("add");
var remove_block = document.getElementById("remove");
var twr = document.getElementById("twr1");
var timer = document.getElementById("timer");

// Variables
var min_blocks = 3;
var max_blocks = 4;
var current_block = 0;
let moves = [];
var current_move = {
  b_id: undefined,
  from: undefined,
  to: undefined,
};
var current_move_i = 0;
var total_moves = 0;
var seconds;
var end_game = false;
var max_width = 130;
var start_width = 130 - 10 * 5;

// Set States
document.getElementById("block-count").innerHTML = `Blocks: ${current_block}`;
document.getElementById("moves-count").innerHTML = `Moves: ${total_moves}`;

window.onload = function () {
  LoadPage();
};
function LoadPage() {
  console.log("loaded");
  seconds = 200;
  createBlocks();
  countDownStart();
}
function createBlocks() {
  for (i = 0; i < min_blocks; i += 1) {
    current_block += 1;
    const block_t = document.createElement("div");
    block_t.draggable = "true";
    block_t.addEventListener("dragstart", drag);
    block_t.className = "block";
    block_t.id = "block" + current_block;
    block_t.innerHTML = current_block;
    block_t.style.width = `${start_width}px`;
    start_width += 10;
    twr.appendChild(block_t);
    document.getElementById(
      "block-count"
    ).innerHTML = `Blocks: ${current_block}`;
  }
}
function createEndScreen(win = true) {
  const state = win == true ? "You Won" : "Time's Up";
  const container = document.createElement("div");
  const text = document.createElement("h1");
  text.innerText = state;
  const restart = document.createElement("div");
  restart.className = "restart";
  restart.id = "restart";
  restart.addEventListener("click", () => {
    window.location.reload();
  });
  restart.innerText = "Restart";
  container.appendChild(text);
  container.appendChild(restart);
  container.classList.add("end-screen", "animate-end");
  document.getElementById("bg").prepend(container);
}
function countDownStart() {
  setInterval(() => {
    seconds -= 1;
    displayTime(seconds);
    if (seconds <= 0) {
      clearInterval(countDownStart);
      console.log("time up");
      createEndScreen(false);
      seconds = 200;
    }
  }, 1000);
}
function displayTime(sec) {
  const min = Math.floor(sec / 60);
  const _sec = Math.floor(sec % 60);
  timer.innerHTML = `${min < 10 ? "0" : ""}${min}:${
    _sec < 10 ? "0" : ""
  }${_sec}`;
}
function checkWin(parent) {
  const blocks = parent.querySelectorAll(".block");
  if (
    blocks.length == current_block &&
    moves.length >= 2 ** current_block - 1
  ) {
    createEndScreen();
  }
}
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  const b = document.getElementById(ev.target.id);
  const twr_elements = b.parentElement.querySelectorAll(".block");
  const dragged_block = twr_elements[0];
  if (dragged_block.id != ev.target.id) {
    return;
  }
  console.log("correct drag");
  ev.dataTransfer.setData("text", ev.target.id);
  console.log(ev.target.id);
  b.classList.add("dragging");
  console.log("This Block ID:", b.id);
  console.log("This Block Parent:", b.parentElement.id);
  moves.push({
    b_id: b.id,
    from: b.parentElement.id,
    to: undefined,
  });
}
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var b = document.getElementById(data);

  if (b != null) {
    //matlab neeche wala drag to ni ho rha
    if (ev.target.firstChild != null) {
      //matlab dropping div me pehle se kuch ha ke nhi
      if (String(b.id) > String(ev.target.firstChild.id)) {
        b.classList.remove("dragging");
        return;
      }
    }
    ev.target.prepend(b);
    b.classList.remove("dragging");
  }
  //=> Ye null b rakhwa deti ha

  moves[moves.length - 1].to = b.parentElement.id;
  total_moves += 1;
  current_move_i = total_moves - 1;
  document.getElementById("moves-count").innerHTML = `Moves: ${total_moves}`;
  checkWin(b.parentElement);
}

add_block.onclick = function () {
  if (moves == 0 && current_block <= max_blocks) {
    current_block += 1;
    const block_t = document.createElement("div");
    block_t.draggable = "true";
    block_t.addEventListener("dragstart", drag);
    block_t.className = "block";
    block_t.id = "block" + current_block;
    block_t.innerHTML = current_block;
    block_t.style.width = `${start_width}px`;
    start_width += 10;
    twr.appendChild(block_t);
    document.getElementById(
      "block-count"
    ).innerHTML = `Blocks: ${current_block}`;
  }
};
remove_block.onclick = function () {
  if (moves == 0 && current_block > 0) {
    const b = document.getElementById("block" + current_block);
    twr.removeChild(b);
    current_block -= 1;
    document.getElementById(
      "block-count"
    ).innerHTML = `Blocks: ${current_block}`;
  }
};

undo.onclick = function () {
  if (moves.length > 0) {
    console.log(`current move before undo: ${current_move_i}`);
    const curr = moves[current_move_i];
    const curr_b = document.getElementById(curr.b_id);
    document.getElementById(curr.from).prepend(curr_b);
    current_move_i =
      current_move_i > 0 ? (current_move_i -= 1) : current_move_i;
    console.log(`current move after undo: ${current_move_i}`);
  }
};
redo.onclick = function () {
  if (moves.length <= total_moves) {
    console.log(`current move before redo: ${current_move_i}`);
    const curr = moves[current_move_i];
    const curr_b = document.getElementById(curr.b_id);
    document.getElementById(curr.to).prepend(curr_b);
    current_move_i =
      current_move_i < total_moves - 1 ? (current_move_i += 1) : current_move_i;
    console.log(`current move after redo: ${current_move_i}`);
  }
};
