// Fill in this array with whatever words you want!
var myWords = [];

myWords.forEach(function(word){
  var wordPoints = calculateScrabblePoints(word);
  console.log(word, wordPoints);
});


/**
 * calculateScrabblePoints should take a word and return the scrabble points of the word.
 */
function calculateScrabblePoints(word){

}


var scrabbleLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var scrabblePoints = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];

/**
 * getScrabblePointsOfLetter should return the points for the letter
 */
function getScrabblePointsOfLetter(letter){

  // Make letter uppercased to match the values in the scrabbleLetters array.

  // Get the index of the letter

  // Look up the points in the matching points array

}
