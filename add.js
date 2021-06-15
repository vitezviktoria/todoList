function handleSubmit(event) {
   
  event.preventDefault();
  
  
  
  existing = existing ? JSON.parse(existing) : {};
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  value.topics = data.getAll("topics");
  var cr = Object.keys(existing).length;
  
  cr++;
  
  existing[cr] = value;
  localStorage.setItem('todo', JSON.stringify(existing));

}

//localStorage.clear(); 
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);  
  