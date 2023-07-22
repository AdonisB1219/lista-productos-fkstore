function getData() {
  let promesa = fetch("https://fakestoreapi.com/products/", {
    method: "GET",
  });
  promesa
    .then((response) => {
      response
        .json()
        .then((data) => {
          createCards(data);
        })
        .catch((error) => console.error("Problema en el json", error));
    })
    .catch((error) => {
      console.error(error, "ocurrio un error en la solicitud");
    });
}

getData();

function createCards(data) {
  data.forEach((producto) => {
    console.log(producto.id, producto.title);
    let descripcionCarta = producto.description.slice(0, 80);
    let card = `
    <div class="col">
      <div class="card h-100" style="width: 23rem;">
      <div class="flex-card h-100 d-flex justify-content-center flex-wrap">
      <div class="imagen">
         <img src="${producto.image}" class="card-img-top center-block mx-auto d-block img-fit" alt="...">
</div>
</div>
        <div class="card-body">
          <h5 class="card-title">${producto.title}</h5>
          <p class="card-text categoria">${producto.category}</p>
          <p class="card-text">
          <p class="precio">$ ${producto.price}</p>
          <p class="description">${descripcionCarta}...</p>
        <div class="text-end boton-carta aligned-self-end">
           <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moreInfo${producto.id}">More info</button>
        </div>
      </div>
      </div>
    </div>`;

    let modal = `
<div class="modal fade" id="moreInfo${producto.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${producto.title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p class="description">${producto.description}<p>
      </div>
    </div>
  </div>
</div>`;
    document
      .getElementsByClassName("row")[0]
      .insertAdjacentHTML("beforeend", card);
    document
      .getElementsByClassName("container")[0]
      .insertAdjacentHTML("afterend", modal);
  });
}
