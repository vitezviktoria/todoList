var date = new Date();
var dayofweek = date.getDay();    //0 és 6 közötti értéket ad (0 ha vasárnap)
var days = ["Vasárnap", "Hétfőő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
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

Dates();

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
   
    setTimeout(() => {
                        Dates();
                        for(let j=0; j<elems.length; j++)
                       {
                           elems[j].style.transition = "opacity 0.4s linear";
                           elems[j].style.opacity = 1;   
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
   
    setTimeout(() => {
                        Dates();
                        for(let j=0; j<elems.length; j++)
                       {
                           elems[j].style.transition = "opacity 0.5s linear 0s";
                           elems[j].style.opacity = 1;   
                       }
                },500);

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
                day = day-7;
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