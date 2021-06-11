class MathUtil {
  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static distanceOfValues(x1, x2) {
    return Math.abs(x1 - x2);
  }

  static distanceOnPlane(x1, y1, x2, y2) {
    let a = x1 - x2;
    let b = y1 - y2;
    return Math.sqrt((a * a) + (b * b)); //return c^2 in pythagorean theorm
  }

}

function uuid(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
