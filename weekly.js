var date = new Date();
var dayofweek = date.getDay();    //0 és 6 közötti értéket ad (0 ha vasárnap)
var days = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
var month = date.getMonth() + 1;
var day = date.getDate() ;
var prevButton = document.querySelector('#button1');
var nextButton = document.querySelector('#button2');
var month31 = [1, 3, 5, 7, 8, 10, 12];
var month30 = [4, 6, 9, 11];

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
var dates = [];
var datesDays = [];
var datesMonths = [];
var j=0;
var noteCounter= [0, 0, 0, 0, 0, 0, 0];
var td;

Dates();
notePlacement();

function notePlacement()
{
    td = document.querySelectorAll('td');
    
    for(var i=0; i<7; i++)
    {
        dates[i] = document.querySelectorAll('.dates')[i].innerHTML;
        datesMonths[i] = dates[i].split(".")[0];
        datesDays[i] = dates[i].split(".")[1];
    }
    
    for(var i=0;i<td.length;i++)
            {
                td[i].style.background = "white";
                td[i].innerHTML = "";
            }
    
    if (stored)
        {
        var records = JSON.parse(stored);
        var keyCount = Object.keys(records).length;
        console.log(records);
    
        for(var i=1; i<=keyCount; i++)
            {
                todoTime[j] = records[i].time.split("-");
                todoText[j] = records[i].text; 
                todoColor[j] = records[i].color;
                j++;
            }
    
        for(var i=0;i<todoTime.length;i++)
            {
                todoTimeRecord = todoTime[i];
                todoMonth[i] = todoTimeRecord[1];
                todoDay[i] = todoTimeRecord[2].split("T")[0];
                todoHour[i] = todoTimeRecord[2].split("T")[1];
    
                if((parseInt(todoHour[i].split(":")[0]))<6)
                {
                    td = document.querySelectorAll("#dawn td");
                }
                else if((parseInt(todoHour[i].split(":")[0]))>=6 && (parseInt(todoHour[i].split(":")[0]))<12)
                {
                    td = document.querySelectorAll("#forenoon td");
                }
                else if((parseInt(todoHour[i].split(":")[0]))>=12 && (parseInt(todoHour[i].split(":")[0]))<18)
                {
                    td = document.querySelectorAll("#afternoon td");
                }
                else
                {
                    td = document.querySelectorAll("#night td");
                }
    
                for(var k=0; k<dates.length; k++)
                {
                    td[k].style.color = "white";
                    if((datesMonths[k]==todoMonth[i])&&(datesDays[k]==todoDay[i]))
                    {
                        if(td[k].querySelectorAll("div").length>=1)
                        {
                            noteCounter[k]++;
                            td[k].appendChild(document.createElement("div"));
    
                            td[k].querySelectorAll("div")[noteCounter[k]].textContent = todoText[i];
                            td[k].querySelectorAll("div")[noteCounter[k]].style.background = todoColor[i];
                            td[k].querySelectorAll("div")[noteCounter[k]].setAttribute('id', todoHour[i]);
    
                            for(var c=0; c<td[k].querySelectorAll("div").length; c++)
                            {
                                for(var v=0; v<td[k].querySelectorAll("div").length-1; v++)
                                {
                                    if((td[k].querySelectorAll("div")[v].getAttribute('id'))>(td[k].querySelectorAll("div")[v+1].getAttribute('id')))
                                    {
                                        var text = td[k].querySelectorAll("div")[v].textContent;
                                        var id = td[k].querySelectorAll("div")[v].getAttribute('id');
                                        var color = td[k].querySelectorAll("div")[v].style.background;
    
                                        td[k].querySelectorAll("div")[v].setAttribute('id', td[k].querySelectorAll("div")[v+1].getAttribute('id'));
                                        td[k].querySelectorAll("div")[v+1].setAttribute('id', id);
    
                                        td[k].querySelectorAll("div")[v].textContent = td[k].querySelectorAll("div")[v+1].textContent;
                                        td[k].querySelectorAll("div")[v+1].textContent = text;
    
                                        td[k].querySelectorAll("div")[v].style.background = td[k].querySelectorAll("div")[v+1].style.background;
                                        td[k].querySelectorAll("div")[v+1].style.background = color;
                                    }
                                }
    
                                td[k].querySelectorAll("div")[c].style.height = document.querySelector("tbody").offsetHeight*0.20/(noteCounter[k]+1);
                                td[k].querySelectorAll("div")[c].style.maxHeight = "55px";
                                td[k].querySelectorAll("div")[c].style.minHeight = null;
                            }
                            k=dates.length;
                        }
    
                       else
                        {
                            td[k].appendChild(document.createElement("div"));
                            var div = td[k].querySelector('div');
                            div.setAttribute('id', todoHour[i]);
                            td[k].querySelector('div').innerHTML = todoText[i];
                            td[k].querySelector('div').style.background = todoColor[i];
                            td[k].style.height = document.querySelector("tbody").offsetHeight*0.20;
                            td[k].querySelector("div").style.maxHeight = "120px";
                            td[k].querySelector("div").style.minHeight = "110px";
                            td[k].querySelector('div').style.height = "90%";
                            k=dates.length;
                        }
                    }
                }
            }
        }
dates = [];
datesDays = [];
datesMonths = [];
todoTime = [];
todoText = [];
todoColor = [];
todoMonth = [];
todoDay = [];
todoTimeRecord = [];
todoHour = [];
noteCounter= [0, 0, 0, 0, 0, 0, 0];
j=0;
}


prevButton.onclick = evt =>
{
    evt.preventDefault();
    if(day<8)
        {
            month--;
            if(month30.includes(parseInt(month)))
                {
                    day = day - 7 + 30;
                }
            else if(month31.includes(parseInt(month)))
                {
                    day = day - 7 + 31;
                }
            else
                {
                 if((date.getFullYear) % 4 == 0)
                     {
                         day = day - 7 + 29;
                     }
                 else
                     {
                         day = day - 7 + 28;
                     }
                }
        }
    else
        {
            day = day - 7;      
        }
    
    let elems =  document.querySelectorAll('.dates')
                   for(let j=0; j<elems.length; j++)
                       {
                           elems[j].style.transition = "opacity 0.4s linear";
                           elems[j].style.opacity = 0;   
                       }
    let elems2 = document.querySelectorAll('table div');
                    for(let j=0; j<elems2.length; j++)
                    {
                        elems2[j].style.transition = "opacity 0.5s";
                        elems2[j].style.opacity = 0;   
                    }
   
    setTimeout(() => {
                        Dates();
                        notePlacement();
                        for(let j=0; j<elems.length; j++)
                       {
                           elems[j].style.transition = "opacity 0.5s linear 0s";
                           elems[j].style.opacity = 1;   
                       }
                       for(let j=0; j<elems2.length; j++)
                       {
                           elems2[j].style.transition = "opacity 0.5s";
                           elems2[j].style.opacity = 1;   
                       }
                },400);

}

nextButton.onclick = evt =>
{
    evt.preventDefault();
    if((month30.includes(parseInt(month))) && (day > 23))
        {
            month++;
            day = day + 7 - 30;
        }
    else if((month31.includes(parseInt(month))) && (day > 24))
        {
            month++;
            day = day + 7 - 31;
        }
    else if((month==2) && ((date.getFullYear) % 4 == 0) && (day > 22))
        {
                    month++;
                    day = day + 7 - 29;
        }
    else if((month==2) && ((date.getFullYear) % 4 != 0) && (day > 21))
        {
                    month++;
                    day = day + 7 - 28;
        }
    else
        {
            day = day + 7;
        }
    
    let elems =  document.querySelectorAll('.dates')
                   for(let j=0; j<elems.length; j++)
                       {
                           elems[j].style.transition = "opacity 0.5s";
                           elems[j].style.opacity = 0;   
                       }
    let elems2 = document.querySelectorAll('table div');
                    for(let j=0; j<elems2.length; j++)
                    {
                        elems2[j].style.transition = "opacity 0.5s";
                        elems2[j].style.opacity = 0;   
                    }
   
    setTimeout(() => {
                        Dates();
                        notePlacement();
                        for(let j=0; j<elems.length; j++)
                       {
                           elems[j].style.transition = "opacity 0.5s linear 0s";
                           elems[j].style.opacity = 1;   
                       }
                       for(let j=0; j<elems2.length; j++)
                       {
                           elems2[j].style.transition = "opacity 0.5s";
                           elems2[j].style.opacity = 1;   
                       }
                },400);
}



function Dates()
{
    
  switch (dayofweek)
    {
case 0:  //Vasárnap
            Sunday();
            day--;
            for(var i=6; i>0; i--)
                {
                    if(day < 1) prevMonth(i, parseInt(month)-1, parseInt(day+30), parseInt(day+31));
                    else        Write(i,checkMonthFormat(month),checkFormat(day));
                    day--;
                }
            day = day + 7 ;
            break;
        
case 1:  //Hétfő
                for(var i=0; i<6; i++)
                {
                    
                    if(((month30.includes(parseInt(month))) && (day > 30))  ||  ((month31.includes(parseInt(month))) && (day > 31))    ||   ((month==2)&&(day>29)&&((date.getFullYear) % 4 == 0))   ||  ((month==2)&&(day>28)&&((date.getFullYear) % 4 != 0)))
                        {
                            nextMonth((i+1), parseInt(month), (day-30), (day-31));  
                        }
                    else Write((i+1), checkMonthFormat(month), checkFormat(day));
                    day++;
                }
            
                Sunday();
                day = day-6;
                break;

        
case 2: //Kedd
            monday = day-1;
            if(monday==0) prevMonth (1, parseInt(month)-1, 30, 31);
            else          Write(1, checkMonthFormat(month), checkFormat(monday));
            
            for(var i=1; i<6; i++)
                {
                    if(((month30.includes(parseInt(month))) && (day > 30))  ||  ((month31.includes(parseInt(month))) && (day > 31))    ||   ((month==2)&&(day>29)&&((date.getFullYear) % 4 == 0))   ||  ((month==2)&&(day>28)&&((date.getFullYear) % 4 != 0)))
                        {
                            nextMonth((i+1), parseInt(month), (day-30), (day-31));
                        }
                    else Write((i+1), checkMonthFormat(month), checkFormat(day));
                    day++;
                }
            
            Sunday();
            day = day-5;
            break;
            
case 3: //Szerda
            for(var i=2; i>=1; i--)
                {
                    day--;
                    if(day < 1) prevMonth (i, parseInt(month)-1, parseInt(day+30), parseInt(day+31));
                    else        Write(i,checkMonthFormat(month),checkFormat(day));
                }
            
            day = parseInt(parseInt(day) + 2);
            
            for(var i=2; i<6; i++)
                {
                    if(((month30.includes(parseInt(month))) && (day > 30))  ||  ((month31.includes(parseInt(month))) && (day > 31))    ||   ((month==2)&&(day>29)&&((date.getFullYear) % 4 == 0))   ||  ((month==2)&&(day>28)&&((date.getFullYear) % 4 != 0)))
                        {
                            nextMonth((i+1), parseInt(month), (day-30), (day-31));
                        }
                    else Write((i+1), checkMonthFormat(month), checkFormat(day));
                    day++;
                }
            
            Sunday();
            day = day - 4;
            break;

case 4: //Csütörtök
            for(var i=3; i>=1; i--)
                {
                    day--;
                    if(day < 1) prevMonth (i, parseInt(month)-1, parseInt(day+30), parseInt(day+31));
                    else        Write(i,checkMonthFormat(month),checkFormat(day));
                }
            
            day = parseInt(parseInt(day) + 3);
            
            for(var i=3; i<6; i++)
                {
                    if(((month30.includes(parseInt(month))) && (day > 30))  ||  ((month31.includes(parseInt(month))) && (day > 31))    ||   ((month==2)&&(day>29)&&((date.getFullYear) % 4 == 0))   ||  ((month==2)&&(day>28)&&((date.getFullYear) % 4 != 0)))
                        {
                            nextMonth((i+1), parseInt(month), (day-30), (day-31));      
                        }
                   
                    else Write((i+1), checkMonthFormat(month), checkFormat(day));
                    day++;
                }
            
            Sunday();
            day = day - 3;
            break;

case 5: //Péntek
            for(var i=4; i>=1; i--)
                {
                    day--;
                    if(day < 1) prevMonth (i, parseInt(month)-1, parseInt(day+30), parseInt(day+31));
                    else        Write(i,checkMonthFormat(month),checkFormat(day));
                }
            
            day = parseInt(parseInt(day) + 4);
            
            for(var i=4; i<6; i++)
                {
                    if(((month30.includes(parseInt(month))) && (day > 30))  ||  ((month31.includes(parseInt(month))) && (day > 31))    ||   ((month==2)&&(day>29)&&((date.getFullYear) % 4 == 0))   ||  ((month==2)&&(day>28)&&((date.getFullYear) % 4 != 0)))
                        {
                            nextMonth((i+1), parseInt(month), (day-30), (day-31));  
                        }
                    else Write((i+1), checkMonthFormat(month), checkFormat(day));
                    day++;
                }
            
            Sunday();
            day = day - 2;
            break;
            
case 6: //Szombat
            for(var i=5; i>=1; i--)
                {
                    day--;
                    if(day < 1) prevMonth (i, parseInt(month)-1, parseInt(day+30), parseInt(day+31));
                    else        Write(i,checkMonthFormat(month),checkFormat(day));
                }
            
            day = parseInt(parseInt(day) + 5);
            
            for(var i=5; i<6; i++)
                {
                    if(((month30.includes(parseInt(month))) && (day > 30))  ||  ((month31.includes(parseInt(month))) && (day > 31))    ||   ((month==2)&&(day>29)&&((date.getFullYear) % 4 == 0))   ||  ((month==2)&&(day>28)&&((date.getFullYear) % 4 != 0)))
                        {
                            nextMonth((i+1), parseInt(month), (day-30), (day-31)); 
                        }
                    else Write((i+1), checkMonthFormat(month), checkFormat(day));
                    day++;
                }
            
            Sunday();
            day=day-1;
            break;
    }  
}

function checkFormat(d) //pl. 04.1 --> 04.01
{
            if(d<10) 
            {
                d = '0' + d;
            }
    return d;
}

function checkMonthFormat(m)
{
    if((parseInt(m)<10) && m[0]!='0')
            {
                m = '0' + m;
            }
    return m;
}

function Write(index, m, d)
{  
                    document.querySelector('.day' + index).innerHTML = days[index];
                    document.querySelector('.date' + index).innerHTML = m + '.' + d + '.';
}
    
function prevMonth(j, newMonth, prevDay1, prevDay2) //pl. 04.0 --> 03.31
{   
                            if(month30.includes(parseInt(newMonth)))
                                {
                                    Write(j, checkMonthFormat(newMonth), prevDay1);
                                }
                            else if(month31.includes(parseInt(newMonth)))
                                {
                                    Write(j, checkMonthFormat(newMonth), prevDay2);
                                }
                            else
                                {
                                    if((date.getFullYear) % 4 == 0)
                                    {
                                    Write(j, checkMonthFormat(newMonth), prevDay1-1);
                                    }
                                    else
                                    {
                                     Write(j, checkMonthFormat(newMonth), prevDay1-2);
                                    }
                                }
}
    

function nextMonth(index, newMonth, nextDay1, nextDay2) //pl. 04.35 --> 05.05
{
                     if(month30.includes(parseInt(newMonth)))
                                {
                                    Write(index, checkMonthFormat(newMonth+1), checkFormat(nextDay1));                                        
                                }
                    else if(month31.includes(parseInt(newMonth)))
                                {
                                     Write(index, checkMonthFormat(newMonth+1), checkFormat(nextDay2));
                                }
                    else
                                {
                                    if((date.getFullYear) % 4 == 0)
                                    {
                                    Write(index, checkMonthFormat(newMonth+1), checkFormat(nextDay1+1));
                                    }
                                    else
                                    {
                                    Write(index, checkMonthFormat(newMonth+1), checkFormat(nextDay1+2));
                                    }
                                }
}

function sundayWrite(m, d)
{
    document.querySelector('.day7').innerHTML = days[0];
    document.querySelector('.date7').innerHTML = m + '.' + d + '.';
}
    
function Sunday()
{
            if(((month30.includes(parseInt(month))) && (day > 30))  ||  ((month31.includes(parseInt(month))) && (day > 31))    ||   ((month==2)&&(day>29)&&((date.getFullYear) % 4 == 0))   ||  ((month==2)&&(day>28)&&((date.getFullYear) % 4 != 0)))
                        {
                            if(month30.includes(parseInt(month)))
                                {
                                    sundayWrite(checkMonthFormat(month+1), checkFormat(day-30));    
                                }
                            else if(month31.includes(parseInt(month)))
                                {
                                    sundayWrite(checkMonthFormat(month+1), checkFormat(day-31)); 
                                }
                            else if((month==2)&&(day>28)&&((date.getFullYear) % 4 != 0))
                                {
                                    sundayWrite(checkMonthFormat(month+1), checkFormat(day-28)); 
                                }
                            else
                                {
                                    sundayWrite(checkMonthFormat(month+1), checkFormat(day-29)); 
                                }
                        }
            else
                        {
                            sundayWrite(checkMonthFormat(month), checkFormat(day));
                        }
}