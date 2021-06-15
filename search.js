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
      var exist = document.getElementById(i);
      todoTopics[i] = records[i].topics;
      
      for (var j = 0; j <= todoTopics[i].length; j++) {
        
        
        if (todoTopics[i][j] === name) {
          if (exist === null) {
          tdCount++;

          trCount = document.querySelectorAll("tr").length;

          
          
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
            placeofTodo.id = i;
            placeofTodo.setAttribute("onclick", "modifyDelete()");
     
              placeofTodo.className += name + "id ";
            
  
            placeofTodo.style.background = todoColor[i];
            placeofTodo.style.color = "white";

        }
        else exist.className += name + "id ";

        
        }
        
      }
    }
  }
  if (checkBox.checked == false) {
    var nameDelete = name + "id";
    var deleter = document.getElementsByClassName(`${nameDelete}`);
    var lastRow = document.querySelectorAll("tr");
    var rowDeleter = lastRow.length;
    console.log(deleter);
    for (var i = 0; i < deleter.length; i++) {
     if (deleter[i].classList.length > 1) {
        
            deleter[i].classList.remove(nameDelete);
            i--;
          }
        
      
      else {
        deleter[i].remove();
        i--;
        tdCount--;
      } 
    }

    if (rowDeleter >= 1) {
      for (var i = 1; i < rowDeleter; i++) {
        var lastCells = document
          .querySelectorAll("tr")
          [i].querySelectorAll("td").length;

        if (lastCells === 0) {
          lastRow[i].remove();
          rowDeleter--;

          i--;
          if ((i = 0)) {
            return;
          }
        }
      }
    }
  }
}

//`${name}`