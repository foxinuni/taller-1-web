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

let cart = [
    /*
    {
        id: 0,
        quantity: 1
    }
    */
];

function updateProducts() {
    let productsList = document.getElementById("products-list");
    productsList.innerHTML = "";

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

function updateCart() {
    let cartTable = document.getElementById("cart-list");
    let cartTotal = document.getElementById("cart-total");
    cartTable.innerHTML = "";
    cartTotal.innerHTML = "$0.00";

    if (cart.length === 0) {
        cartTable.innerHTML = `
            <tr>
                <td colspan="4">No products in the cart</td>
            </tr>
        `;

        return;
    }

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

    let total = cart.reduce((acc, item) => {
        return acc + products[item.id].value * item.quantity;
    }, 0);

    cartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function addProduct(event) {
    let form = document.getElementById("add-product-form");
    event.preventDefault();

    let name = form.name.value;
    let description = form.description.value;
    let value = form.price.value;
    let image = form.image.value;

    products.push({name, description, value, image});
    updateProducts();
}

function addToCart(id) {
    let item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({id, quantity: 1});
    }

    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

document.addEventListener("DOMContentLoaded", function() {
    updateProducts();
    updateCart();

    document.getElementById("add-product-form").addEventListener("submit", addProduct);
    document.getElementById("clear-cart").addEventListener("click", clearCart);

});
