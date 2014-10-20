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

document.addEventListener("DOMContentLoaded", function(){
    var $form = document.getElementById("generate-group");
    var students = ["Bob", "Joe", "Susie", "Sam", "Julie"];

    $form.addEventListener("submit", function(event){
        event.preventDefault();
        var $ul = document.getElementById("results");
        $ul.innerHTML = "";

        var groupCriteria = $form.querySelector("select").value;

        if(groupCriteria === "random-student"){
            var studentNumber = getRandomInt(0, students.length);
            var studentName = students[studentNumber];
            addItemToList($ul, studentName);
        } else if(groupCriteria === "neighbor-pairing") {
            neighborGrouping(students, 2, $ul);
            
        } else if(groupCriteria === "team-three"){
           	neighborGrouping(students, 3, $ul);
        }else if(groupCriteria ==="randPair"){
        		var shuffledStudents = arrayShuffle(students);
        		neighborGrouping(shuffledStudents, 2, $ul);
        }
        
    });
});
