// Selecting DOM elements
const artigoNovo = document.querySelector("#artigo-novo");
const artigoQuantidade = document.querySelector("#artigo-quantidade");
const adicionarArtigo = document.querySelector("#adicionar-artigo");
const listaA = document.querySelector("#lista-a");
const listaB = document.querySelector("#lista-b");

// Retrieving saved lists from localStorage
const listaAGuardada = localStorage.getItem("listaA");
const listaBGuardada = localStorage.getItem("listaB");

// Adding click event listener to the "Adicionar" button
adicionarArtigo.addEventListener("click", adicionarItem);

// Adding keydown event listener to the "artigoNovo" input for Enter key
artigoNovo.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    adicionarItem();
  }
});

artigoQuantidade.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    adicionarItem();
  }
});

// Setting focus on the "artigo-novo" input field
document.getElementById("artigo-novo").focus();

// Function to add a new item to the list
function adicionarItem() {
  // Retrieving values from input fields
  const artigoValor = artigoNovo.value;
  const quantidadeValor = artigoQuantidade.value;

  // Creating new DOM elements
  const itemAdicionado = document.createElement("li");
  const sinalApagar = document.createElement("button");

  // Checking if the artigoNovo input is empty
  if (artigoNovo.value === "") {
    alert("Insira um artigo e quantidade antes de adicionar ao carrinho");
    return;
  }

  // Configuring the delete button
  sinalApagar.setAttribute("id", "apagar-artigo");
  sinalApagar.textContent = "X";
  sinalApagar.addEventListener("click", apagarItem);

  // Configuring the added item
  itemAdicionado.addEventListener("click", transferirItem);
  itemAdicionado.innerHTML = artigoValor;

  itemAdicionado.textContent = `${artigoValor} ${quantidadeValor}`;
  itemAdicionado.appendChild(sinalApagar);
  listaA.appendChild(itemAdicionado);

  // Clearing input fields and setting focus
  document.getElementById("artigo-novo").value = "";
  document.getElementById("artigo-quantidade").value = "";
  document.getElementById("artigo-novo").focus();

  // Saving and updating lists and styles
  guardarLista();
  toggleListaStyles();
}

// Function to delete an item
function apagarItem(event) {
  event.stopPropagation();
  this.parentNode.remove();
  guardarLista();
  toggleListaStyles();
}

// Function to move an item between lists
function transferirItem() {
  const nomeLista = this.parentNode.id;

  if (nomeLista === "lista-a") {
    listaB.appendChild(this);
  } else {
    listaA.appendChild(this);
  }
  guardarLista();
  toggleListaStyles();
}

// Function to save lists to localStorage
function guardarLista() {
  localStorage.setItem("listaA", listaA.innerHTML);
  localStorage.setItem("listaB", listaB.innerHTML);
}

// Function to retrieve lists from localStorage and set up event listeners
function recuperarLista() {
  if (listaAGuardada) {
    listaA.innerHTML = localStorage.getItem("listaA");
  }

  if (listaBGuardada) {
    listaB.innerHTML = localStorage.getItem("listaB");
  }

  // Setting up event listeners for items and delete buttons
  const itens = document.querySelectorAll("#lista-a li, #lista-b li");
  itens.forEach((itemAdicionado) => {
    itemAdicionado.addEventListener("click", transferirItem);
  });

  const btnApagar = document.querySelectorAll(
    "#lista-a li button, #lista-b li button"
  );
  btnApagar.forEach((sinalApagar) => {
    sinalApagar.addEventListener("click", apagarItem);
  });
}

// Function to toggle the display styles of lists based on their content
function toggleListaStyles() {
  if (listaA.childElementCount > 0) {
    listaA.style.display = "block";
  } else {
    listaA.style.display = "none";
  }

  if (listaB.childElementCount > 0) {
    listaB.style.display = "block";
  } else {
    listaB.style.display = "none";
  }
}

// Main function to set up the application
function main() {
  recuperarLista();
}

// Call the main function to initialize the application
main();
