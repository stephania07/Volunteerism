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
            var studentsClone = students.slice(0);
            while( studentsClone.length > 0 ){
                var studentNames = studentsClone.splice(0, 2);
                addItemToList($ul, studentNames.join(" &amp; "));
            }
        }
    });
});
