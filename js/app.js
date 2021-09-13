// load api data
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  // const divContainer = document.getElementById("all-products");
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
                <div class="single-product card h-100">
                  <div class = "mx-auto pt-3">
                    <img src="${image}" class="product-image" alt="..." />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">
                      Category: ${product.category}
                    </p>
                    <div class="rating">
                     <span>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                       ${product.rating.rate},
                      </span>
                    <span>Ratings: ${product.rating.count}</span>
                    </div>
                    <h2 class="mt-2">Price: $ ${product.price}</h2>
                    </div>
                    <div class="card-footer d-flex justify-content-around">
                     
                      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">Add to cart</button>
                    <button onclick="singleProductLoad(${product.id})" id="details-btn" class="btn btn-danger">Details</button>
                     </div>
                  </div>        
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText =
    parseFloat(grandTotal).toFixed(2);
};
// single product api data load here
const singleProductLoad = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => singleProductDisplay(data));
};
// show single prodct detils on ui
const singleProductDisplay = (data) => {
  const singleProductContainer = document.getElementById("singleProduct");
  singleProductContainer.innerHTML = `
      <div class="card mb-3 p-3 mx-auto single-product-detail" style="max-width: 700px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src=${data.image} class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">Category: ${data.category}</p>
              <div class="rating">
                <span>
                  <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
                   ${data.rating.rate},</span>
                  <span>Ratings: ${data.rating.count}</span>
              </div>
              <p class="description mt-2">${data.description}</p>
             <h2>Price: $ ${data.price}</h2>
            </div>
          </div>
        </div>
    </div>
  `;
};
