const url = "https://rickandmortyapi.com/api/episode";
const spinner = document.querySelector("#spinner")
const containerE = document.querySelector("#container-RYM")

function paginate(list, tamanoPagina, numPagina){
  return list.slice((numPagina - 1) * tamanoPagina, numPagina * tamanoPagina);
}

let list=Array.from({length: 51}, (_, u) => u + 1)


var cantInd = 0

function fetchE(list){
  fetch(`https://rickandmortyapi.com/api/episode/${list}/`)
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
      mostrar.forEach((elementE, index) =>{
        cantInd === 24
        createE(elementE, index+1+cantInd)
      })
    }
    mostrar.forEach((elementE, index) =>{
      createE(elementE, index+1)
    })
  })
  .catch(error => alert(error));
}

function createE(data, index){
    let epi = data
    let elemento = document.createElement("div")
    elemento.classList.add("col-xs-12")
    elemento.classList.add("col-sm-12")
    elemento.classList.add("col-md-3")
    elemento.classList.add("col-lg-2")
    elemento.setAttribute("data-tilt", "")
    elemento.innerHTML = `
      <div class="card mb-3 h-100" onclick="queryyy(${index})">
        <div class="card-header border-0">
          ${epi.id}
        </div>
        <div class="card-body">
          <h5 class="card-title">${epi.name}</h5>   
        </div>
      </div>

          
    </div>
  `;
  
  containerE.appendChild(elemento)
    
}

function queryyy(index){
  const btnn= document.getElementById('btn2');

  const obj ={
    id: index,
  }

  const url2= 'Detalles/detallesE.html?'
    
  const searchParams= new URLSearchParams(obj)

  const queryString= searchParams.toString()

  window.location.href = url2 + queryString

}

fetchE(list);