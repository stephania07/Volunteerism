function getJSON(url, cb) {
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = function() {
    cb(JSON.parse(xhr.responseText));
  };
    xhr.send();

 }
// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function addItemToList($list, itemText){
    var $li = document.createElement("li");
    $li.innerHTML = itemText;
    $list.appendChild($li);
}

function neighborGrouping(list, groupSize, target){
  var listClone = list.slice(0);
      while( listClone.length > 0){
        var listItems = listClone.splice(0, groupSize);
        addItemToList(target, listItems.join(" &amp; "));
      }
}

function arrayShuffle(array){
  var arrayClone = array.slice(0);
  var temp;
  for(var i = 0; i < arrayClone.length; i++){
    var rand = getRandomInt(0, arrayClone.length);
    temp = arrayClone[i];
    arrayClone[i] = arrayClone[rand];
    arrayClone[rand] = temp;
  }
  return arrayClone;
}

function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function(){
    var $form = document.getElementById("generate-group");
      //var students= ["Seif", "Jackie", "Jessica", "Kimberly", "Brandon", "Blaise", "Evan",
      //         "Greg", "Charisse", "Luke", "Stephania", "David", "Steve", "Adam", "Spencer",
        //          "Leon", "Alex", "Gerald", "Sonda", "Beck", "Colby", "Kris"]; 
    var $select = $form.querySelector("select");
    var $numBox = $form.querySelector("input[type='number']");
    $select.addEventListener("change", function(event){
      if (event.currentTarget.value === "randN") {
        show($numBox);
      } else {
        hide($numBox);
      }

    });

    $form.addEventListener("submit", function(event){
        event.preventDefault();
     
     getJSON('https://stephania-volunteer.firebaseio.com/students.json', function(data){
     students = data;
    
       var students;
       var shuffledStudents;

        var $ul = document.getElementById("results");
        $ul.innerHTML = "";

        var groupCriteria = $form.querySelector("select").value;
       
       switch(groupCriteria) {
 			case "random-student": 
            var studentNumber = getRandomInt(0, students.length);
            var studentName = students[studentNumber];
            addItemToList($ul, studentName);
            break;
            case "neighbor-pairing":
            neighborGrouping(students, 2, $ul);
            break;
            case "team-three":
             neighborGrouping(students, 3, $ul);
             break;
            case "randPair":
            shuffledStudents = arrayShuffle(students);
            neighborGrouping(shuffledStudents, 2, $ul);
            break;
            case "randN":
            shuffledStudents = arrayShuffle(students);
            var value = $numBox.value;
            neighborGrouping(shuffledStudents, value, $ul);
            break; 
             //var numSelected = $form.querySelector("input").value;
             //var selectedStudent = students[numSelected];
             //addItemToList($ul, selectedStudent);

        }
    });
  });
});
