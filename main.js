// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("DOMContentLoaded", function(){
    var $form = document.getElementById("generate-group");
    var students = ["Bob", "Joe", "Susie", "Sam", "Julie"];

    $form.addEventListener("submit", function(event){
        event.preventDefault();
        var $ul = document.getElementById("results");
        $ul.innerHTML = "";
        var $li = document.createElement("li");

        var studentNumber = getRandomInt(0, students.length);
        var studentName = students[studentNumber];

        $li.innerHTML = studentName;
        $ul.appendChild($li);
    });
});
