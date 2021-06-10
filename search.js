
    var stored = localStorage.getItem('todo');
    var todoTopics = [];
    var choiceTopic;
    
    if (stored)
        {
        var records = JSON.parse(stored);
        var keyCount = Object.keys(records).length;
       
        }
    
        let choice = document.querySelectorAll('input');
                       for (i of choice) {
                            i.addEventListener('Click', function() {
                               choiceTopic = this.name;
                               console.log('choice')
                                
                            });
                        }

        function Search(name) {
            var checkBox = document.getElementById(name);
            if (checkBox.checked == true){
            for(var i=4; i<=keyCount; i++)
        {
            todoTopics[i] = records[i].topics;
            for(var j=0; j<=todoTopics[i].length; j++) {
                if(todoTopics[i][j] === name) {
                    console.log(name);
                }
                
            }
        }
            }
        }                

        