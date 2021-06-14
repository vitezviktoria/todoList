var date = new Date();
var dayofweek = date.getDay(); //0 és 6 közötti értéket ad (0 ha vasárnap)
var days = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
var day = date.getDate();
var month = date.getMonth() + 1; //0 és 11 közötti érték, megkell növelni egyel
var prevButton = document.querySelector('#button1');
var nextButton = document.querySelector('#button2');
var month31 = [1, 3, 5, 7, 8, 10, 12];
var month30 = [4, 6, 9, 11];
var tdHour;

var buttons = document.querySelectorAll('.flipping a');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripples = document.createElement('span');
            ripples.style.left = x + "px";
            ripples.style.top = y + "px";
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove()
            },1000);
        })
    })

var stored = localStorage.getItem('todo');
var todoTime = [];
var todoMonth = [];
var todoDay = [];
var todoTimeRecord = [];
var todoHour = [];
var todoText = [];
var todoColor = [];
var j = 0;

if (stored)
    {
    var records = JSON.parse(stored);
    var keyCount = Object.keys(records).length;

        for(var i=1; i<=keyCount; i++)
        {
            todoTime[j] = records[i].time.split("-");
            todoText[j] = records[i].text; 
            todoColor[j] = records[i].color;
            j++;
        }
    }

notePlacement();

actualDay();
nextButton.onclick = evt =>
{
    evt.preventDefault();
    if((month30.includes(parseInt(month)))&&(day==30))
        {
            day=1;
            month++;
            dayofweek++;
            if(dayofweek==7)
                {
                    dayofweek=0;
                }
        }
    else if((month31.includes(parseInt(month)))&&(day==31))
        {
            day=1;
            month++;
            dayofweek++;
            if(dayofweek==7)
                {
                    dayofweek=0;
                }
        }
    else if((month==2) && (day==29) && (date.getFullYear) % 4 == 0)
        {
            day=1;
            month++;
            dayofweek++;
            if(dayofweek==7)
                {
                    dayofweek=0;
                }
        }
    else if((month==2) && (day==28) && (date.getFullYear) % 4 != 0)
        {
            day=1;
            month++;
            dayofweek++;
            if(dayofweek==7)
                {
                    dayofweek=0;
                }
        }
    else
        {
            day++;
            dayofweek++;
            if(dayofweek==7)
                {
                    dayofweek=0;
                }
        }

    var td = document.querySelectorAll('td div');
    for(var i=0;i<td.length;i++)
        {
            if(td[i].classList!=null)
            {
                td[i].classList.remove("note");
            }
        }    
    
    notePlacement();
    
    let elem1 = document.querySelector('.day h2')
    let elem2 = document.querySelector('.day h3')
    elem1.style.transition = "opacity 0.5s";
    elem1.style.opacity = 0;
    elem2.style.transition = "opacity 0.5s";
    elem2.style.opacity = 0;   
    setTimeout(() => {
                    actualDay();
                    elem1.style.transition = "opacity 0.5s";
                    elem1.style.opacity = 1;
                    elem2.style.transition = "opacity 0.5s";
                    elem2.style.opacity = 1;
            },500);

}

prevButton.onclick = evt =>
{
    evt.preventDefault();
    if((month30.includes(parseInt(month-1)))&&(day==1))
        {
            day=30;
            month--;
            dayofweek--;
            if(dayofweek==-1)
                {
                    dayofweek=6;
                }
        }
    else if((month31.includes(parseInt(month-1)))&&(day==1))
        {
            day=31;
            month--;
            dayofweek--;
            if(dayofweek==-1)
                {
                    dayofweek=6;
                }
        }
    else if((month-1)==2 && (day==1))
        {
            if((date.getFullYear) % 4 == 0)
                 {
                     day=29;
                     month--;
                     dayofweek--;
                     if(dayofweek==-1)
                        {
                        dayofweek=6;
                        }
                 }
             else
                 {
                     day=28;
                     month--;
                     dayofweek--;
                     if(dayofweek==-1)
                        {
                        dayofweek=6;
                        }
                 }
        }
    else
        {
            day--;
            dayofweek--;
            if(dayofweek==-1)
                {
                    dayofweek=6;
                }
        }
    
    var td = document.querySelectorAll('td div');
    for(var i=0;i<td.length;i++)
        {
            if(td[i].classList!=null)
            {
                td[i].classList.remove("note");
            }
        }

    notePlacement();
    
    let elem1 = document.querySelector('.day h2')
    let elem2 = document.querySelector('.day h3')
    elem1.style.transition = "opacity 0.5s";
    elem1.style.opacity = 0;
    elem2.style.transition = "opacity 0.5s";
    elem2.style.opacity = 0;   
    setTimeout(() => {
                    actualDay();
                    elem1.style.transition = "opacity 0.5s";
                    elem1.style.opacity = 1;
                    elem2.style.transition = "opacity 0.5s";
                    elem2.style.opacity = 1;
            },500);
}    


function actualDay()
{
    document.querySelector('div h2').innerHTML = days[dayofweek] ;
    document.querySelector('div h3').innerHTML = `${date.getFullYear()}.${checkFormat(month)}.${checkFormat(day)}`;
}

function checkFormat(x) //pl. 04.1 --> 04.01
{
            if(x<10) 
            {
                x = '0' + x;
            }
    return x;
}

function notePlacement()
{
var td = document.querySelectorAll('td div');
for(var i=0;i<td.length;i++)
        {
            td[i].style.background = "white";
            td[i].textContent = "";
        }

for(var i=0;i<todoTime.length;i++)
    {
        todoTimeRecord = todoTime[i];
        todoMonth[i] = todoTimeRecord[1];
        todoDay[i] = todoTimeRecord[2].split("T")[0];
        todoHour[i] = todoTimeRecord[2].split("T")[1];
        
        if((todoDay[i]==checkFormat(day))&&todoMonth[i]==checkFormat(month))
            {
                if((todoHour[i].split(":")[0])<=4)
                   {
                       if((todoHour[i].split(":")[0])%4==0)       tdHour = document.querySelector('#firstrow .dawn div'); 
                       else if((todoHour[i].split(":")[0])%4==1)  tdHour = document.querySelector('#secondrow .dawn div'); 
                       else if((todoHour[i].split(":")[0])%4==2)  tdHour = document.querySelector('#thirdrow .dawn div'); 
                       else                                       tdHour = document.querySelector('#lastrow .dawn div'); 
                   }
                else if((todoHour[i].split(":")[0])>=4&&(todoHour[i].split(":")[0])<8)
                    {
                       if((todoHour[i].split(":")[0])%4==0)       tdHour = document.querySelector('#firstrow .morning div'); 
                       else if((todoHour[i].split(":")[0])%4==1)  tdHour = document.querySelector('#secondrow .morning div'); 
                       else if((todoHour[i].split(":")[0])%4==2)  tdHour = document.querySelector('#thirdrow .morning div'); 
                       else                                       tdHour = document.querySelector('#lastrow .morning div'); 
                    }
                else if((todoHour[i].split(":")[0])>=8&&(todoHour[i].split(":")[0])<12)
                    {
                       if((todoHour[i].split(":")[0])%4==0)       tdHour = document.querySelector('#firstrow .forenoon div'); 
                       else if((todoHour[i].split(":")[0])%4==1)  tdHour = document.querySelector('#secondrow .forenoon div'); 
                       else if((todoHour[i].split(":")[0])%4==2)  tdHour = document.querySelector('#thirdrow .forenoon div'); 
                       else                                       tdHour = document.querySelector('#lastrow .forenoon div'); 
                    }
                else if((todoHour[i].split(":")[0])>=12&&(todoHour[i].split(":")[0])<16)
                    {
                       if((todoHour[i].split(":")[0])%4==0)       tdHour = document.querySelector('#firstrow .afternoon div'); 
                       else if((todoHour[i].split(":")[0])%4==1)  tdHour = document.querySelector('#secondrow .afternoon div'); 
                       else if((todoHour[i].split(":")[0])%4==2)  tdHour = document.querySelector('#thirdrow .afternoon div'); 
                       else                                       tdHour = document.querySelector('#lastrow .afternoon div'); 
                    }
                else if((todoHour[i].split(":")[0])>=16&&(todoHour[i].split(":")[0])<20)
                    {
                       if((todoHour[i].split(":")[0])%4==0)       tdHour = document.querySelector('#firstrow .night div'); 
                       else if((todoHour[i].split(":")[0])%4==1)  tdHour = document.querySelector('#secondrow .night div'); 
                       else if((todoHour[i].split(":")[0])%4==2)  tdHour = document.querySelector('#thirdrow .night div'); 
                       else                                       tdHour = document.querySelector('#lastrow .night div'); 
                    }
                else
                    {
                       if((todoHour[i].split(":")[0])%4==0)       tdHour = document.querySelector('#firstrow .latenight div'); 
                       else if((todoHour[i].split(":")[0])%4==1)  tdHour = document.querySelector('#secondrow .latenight div'); 
                       else if((todoHour[i].split(":")[0])%4==2)  tdHour = document.querySelector('#thirdrow .latenight div'); 
                       else                                       tdHour = document.querySelector('#lastrow .latenight div'); 
                    }
                
                if(todoColor[i]=="#000000")
                    {
                        tdHour.style.color = "white";
                    }
                tdHour.textContent = todoText[i];
                tdHour.style.background = todoColor[i];
                tdHour.style.textAlign = "center";
                tdHour.style.height = document.querySelector('table').offsetHeight / 6;
                tdHour.classList.add("note");
            }
               
}
}