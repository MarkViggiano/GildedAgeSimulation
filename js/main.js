const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");
let names = ["Mark", "Johnny", "Joe", "Bob", "Ethan", "George", "Luke", "Bryan", "Max", "Matt"];
let workers = new Map();
let tickCount = 0;
let startTime;
let gameLoop;
//tps: tickCount / ((Date.now() - startTime) / 1000)
/*
================
Worker Management
================
*/

function getWorkerById(id) {
  return workers.get(id)
}

function getWorkerList() {
  let workerList = [];
  for (const [id, worker] of workers) {
    workerList.push(worker)
  }
  return workerList;
}

function createWorkers(count) {
  let citizen, name, id; //optimization
  for (let i = 0; i < count; i++) {
    name = names[MathUtil.randomNumber(0, names.length - 1)];
    id = uuid()
    citizen = new Citizen(name, id)
    workers.set(id, citizen);
  }
}

/*
================
Start
================
*/

function runGame() {
  console.log("Tick")

  tickCount++;
}

window.addEventListener("load", (event) => {
  createWorkers(10);

  startTime = Date.now();
  gameLoop = setInterval(runGame, 50);
})
