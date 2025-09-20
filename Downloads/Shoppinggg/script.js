const products = [
    { name: "Laptop", category: "electronics", price: 876.88, image: "Laptop.jpeg" },
    { name: "Smartphone", category: "electronics", price: 292.29, image: "Smartphone.jpg" },
    { name: "T-Shirt", category: "clothing", price: 5.84, image: "T-Shirt.jpeg" },
    { name: "Microwave", category: "home", price: 58.45, image: "Microwave.jpeg" },
    { name: "Sneakers", category: "clothing", price: 14.03, image: "Sneakers.jpeg" }
  ];
  
  const deals = [
    { name: "Headphones", price: 23.37, image: "Headphones.jpg" },
    { name: "Shoes B1G1", price: 29.22, image: "Shoes B1G1.jpeg" }
  ];
  
  let cart = [];
  
  function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    const countBadge = document.getElementById("cart-count");
    const cartMessage = document.getElementById("cart-message");
  
    cartContainer.innerHTML = "";
    cartMessage.style.display = cart.length === 0 ? "block" : "none";
    countBadge.textContent = cart.length;
    countBadge.style.display = cart.length > 0 ? "inline-block" : "none";
  
    if (cart.length > 0) {
      cart.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h4>${item.name}</h4>
          <p>${item.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
          <button class="remove-from-cart" onclick="removeFromCart(${i})">Remove from Cart</button>`;
        cartContainer.appendChild(div);
      });
    }
  }
  
  function addToCart(item) {
    cart.push(item);
    updateCart();
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }
  
  function displayProducts(list, targetId) {
    const container = document.getElementById(targetId);
    container.innerHTML = "";
    list.forEach(item => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h4>${item.name}</h4>
        <p>${item.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
        <button class="add-to-cart" onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
        <button class="buy-now">Buy Now</button>`;
      container.appendChild(div);
    });
  }
  
  function showCategory(category) {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered, "category-products");
  }
  
  function switchSection(id) {
    document.querySelectorAll(".container").forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";
    if (id === "cart") updateCart();
  }
  
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const section = e.currentTarget.getAttribute("data-section");
      switchSection(section);
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products, "home-products");
    displayProducts(deals, "deal-products");
    switchSection("home");
  });
  