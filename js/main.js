const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");
let names = ["Mark", "Johnny", "Joe", "Bob", "Ethan", "George", "Luke", "Bryan", "Max", "Matt"];
let workers = new Map();

/*
================
Initalization
================
*/

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
window.addEventListener("load", (event) => {
  createWorkers(10);
  for (const [id, citizen] of workers.entries()) {
    console.log(`${citizen.name} has an id of: ${id}`);
  }
})
