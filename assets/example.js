
var myNumbers = [10, 20, 80, 100, 120, 143];

function calculateSum(numbersList){
  // start sum at 0
  var sum = 0;

  // For each number in numbersList,
  numbersList.forEach(function(number){
    // add the number to the sum
    // and update the sum.
    sum += number;
  });

  // Return the sum out.
  return sum;
}
