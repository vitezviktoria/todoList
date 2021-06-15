function deleteMod () {
    const select = document.getElementById("todo-container");
    select.innerHTML = ''; 

    document.getElementById('todo-container').style.display='none';
    const link = document.getElementById('editCSS');
    link.remove();
    const js = document.getElementById('editJS');
    js.remove();
};



//document.querySelector("datetime-local").setAttribute("value", records[1].time);
//console.log(document.getElementsByClassName("textBox"));
//document.getElementsByClassName("textBox").document.setAttribute("value", "sad");
//document.querySelector("colorChoice").setAttribute("value", records[1].color);
placeOfText = document.querySelectorAll("textarea");
console.log(placeOfText);
placeOfText[0].setAttribute("placeholder", "kas");
placeOfText[0].setAttribute("value", "kas");