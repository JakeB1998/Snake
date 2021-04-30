function checkCollisionWall(x,y, xMax, yMax) {
  return x <= 0 || x >= xMax || y <= 0 || y >= yMax;
}

function checkCollisionOnSelf(dirX,dirY, snake, snakeParts) {
  var xHead = snake.x;
  var yHead = snake.y;
  var x = xHead + dirX;
  var y  = yHead + dirY;

  var flag = false;
  for (let i = 1; i < snakeParts.length; i++) {
    var part = snakeParts[i];
    if (part) {
      if (part.boundingBox.intersects(snake.boundingBox)) {
        flag = true;
        break;
      }
    }
  }
  return flag;
}