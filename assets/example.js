
var myNumbers = [10, 20, 80, 100, 212];

// var sum = myNumbers[0] + myNumbers[1] + myNumbers[2] + myNumbers[3] + myNumbers[4]
// var sum = 10 + 20 + 80 + 100 + 212

function calculateSum(listOfNumbers){
  var sum = 0;

  listOfNumbers.forEach(
    //do something for each item
    function (number){
      sum = sum + number;
    }
  )

  return sum;
}