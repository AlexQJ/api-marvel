/* SEARCH */
document.querySelector('#search').addEventListener('click',()=>{
    const searchInput = document.getElementById('search_input');
    const searchVal = searchInput.value != '' ? searchInput.value : 'spider-man';
    const searchCharacters = async ()=>{
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1651340334&apikey=47ee7e1ef7f5f234e4a5a9723efb7f89&hash=2ed678c53efe6c7b1fc113181948f32e&nameStartsWith=${searchVal}`;
        const getData = await fetch(url)
        const data =  await getData.json()
        const results = data.data.results;
        const lista_busqueda = document.querySelector('.lista-busqueda');
        lista_busqueda.innerHTML = `<div class="container"><h2>${searchVal}</h2></div>`;

        results.forEach((character, index) => {
            lista_busqueda.innerHTML += `
                <div class="card">
                    <img src="${character.thumbnail.path}.${character.thumbnail.extension}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <div id="eventsFrom-${index}"></div>
                        <button type="button" id="${index}" onClick="btnFav(${index})"><i class="fa-regular fa-heart"></i> Favorito</button>
                    </div>
                </div>
            `;
            
            getEvents(character,index);
          });
    }
        searchCharacters();
    
})


/* Lista de 50 personajes */
const getCharacters = async () => {
  // especifica:   const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1651340334&apikey=47ee7e1ef7f5f234e4a5a9723efb7f89&hash=2ed678c53efe6c7b1fc113181948f32e&limit=50&nameStartsWith=spider`;
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1651340334&apikey=47ee7e1ef7f5f234e4a5a9723efb7f89&hash=2ed678c53efe6c7b1fc113181948f32e&limit=50`;

  const getData = await fetch(url)

  const data =  await getData.json()
  const results = data.data.results;
  const contenedor = document.querySelector('.lista-personajes');
  contenedor.innerHTML = '<div class="container"><h2>Listado de personajes</h2></div>';
  
  results.forEach((character, index) => {
    contenedor.innerHTML += `
        <div class="card">
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <div id="eventsFrom-${index}" class="events"></div>
                <button type="button" id="${index}" onClick="btnFav(${index})"><i class="fa-regular fa-heart"></i> Favorito</button>
            </div>
        </div>
    `;
    
    getEvents(character,index);
  });

    
}
function getEvents(character,index){
    const contenedorEventos = document.getElementById('eventsFrom-'+index);

    if(character.events.items.length == 3){
        contenedorEventos.innerHTML = `
        <p>${character.events.items[0].name}</p>
        <p>${character.events.items[1].name}</p>
        <p>${character.events.items[2].name}</p>
        `;
    }else if(character.events.items.length == 2){
        contenedorEventos.innerHTML = `
        <p>${character.events.items[0].name}</p>
        <p>${character.events.items[1].name}</p>
        `;
    }else if(character.events.items.length == 1){
        contenedorEventos.innerHTML = `<p>${character.events.items[0].name}</p>`;
    }else {
        contenedorEventos.innerHTML = `<p>No ha participado en algun evento</p>`
    }
}

function btnFav(i){
    const btn_fav = document.getElementById(i);
    btn_fav.addEventListener('click',cambiarIcono(btn_fav))
}

function cambiarIcono(btn_fav){
    if(btn_fav.innerHTML == '<i class="fa-regular fa-heart"></i> Favorito'){
        btn_fav.innerHTML = '<i class="favActive fa-solid fa-heart"></i> Favorito'
    }else{
        btn_fav.innerHTML ='<i class="fa-regular fa-heart"></i> Favorito'
    }
}
getCharacters();
