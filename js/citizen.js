/**
Requires gameobject.js to be referenced before this file
**/
class Citizen extends GameObject {
  constructor(name, id) {
    super(0, 0, 100, 100);
    this.name = name;
    this.id = id;
  }

  greet() {
    console.log(this.name);
  }

}
