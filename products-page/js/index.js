const searchByNameInput = document.querySelector("#searchByName input");
const products = document.querySelectorAll(".product-card");

const nameFilterHandler = (event) => {
  const searchValue = event.target.value.toLowerCase().trim();
  products.forEach((product) => {
    const productName = product.querySelector("p").innerHTML.toLowerCase();
    if (productName.includes(searchValue)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
};

searchByNameInput.addEventListener("keyup", nameFilterHandler);
