/* Gallery products array */
let products = [
    {
        name: "TridentZ RAM 16GB",
        description: "High-performance RAM for gaming and multitasking.",
        value: 16.0,
        image: "/assets/ram.jpg"
    },
    {
        name: "Ryzen 9 5900X CPU",
        description: "Powerful CPU for gaming and productivity.",
        value: 499.99,
        image: "/assets/cpu.webp"
    },
    {
        name: "GeForce RTX 3080 GPU",
        description: "High-end graphics card for gaming and rendering.",
        value: 699.99,
        image: "/assets/gpu.jpeg"
    }
]

/* The cart: it stores indices of the products array, and a quantity */
let cart = [
    /*
    {
        id: 0,
        quantity: 1
    }
    */
];

/* Update the products list in the gallery based on the current products */
function updateProducts() {
    let productsList = document.getElementById("products-list");
    productsList.innerHTML = "";

    /* For each product in the array, create a new element and add it to the gallery */
    products.forEach(product => {
        let productElement = document.createElement("div");
        productElement.innerHTML = `
            <section class="product">
                <img src="${product.image}" alt="product image"/>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <button onclick="addToCart(${products.indexOf(product)})">Add to Cart - \$${product.value} USD</button>
                </div>
            </section>
        `
        productsList.appendChild(productElement);
    });

}

/* Update the cart list and the total based on the current cart */
function updateCart() {
    let cartTable = document.getElementById("cart-list");
    let cartTotal = document.getElementById("cart-total");
    cartTable.innerHTML = "";
    cartTotal.innerHTML = "$0.00";

    /* If the cart is empty, show a single row saying so */
    if (cart.length === 0) {
        cartTable.innerHTML = `
            <tr>
                <td colspan="4">No products in the cart</td>
            </tr>
        `;

        return;
    }

    /* For each item in the cart, add a row to the table */
    cart.forEach(item => {
        let product = products[item.id];
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${item.quantity}</td>
            <td>${product.value * item.quantity}</td>
        `;

        cartTable.appendChild(row);
    });

    /* Calculate the total value of the cart and show it in the total element */
    let total = cart.reduce((acc, item) => {
        return acc + products[item.id].value * item.quantity;
    }, 0);

    cartTotal.innerHTML = `$${total.toFixed(2)}`;
}

/* Add a product to the gallery */
function addProduct(event) {
    let form = document.getElementById("add-product-form");
    event.preventDefault();

    let name = form.name.value;
    let description = form.description.value;
    let value = form.price.value;
    let image = form.image.value;

    products.push({name, description, value, image});
    updateProducts(); // Update the gallery to show the new product
}

/* Add a product to the cart */
function addToCart(id) {
    let item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({id, quantity: 1});
    }

    updateCart(); // Update the cart to show the new item
}

/* Remove a product from the cart */
function clearCart() {
    cart = [];
    updateCart();
}

/* Wait for the DOM to load before running the scripts */
document.addEventListener("DOMContentLoaded", function() {
    updateProducts();
    updateCart();

    /* Add event listeners */
    document.getElementById("add-product-form").addEventListener("submit", addProduct);
    document.getElementById("clear-cart").addEventListener("click", clearCart);

});
