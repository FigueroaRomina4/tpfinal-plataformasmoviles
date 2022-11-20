const containerL = document.querySelector("#container-RYM")

const containerL2 = document.querySelector("#container-RYM2")

const url = window.location.href

const searchParams = new URL(url).searchParams

const entries = new URLSearchParams(searchParams).entries()

const queryString= searchParams.toString(entries).replace('id=', '')

let list=Array.from({length: 823}, (_, u) => u + 1)

var numURL
var locID = []

function fetchL(queryString){
    fetch(`https://rickandmortyapi.com/api/location/${queryString}/`)
    .then((res) => res.json())
    .then((data) => {
        spinner.style.display = "none";
        datos=data;
        
        datos.residents.forEach(element =>{
            numURL = element.replace( /^\D+/g, '');
            locID.push(numURL)
        })
        
        createL(datos)
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

  
function createL(data){
    let loc = data
    let elemento = document.createElement("div")
    elemento.innerHTML = `
        <div>
            <h2 class="mt-2">${loc.name}</h2>
        </div>

        <div class="container mt-5">
            <div class="row g-2 row-clor">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <ul class="list-group ">
                        <li class="list-group-item text-white border-0 "><h4>Tipo de Locacion</h4></li>
                        <li class="list-group-item text-white border-0">${loc.type}</li>
                    </ul>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <ul class="list-group ">
                        <li class="list-group-item text-white border-0 "><h4>Dimenson</h4></li>
                        <li class="list-group-item text-white border-0">${loc.dimension}</li>
                    </ul>

                </div>

            </div>
               
        </div>
     
     </div>
`;

containerL.appendChild(elemento)
  
}

function createList(element){
    var locn=element
    var li = document.createElement('li');
    li.classList.add("list-group-item")
    li.classList.add("text-white")
    li.classList.add("border-0")

    li.innerHTML = `<h5><a href='../../Persojanes/Detalles/detalles.html?id=${locn.id}' class="text-decoration-none">${locn.name}</a></h5>`

    containerL2.appendChild(li)
}

  
fetchL(queryString);

