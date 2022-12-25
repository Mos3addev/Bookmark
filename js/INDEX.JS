var siteNameInput = document.getElementById("siteNameInput");
var urlNameInput = document.getElementById("urlNameInput");
var currentIndex = 0;
var productContainer = [];

if (localStorage.getItem("products") != null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}
function addProduct() {
  var product = {
    name: siteNameInput.value,
    url: urlNameInput.value,
  };
  productContainer.push(product);
  clearForm();
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts();
}

function clearForm() {
  siteNameInput.value = "";
  urlNameInput.value = "";
}

function displayProducts() {
  var tableDate = ``;
  for (var i = 0; i < productContainer.length; i++) {
    tableDate += `
    <div class="container py-2 w-75 background">
    <div class="col-lg-5 d-flex justify-content-between">
      <h3 class="fw-bold">${productContainer[i].name}</h3>
      <div>
        <a class="btn me-lg-3 me-md-3 mb-lg-2  btn-primary" href="https:\\${productContainer[i].url}.com" target="_blank">Visit</a>
        <button onclick="deleteProduct(${i});" class="btn me-lg-3 me-md-3 mb-lg-2  btn-outline-danger">Delete</button>
        <button onclick="setValueInForm(${i})" class="btn me-lg-3 me-md-3 mb-lg-2  btn-outline-primary">Update</button>
        </div>
    </div>
    </div>
        `;
  }
  document.getElementById("tableBody").innerHTML = tableDate;
}

function deleteProduct(indexDelete) {
  productContainer.splice(indexDelete, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts();
}

function SearchProducts(productNameSearch) {
  var tableDate = ``;
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name
        .toLowerCase()
        .includes(productNameSearch.toLowerCase()) == true
    ) {
      tableDate += `
      <div class="container py-5 w-75 background">
    <div class="col-lg-5 d-flex justify-content-between">
      <h3 class="fw-bold">${productContainer[i].name}</h3>
      <div>
        <a class="btn me-lg-3 me-md-3 mb-lg-2  btn-primary" href="https:\\${productContainer[i].url}.com" target="_blank">Visit</a>
        <button onclick="deleteProduct(${i});" class="btn me-lg-3 me-md-3 mb-lg-2  btn-outline-danger">Delete</button>
        <button onclick="setValueInForm(${i})" class="btn me-lg-3 me-md-3 mb-lg-2  btn-outline-primary">Update</button>
        </div>
    </div>
  </div>
              `;
    }
    document.getElementById("tableBody").innerHTML = tableDate;
  }
}

function setValueInForm(indexUpdate) {
  currentIndex = indexUpdate;
  siteNameInput.value = productContainer[indexUpdate].name;
  urlNameInput.value = productContainer[indexUpdate].url;
  document.getElementById("addBtn").classList.add("d-none");
  document.getElementById("updateBtn").classList.replace("d-none", "d-block");
}
function updateProduct() {
  var product = {
    name: siteNameInput.value,
    url: urlNameInput.value,
  };
  productContainer[currentIndex] = product;
  document.getElementById("addBtn").classList.replace("d-none", "d-block");
  document.getElementById("updateBtn").classList.replace("d-block", "d-none");
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts();
  clearForm();
}
