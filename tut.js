// Variables
var min_tiles = 3;
var max_tiles = 7;
var current_tiles = min_tiles;

// Variables

var add = document.getElementById("add");
var remove = document.getElementById("remove");
var tower1 = document.getElementById("tw1");

add.onclick = function () {
  current_tiles += 1;
  const _tile = document.createElement("div");
  _tile.addEventListener("ondragstart", drag);
  _tile.draggable = "true";
  _tile.className = "tile";
  _tile.id = "t" + current_tiles;
  _tile.innerHTML = current_tiles;
  console.log(tower1);
  tower1.appendChild(_tile);
  const b = document.getElementById("block-num");
  b.innerHTML = `Blocks: ${current_tiles}`;
};
remove.onclick = function () {
  const _tile = document.getElementById("t" + current_tiles);
  tower1.removeChild(_tile);
  current_tiles -= 1;
};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  const tile = document.getElementById(ev.target.id);
  ev.dataTransfer.setData("text", ev.target.id);
  ev.target.classList.add("dragging");
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  console.log(data);
  var _tile = document.getElementById(data);
  _tile.classList.remove("dragging");
  console.log(_tile);
  ev.target.appendChild(_tile);
  console.log(ev.target);
}
