const containerPj = document.querySelector("#container-RYM")

const containerPj2 = document.querySelector("#container-RYM2")

const url = window.location.href

const searchParams = new URL(url).searchParams

const entries = new URLSearchParams(searchParams).entries()

const queryString= searchParams.toString(entries).replace('id=', '')

var numURL
var locID = []


function fetchPj(queryString){
    fetch(`https://rickandmortyapi.com/api/character/${queryString}/`)
        .then((res) => res.json())
        .then((data) => {
            spinner.style.display = "none";
            datos=data;
            
            datos.episode.forEach(element =>{
                numURL = element.replace( /^\D+/g, '');
                locID.push(numURL)
            })

            createPj(datos, datos.location.url)
            return fetch(`https://rickandmortyapi.com/api/episode/${locID}`);
        })
        
        .then(response => response.json())
        .then((date) => {
            const propOwn = Object.getOwnPropertyNames(date);

            if (propOwn.length === 7){
                
                createList(date)
            }

            else{
            date.forEach(element => {
             
                createList(element)
            })
            }
        })
        .catch(err => {
          console.error('Request failed', err)
        })
}

function createPj(data){
    let pj = data
    let elemento = document.createElement("div")
    elemento.innerHTML = `
            <div>
                <img src="${pj.image}" class="rounded mx-auto d-block rounded-circle" height="200" width="200" alt="...">
                <h2 class="mt-2">${pj.name}</h2>
            </div>

            <div class="container mt-5">
                <div class="row g-2 row-clor">
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <ul class="list-group">
                            <li class="list-group-item text-white border-0"><h4>Especie</h4></li>
                            <li class="list-group-item text-white border-0">${pj.species}</li>
                            <li class="list-group-item text-white border-0"><h4>Sub especie</h4></li>
                            <li class="list-group-item text-white border-0">${pj.type}</li>
                        </ul>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <ul class="list-group ">
                            <li class="list-group-item text-white border-0"><h4>Origen</h4></li>
                            <li class="list-group-item text-white border-0">${pj.origin.name}</li>
                            <li class="list-group-item text-white border-0"><h4>Genero</h4></li>
                            <li class="list-group-item text-white border-0">${pj.gender}</li>
                        </ul>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <ul class="list-group ">
                            <li class="list-group-item text-white border-0"><h4>Estado</h4></li>
                            <li class="list-group-item text-white border-0">${pj.status}</li>
                            <li class="list-group-item text-white border-0"><h4>Ultima ubicacion</h4></li>
                            <li class="list-group-item text-white border-0">${pj.location.name}</li>
                        </ul>
                    </div>
                </div>
               
            </div>
          
        </div>
    `;

    containerPj.appendChild(elemento)
}

function createList(element){
    var locn=element
    var li = document.createElement('li');
    li.classList.add("list-group-item")
    li.classList.add("text-white")
    li.classList.add("border-0")
    li.innerHTML = `<h5><a href='../../Episodios/Detalles/detallesE.html?id=${locn.id}' class="text-decoration-none">${locn.name}</a></h5>`

    containerPj2.appendChild(li)
}

fetchPj(queryString);



/*var link= document.createelement("a")
link.href='detallelocacion.html?id=${iddelocacion}

<a href="detallelocacion.html?=id"</a>----->resultado final'
*/

