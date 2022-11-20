const url = "https://rickandmortyapi.com/api/location";
const spinner = document.querySelector("#spinner")
const containerL = document.querySelector("#container-RYM")

function paginate(list, tamanoPagina, numPagina){
  return list.slice((numPagina - 1) * tamanoPagina, numPagina * tamanoPagina);
}


let list=Array.from({length: 126}, (_, u) => u + 1)


var cantInd = 0
function fetchL(list){
  fetch(`https://rickandmortyapi.com/api/location/${list}/`)
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
      mostrar.forEach((elementL, index) =>{
        cantInd === 24
        createL(elementL, index+1+cantInd)
      })
    }
    mostrar.forEach((elementL, index) =>{
      createL(elementL, index+1)
    })
  })
  .catch(error => alert(error));
}


function createL(data, index){
  let loc = data
  let elemento = document.createElement("div")
  elemento.classList.add("col-xs-12")
  elemento.classList.add("col-sm-12")
  elemento.classList.add("col-md-3")
  elemento.classList.add("col-lg-2")
  elemento.setAttribute("data-tilt", "")
  elemento.innerHTML = `
    <div class="card border-info mb-3 h-100" onclick="queryyy(${index})">
      <div class="card-header border-0">
        ${loc.id}
      </div>
      <div class="card-body">
        <h5 class="card-title">${loc.name}</h5>   
      </div>
    </div>   
    </div>
  `;
  
  containerL.appendChild(elemento)
    
}

function queryyy(index){
  const btnn= document.getElementById('btn2');

  const obj ={
    id: index,
  }

  const url2= 'Detalles/detallesL.html?'
    
  const searchParams= new URLSearchParams(obj)

  const queryString= searchParams.toString()

  window.location.href = url2 + queryString 

}
  

fetchL(list);
  