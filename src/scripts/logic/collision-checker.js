function checkCollisionWall(x,y, xMax, yMax) {
  return x <= 0 || x >= xMax || y <= 0 || y >= yMax;
}

function checkCollisionOnSelf(dirX,dirY, snake, snakeParts) {
  var xHead = snake.x;
  var yHead = snake.y;
  var lastVector = [snake.x - snake.prevX, snake.y - snake.prevY];
  //check if it collides on itself by gowing the other direction onto itself
  if (((lastVector[0] < 0 && dirX > 0) || (lastVector[0] > 0 && dirX < 0)) 
                                        ||  
    ((lastVector[1] < 0 && dirY > 0) || (lastVector[1] > 0 && dirY < 0))) {
      return true;
    }
  var flag = false;
  if (snake.collidable) {
    for (let i = 1; i < snakeParts.length; i++) {
      var part = snakeParts[i];
      if (part && part.collidable) {
        if (part.boundingBox.intersects(snake.boundingBox)) {
          var vectorPoints = [];
          flag = true;
          break;
        }
      }
    }
  }
  return flag;
}