const searchByNameInput = document.querySelector("#searchByName input");
const products = document.querySelectorAll(".product-card");
const categoryButtons = document.querySelectorAll(".categorys button");

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

const categoryFilterHandler = (event) => {
  // changing styles of buttons
  categoryButtons.forEach((button) => {
    button === event.target
      ? button.classList.add("active")
      : button.classList.remove("active");
  });
  // filtering process
  const category = event.target.innerText.toLowerCase();
  products.forEach((product) => {
    if (category === "all") {
      product.style.display = "block";
    } else {  
      const productCategory = product.dataset.category;
      productCategory === category
        ? (product.style.display = "block")
        : (product.style.display = "none");
    }
  });
};



searchByNameInput.addEventListener("keyup", nameFilterHandler);
categoryButtons.forEach((button) => {
  button.addEventListener("click", categoryFilterHandler);
});
