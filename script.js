var blocks = [...document.querySelectorAll(".block")];
var towers = [...document.querySelectorAll(".tower")];

var undo = document.getElementById("undo");
var redo = document.getElementById("redo");
var add_block = document.getElementById("add");
var remove_block = document.getElementById("remove");
var twr = document.getElementById("twr1");

var min_blocks = 3;
var max_blocks = 6;
var current_block = min_blocks;
let moves = [];
var current_move = {
  b_id: undefined,
  from: undefined,
  to: undefined,
};
var current_move_i = 0;
var total_moves = 0;

add_block.onclick = function () {
  if (current_block <= max_blocks) {
    const block_t = document.createElement("div");
    block_t.className = "block";
    block_t.draggable = "true";
    block_t.id = "block" + current_block;
    block_t.innerHTML = current_block;
    twr.appendChild(block_t);
    current_block += 1;
    blocks.push(block_t);
    console.log(blocks);
  }
  return;
};
remove_block.onclick = function () {
  if (current_block > 0) {
    console.log("block" + (current_block - 1));
    const b = document.getElementById("block" + (current_block - 1));
    twr.removeChild(b);
    current_block -= 1;
  }
};

undo.onclick = function () {
  if (moves.length > 0) {
    console.log(`current move before undo: ${current_move_i}`);
    const curr = moves[current_move_i];
    const curr_b = document.getElementById(curr.b_id);
    document.getElementById(curr.from).appendChild(curr_b);
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
    document.getElementById(curr.to).appendChild(curr_b);
    current_move_i =
      current_move_i < total_moves - 1 ? (current_move_i += 1) : current_move_i;
    console.log(`current move after redo: ${current_move_i}`);
  }
};

blocks.forEach((draggable) => {
  console.log(blocks.length);
  draggable.addEventListener("dragstart", () => {
    console.log("dragged");
    moves.push({
      b_id: draggable.id,
      from: draggable.parentElement.id,
      to: undefined,
    });
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    moves[moves.length - 1].to = draggable.parentElement.id;
    total_moves += 1;
    current_move_i = total_moves - 1;
    console.log(current_move_i);
    console.log(moves);
  });
});

towers.forEach((tower) => {
  tower.addEventListener("dragover", (e) => {
    e.preventDefault();
    const selected_block = document.querySelector(".dragging");
    const _id = current_move.b_id;
    const b = document.getElementById(_id);
    // Yaha pr BONUS wali condition aye gi
    tower.appendChild(selected_block);
  });
});
