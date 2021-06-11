var stored = localStorage.getItem("todo");
var todoTopics = [];
var choiceTopic;
var todoText = [];
var todoColor = [];
var placeofTodo;
var tdCount = 0;
var trCount = 0;

while (document.querySelector("tr").lastElementChild) {
  document
    .querySelector("tr")
    .removeChild(document.querySelector("tr").lastElementChild);
}

if (stored) {
  var records = JSON.parse(stored);
  var keyCount = Object.keys(records).length;
}

function Search(name) {
  var checkBox = document.getElementById(name);
  if (checkBox.checked == true) {
    for (var i = 1; i <= keyCount; i++) {
      todoTopics[i] = records[i].topics;
      for (var j = 0; j <= todoTopics[i].length; j++) {
        if (todoTopics[i][j] === name) {
          tdCount++;

          console.log(document.querySelectorAll("td").length);

          trCount = document.querySelectorAll("tr").length;
          console.log(tdCount);
          document
            .querySelectorAll("tr")
            [trCount - 1].appendChild(document.createElement("td"));

          placeofTodo = document.querySelectorAll("td")[tdCount - 1];
          if (document.querySelectorAll("td").length % 4 === 0) {
            document
              .querySelector("tbody")
              .appendChild(document.createElement("tr"));
          }

          todoText[i] = records[i].text;
          todoColor[i] = records[i].color;

          placeofTodo.innerHTML = todoText[i];
          placeofTodo.id = name + "id";
          placeofTodo.style.background = todoColor[i];
          placeofTodo.style.color = "white";
        }
      }
    }
  }
  if (checkBox.checked == false) {
    var nameDelete = name + "id"; 

    var lastRow = document.querySelectorAll("tr");
    for( var i=0; i < lastRow.length; i++) {
     var lastCells = document.querySelectorAll('tr')[i].querySelectorAll("td").length;
     if (lastCells === 0) {
       lastRow[i].remove();
     }
    }

    while (document.querySelector("tr").lastElementChild) {

      
     

      var el = document.getElementById(`${nameDelete}`);
      el.remove();
      if (el) {
        console.log("töröltve");
        tdCount--;
      }
    }
  }
}


//`${name}`
/*var lastrow = document.querySelector("tbody").lastElementChild;
      var tdLastRow = lastrow.querySelectorAll("td");
      if (tdLastRow.length == 0) {
        lastrow.remove();
      }*/
