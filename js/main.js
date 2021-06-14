const workerData = document.getElementById("workerData");
const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");
const background = new Image();
const buildings = new Image();
let names = ["Johnny", "Joe", "Bob", "Ethan", "George", "Luke", "Bryan", "Max", "Matt"];
//3d array of locations of homes and their 'patios'.
let workers = new Map();
let tickCount = 1;
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

function workerMove(id) {
  let worker = getWorkerById(id);
  if (worker == null) return; //should never happen
  worker.goSomewhereNew();
}

function workerBehave(id) {
  let worker = getWorkerById(id);
  if (worker == null) return; //should never happen
  worker.behavior += 10;
}

function workerMisbehave(id) {
  let worker = getWorkerById(id);
  if (worker == null) return; //should never happen
  worker.behavior -= 10;
}

function createWorkers(count) {
  let citizen, name, id, path; //optimization
  for (let i = 0; i < count; i++) {
    let home = homes[i];
    if (count == 1) {
      home = homes[MathUtil.randomNumber(0, homes.length - 1)];
      i = homes.indexOf(home);
    }
    let x = home[0][0];
    let y = home[0][1];
    name = names[MathUtil.randomNumber(0, names.length - 1)];
    id = uuid()
    citizen = new Citizen(x, y, name, id)
    workers.set(id, citizen);

    //little rushed hard coding never hurt!
    //home to factory
    if (i <= 1) path = [[home[1][0], home[1][1]], [node1.x, node1.y], [node2.x, node2.y], factory[0], factory[1]];
    if (i == 2) path = [[home[1][0], home[1][1]], factory[0], factory[1]];
    if (i >= 3) path = [[home[1][0], home[1][1]], [node4.x, node4.y], [node3.x, node3.y], factory[0], factory[1]];
    citizen.homeToFactory = path;

    //home to shops
    if (i <= 1) path = [[home[1][0], home[1][1]], [node1.x, node1.y], [node2.x, node2.y], [node3.x, node3.y], [node4.x, node4.y], shop[0], shop[1]];
    if (i == 2) path = [[home[1][0], home[1][1]], [node3.x, node3.y], [node4.x, node4.y], shop[0], shop[1]];
    if (i >= 3) path = [[home[1][0], home[1][1]], shop[0], shop[1]];
    citizen.homeToShops = path;

    //factory to homes
    if (i <= 1) path = [factory[1], factory[0], [node2.x, node2.y], [node1.x, node1.y], [home[1][0], home[1][1]], [x, y]];
    if (i == 2) path = [factory[1], factory[0], [home[1][0], home[1][1]], [x, y]];
    if (i >= 3) path = [factory[1], factory[0], [node3.x, node3.y], [node4.x, node4.y], [home[1][0], home[1][1]], [x, y]];
    citizen.factoryToHome = path;

    //shops to home
    //home to shops
    if (i <= 1) path = [shop[1], shop[0], [node4.x, node4.y], [node3.x, node3.y], [node2.x, node2.y], [node1.x, node1.y], [home[1][0], home[1][1]], [x, y]];
    if (i == 2) path = [shop[1], shop[0], [node4.x, node4.y], [node3.x, node3.y], [home[1][0], home[1][1]], [x, y]];
    if (i >= 3) path = [shop[1], shop[0], [home[1][0], home[1][1]], [x, y]];
    citizen.shopsToHome = path;

    citizen.goSomewhereNew();
  }
}

/*
================
Start
================
*/

function runGameActions() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, -10, -1, canvas.width, canvas.height);
  for (const worker of getWorkerList()) {
    let chance = MathUtil.randomNumber(0, 10);
    if (chance > 5) if (tickCount % 500 == 0 && worker.atDestination()) worker.goSomewhereNew();
    if (worker.onPath()) worker.move();
    if (worker.behavior <= 40 && tickCount % 500 == 0) worker.deduct(10);
    if (worker.netWorth == 0 || worker.behavior == 0) workers.delete(worker.id);
    worker.tick();
    worker.render(ctx);
  }

  ctx.drawImage(buildings, 0, 0, canvas.width, canvas.height);
  tickCount++;
}

window.addEventListener("load", (event) => {
  background.src = 'images/background.png';
  buildings.src = 'images/buildings.png';
  createWorkers(homes.length);

  startTime = Date.now();
  gameLoop = setInterval(runGameActions, 50);

  setInterval( () => {
    let workerHtml = "";
    for (const worker of getWorkerList()) {
      workerHtml += `
      <div class="col-sm-12 col-lg-4 mt-5 mb-5" id="${worker.id}">
        <div class="mx-auto w-75 border">
          <ul>
            <li><strong>Name:</strong> ${worker.name}</li>
            <li><strong>Status:</strong> ${worker.status}</li>
            <li><strong>Net Worth:</strong> ${worker.netWorth}</li>
            <li><strong>Behavior:</strong> ${worker.behavior}</li>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${worker.behavior}%" aria-valuenow="${worker.behavior}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </ul>
          <div class="row mx-auto">
            <div class="col-sm-8 p-2">
              <button class="btn btn-danger" onclick="workerMisbehave('${worker.id}')">Misbehave</button>
            </div>
            <div class="col-sm-8 p-2">
              <button class="btn btn-success" onclick="workerBehave('${worker.id}')">Behave</button>
            </div>

            <div class="col-sm-8 p-2">
              <button class="btn btn-info" onclick="workerMove('${worker.id}')">Move</button>
            </div>
          </div>
        </div>
      </div>
      `;
    }
    workerData.innerHTML = workerHtml;
  }, 500)
})
