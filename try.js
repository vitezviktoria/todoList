const menuBtn = document.getElementsByClassName("ham hamRotate ham4")[0];
const logIn = document.getElementById("logIn");
const landingPageRef = document.getElementById("landingPageRef");
let counterMenu = 0;
let counterLog = false;
let deleteCounter = false;
let deleteAdd = false;
let existing = localStorage.getItem('todo');



//menu mukodtetése
menuBtn.addEventListener("click", e => {
    counterMenu++;
    const xhr = new XMLHttpRequest();
    xhr.open('GET',`menu.html`, true);
    xhr.onload = function (){
        if(this.status == 200){
            if (counterMenu === 1) {

                

                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `menu.css`;
                document.head.appendChild(link);

                const text = xhr.responseText;
                document.getElementById("menu").innerHTML += (text);
                
                let choice = document.getElementById("menu").querySelectorAll('button');
                   for (i of choice) {
                        i.addEventListener('click', function() {
                            if (this.value != "add") {
                                deleteLastPage();

                            }
                            pageSelect(this.value);
                        });
                    }
                 
            }
            if (counterMenu === 2) {
                deleteMenu();
            }
        }
    };
    xhr.send(); 
});
//Login működtetése
logIn.addEventListener("click", e => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET',`logInPanel.html`, true);

    xhr.onload = function (){
        if(this.status == 200){
            if (!counterLog) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `logInPanel.css`;
                document.head.appendChild(link);
                const text = xhr.responseText;
                document.getElementById("logInPanel").innerHTML += (text);
                const JS = document.createElement('script');
                JS.type = 'text/javascript';
                JS.src = `logInPanel.js`;
                document.querySelector('footer').appendChild(JS);
                counterLog = true; 
                }
            else {
                counterLog = false;
                const select = document.getElementById("logInPanel");
                select.innerHTML = "";
                const links = document.head.getElementsByTagName('link');
                for (let j = 0; j < links.length; j++) {
                    if (links[j].href === `http://localhost/aCsapat/logInPanel.css` ){
                        links[j].remove();
                        break;
                     }
                } 
            }
        } 
    };
    
    xhr.send();
});

//meghívott oldal tartalmának betöltése
function pageSelect(choice){
    const view = document.getElementById(choice);
   
    
        deleteMenu();
        document.getElementById("hamburger").classList.remove('active');

        const dayC = document.createElement('link');
        dayC.id = 'currCSS';
        dayC.rel = 'stylesheet';
        dayC.href = `${choice}.css`;
        document.head.appendChild(dayC);

       
        const xhr = new XMLHttpRequest();
        xhr.open('GET',`${choice}.html`, true);
    
        xhr.onload = function (){
            if(this.status == 200){
                const text = xhr.responseText;
                document.getElementById("pageLoader").innerHTML += (text);
                const JS = document.createElement('script');
        JS.type = 'text/javascript';
         JS.id = 'currJS';
        JS.src = `${choice}.js`;
        document.querySelector('footer').appendChild(JS);

                }
            }   
    
        xhr.send(); 
    
}

//memoria felhasználás csökkentése
function deleteMenu(){
    const select = document.getElementById("menu");
    select.innerHTML = "";     
                
    const links = document.head.getElementsByTagName('link');
    for (let j = 0; j < links.length; j++) {
        if (links[j].href === 'http://localhost/aCsapat/menu.css' ){
            links[j].remove();
            break;
        }
    }  
    counterMenu = 0;
}

function deleteLastPage(){
    const select = document.getElementById("pageLoader");
    select.innerHTML = ""; 
   

    if (deleteCounter){
        const link = document.getElementById('currCSS');
        link.remove();
        const js = document.getElementById('currJS');
        js.remove();
    }
    deleteCounter = true;
}  

function modifyDelete(){

    document.getElementById('todo-container').style.display='';
 
    const dayC = document.createElement('link');
    dayC.id = 'editCSS';
    dayC.rel = 'stylesheet';
    dayC.href = `edit.css`;
    document.head.appendChild(dayC);

   
    const xhr = new XMLHttpRequest();
    xhr.open('GET',`edit.html`, true);

    xhr.onload = function (){
        if(this.status == 200){
            const text = xhr.responseText;
            document.getElementById("todo-container").innerHTML += (text);
            const JS = document.createElement('script');
    JS.type = 'text/javascript';
     JS.id = 'editJS';
    JS.src = `edit.js`;
    document.querySelector('footer').appendChild(JS);

            }
        }   

    xhr.send(); 

};


