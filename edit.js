//memória használat csökkentése
function deleteMod () {
    const select = document.getElementById("todo-container");
    select.innerHTML = ''; 

    document.getElementById('todo-container').style.display='none';
    const link = document.getElementById('editCSS');
    link.remove();
    const js = document.getElementById('editJS');
    js.remove();
};
//A kattintott note-en lévő adatok betöltése
placeOfTime = document.getElementsByClassName("datetime");
placeOfText = document.querySelectorAll("textarea");
placeOfColor = document.getElementsByClassName("colorChoice");
placeOfTime[0].setAttribute("value", records[chosenNote].time)
placeOfText[0].setAttribute("placeholder", records[chosenNote].text);
placeOfText[0].setAttribute("value", records[chosenNote].text);
placeOfColor[0].setAttribute("value", records[chosenNote].color);

//frissített adatok elmentése
function handleSubmit(event) {
   
    
    existing = existing ? JSON.parse(existing) : {};

    
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    value.topics = data.getAll("topics");
    
    
    existing[chosenNote] = value;
    localStorage.setItem('todo', JSON.stringify(existing));
    
  }
  
  //localStorage.clear(); 
    var form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);  
    