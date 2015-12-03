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

function pickUpStudents(){
  for(var studentIndex in students){
    var student = students[studentIndex];
    pickUpStudent(student);
  }
}
