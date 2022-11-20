const url = "https://rickandmortyapi.com/api/character";
const spinner = document.querySelector("#spinner")
const containerPj = document.querySelector("#container-RYM")


function paginate(list, tamanoPagina, numPagina){
  return list.slice((numPagina - 1) * tamanoPagina, numPagina * tamanoPagina);
}


let list=Array.from({length: 823}, (_, u) => u + 1)


var cantInd = 0

function fetchPj(list){
  fetch(`https://rickandmortyapi.com/api/character/${list}/`)
  .then((res) => res.json())
  .then((data) => {
    spinner.style.display = "none";
    datos=data;
    var pagina = 1
    var mostrar= paginate(datos, 24, pagina)
    const btn = document.getElementById('btn')
    btn.onclick = function(){
      cantInd +=24
      pagina+=1
      mostrar= paginate(datos, 24, pagina)
      mostrar.forEach((elementpj, index) =>{
        cantInd === 24
        createPj(elementpj, index+1+cantInd)
      })
    }
    mostrar.forEach((elementpj, index) =>{
      createPj(elementpj, index+1)
    })
  })
  .catch(error => alert(error));
}



function createPj(data, index){
  let pj = data
  let elemento = document.createElement("div")
  elemento.classList.add("col-xs-12")
  elemento.classList.add("col-sm-12")
  elemento.classList.add("col-md-3")
  elemento.classList.add("col-lg-2")
  elemento.setAttribute("data-tilt", "")
  elemento.innerHTML = `
        <div class="card h-100 " onclick="queryyy(${index})">
            <img src="${pj.image}"class="card-img-top">
            <div class="card-body">
                <h6 class="card-title ">${pj.name}</h6>
            </div>
        </div>
      </div>
  `;

  containerPj.appendChild(elemento)
}

function queryyy(index){
    const btnn= document.getElementById('btn2');

    const obj ={
      id: index,
    }
    console.log(obj)

    const url2= 'Detalles/detalles.html?'
    
    const searchParams= new URLSearchParams(obj)

    const queryString= searchParams.toString()

    window.location.href = url2 + queryString
}

fetchPj(list);


