const containerE = document.querySelector("#container-RYM")

const containerE2 = document.querySelector("#container-RYM2")

const url = window.location.href

const searchParams = new URL(url).searchParams

const entries = new URLSearchParams(searchParams).entries()

const queryString= searchParams.toString(entries).replace('id=', '')

let list=Array.from({length: 823}, (_, u) => u + 1)


var numURL
var locID = []

function fetchE(queryString){
    fetch(`https://rickandmortyapi.com/api/episode/${queryString}/`)
    .then((res) => res.json())
    .then((data) => {
        spinner.style.display = "none";
        datos=data;
        datos.characters.forEach(element =>{
            numURL = element.replace( /^\D+/g, '');
            locID.push(numURL)
        })

        createE(datos)
        return fetch(`https://rickandmortyapi.com/api/character/${locID}`);
    })
    
    .then(response => response.json())
    .then((date) => {
        const propOwn = Object.getOwnPropertyNames(date);
        if (propOwn.length === 12){    
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


function createE(data){
    let epi = data
    let elemento = document.createElement("div")
    elemento.innerHTML = `
        <div>
            <h2 class="mt-2">${epi.name}</h2>
        </div>
        
        <div class="container mt-5">
            <div class="row g-2 row-clor">
                <div class="col">
                    <ul class="list-group ">
                        <li class="list-group-item text-white border-0 "><h4>Fecha de lanzamiento</h4></li>
                        <li class="list-group-item text-white border-0">${epi.air_date}</li>
                    </ul>
                </div>

                <div class="col">
                    <ul class="list-group ">
                        <li class="list-group-item text-white border-0 "><h4>Episodio y temporada</h4></li>
                        <li class="list-group-item text-white border-0">${epi.episode}</li>
                    </ul>
                </div>

            </div>
        </div>
            
    </div>`;

    containerE.appendChild(elemento)
}

function createList(element){
    var charn=element
    var li = document.createElement('li');
    li.classList.add("list-group-item")
    li.classList.add("text-white")
    li.classList.add("border-0")
    li.innerHTML = `<h5><a href='../../Persojanes/Detalles/detalles.html?id=${charn.id}' class="text-decoration-none">${charn.name}</a></h5>`

    containerE2.appendChild(li)
}

  
fetchE(queryString);