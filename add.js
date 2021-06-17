function handleSubmit(event) {
   
  event.preventDefault();
  
  
  //adatok felbontása
  existing = existing ? JSON.parse(existing) : {};
  //Formból származó adatok kinyerése
  //topikok külön tömbbe, mintsem külön mentve
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  value.topics = data.getAll("topics");
  //Az létező adatok hosza
  //ezt növelve nem felülír, hanem hozzátesz
  var cr = Object.keys(existing).length;
  
  cr++;
  
  existing[cr] = value;
  localStorage.setItem('todo', JSON.stringify(existing));

}

//localStorage.clear(); //ezcsaktesztelésmiattvanitt 
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);  
  