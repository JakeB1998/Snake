function checkCollisionWall(x,y, xMax, yMax) {
  return x <= 0 || x >= xMax || y <= 0 || y >= yMax;
}

function checkCollisionOnSelf(dirX,dirY, snake, context) {
  var xHead = snake.x;
  var yHead = snake.y;
  var x = xHead + dirX;
  var y  = yHead + dirY;
  //x *= snake.snakeSpeed;
  //y *= snake.snakeSpeed;

  // compensating for cordinate at leftmost corner of rectangle with direction
  switch (dirX) {
    case 1 * snake.snakeSpeed:
      x += snake.xSize;
      break;
    case -1 * snake.snakeSpeed:
      break;
    default:
      break;
  }
 // compensating for cordinate at leftmost corner of rectangle with direction
  switch (dirY)  {
    case 1 * snake.snakeSpeed:
      y += snake.ySize;
      break;
    case -1 * snake.snakeSpeed:
    
      break;
    default:
      break;
  }
  var dataI = context.getImageData(x,y,1,1).data;
  var headData = context.getImageData(xHead,yHead,1,1).data;

 //console.log(x + "," + y + "," + xHead + "," + yHead);
 // console.log(dataI[0] + "," + dataI[1] + "," + dataI[2] 
             //   + "\n" +  headData[0]  +"," + headData[1] + "," + headData[2]);
  if (dataI[0] === headData[0] && dataI[1] === headData[1] && dataI[2] === headData[2]) {
    if (dataI[0] === 0 && dataI[1] === 0 && dataI[2] === 0) {
     //add code here
    }
    else {
      console.log(dataI[0] + "," + dataI[1] + "," + dataI[2] 
      + "\n" +  headData[0]  +"," + headData[1] + "," + headData[2]);
        return true;
    }
  }
 
  return false;
}