/**
 * Write your click function in here.
 *
 * The function should be named "moveRobot".
 * It will take two pieces of information:
 *  
 *   * The robot's position which has
 *     * x
 *     * y
 *     * angle
 *     * direction
 *
 *   * The mouse's position which has
 *     * x
 *     * y
 *
 * The "moveRobot" function will move the robot by
 * updating the robot's x and y to be the mouse's x and y respectively.
 *
 */






/**
 * Write your watch mouse function in here.
 *
 * The function should be named "watchMouse".
 * It will take two pieces of information:
 *  
 *   * The robot's position which has
 *     * x
 *     * y
 *     * angle
 *     * direction
 *
 *   * The mouse's position which has
 *     * x
 *     * y
 *
 * The "watchMouse" function will move the robot by
 * updating the robot's angle and direction to be watching the mouse
 *   * from the robot's position
 *   * to the mouse's position.
 *
 * We can use the calculateAngle and calculateDirection functions below to help us.
 */










/**
 * These functions below can help us with the "watchMouse" function.
 */

/**
 * calculateAngle calculates the angle from one position to another position.
 * 
 * @param  {object} from The from position, which has a x and a y.
 * @param  {object} to   The to position, which has a x and a y.
 * @return {number}      A number that is calculated to be an angle from 0 to 180.
 */
function calculateAngle(from, to) {
  var xDist = to.x - from.x;
  var yDist = from.y - to.y;

  if(xDist == 0){
    return getDirection(yDist) * 90;
  }

  return Math.atan(yDist/xDist) / Math.PI * 180;
}

/**
 * calculateDirection calculates the direction from one position to another position.
 * 
 * @param  {object} from The from position, which has a x and a y.
 * @param  {object} to   The to position, which has a x and a y.
 * @return {number}      A number that is -1, 0, or 1
 */
function calculateDirection(from, to) {
  var xDist = to.x - from.x;

  return getDirection(xDist);
}

/**
 * getDirection returns -1, 0, or 1 for any number.  It gets the sign of the number.
 * 
 * @param  {number} distance Any number
 * @return {number}          -1, 0, or 1
 */
function getDirection(distance) {
  return Math.sign(distance);
}