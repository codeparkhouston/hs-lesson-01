var students = ['Ms.Hankins', 'Neeraj', 'Zach', 'Bryan', 'Amanda', 'Aditi'];
var busSeats = [];
var totalBusSeats = 12;

function pickUpStudent(student){
  var message, remainingBusSeats;
  busSeats.push(student);

  remainingBusSeats = totalBusSeats - busSeats.length;
  message = student + ' just got on the bus.\n\nThere are ' + busSeats.length + ' seats filled and ' + remainingBusSeats + ' left.';
  alert(message);
}

function forEach(array, doOnItem){
  var index = 0;

  while(index < array.length){
    var item = array[index];

    doOnItem(item);

    index ++;
  }
}

function pickUpStudentsForEach(){
  forEach(students, pickUpStudent);
}


function pickUpStudents(){
  var studentIndex = 0;

  while(studentIndex < students.length){
    var student = students[studentIndex];
    pickUpStudent(student);
    studentIndex ++;
  }
}
