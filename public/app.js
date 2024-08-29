let items = document.querySelector(".items");
let cartDiv = document.querySelector(".cart");
let cartSpan = document.querySelector("header span:last-child");
let addItemDiv = document.querySelector(".new-item");
let addItemSpan = document.querySelector(".add-item button");
let orderObject = {};
let orderSpan = document.querySelector("header span:first-child");
let orderDiv = document.querySelector(".orders");



const postData = async (url = '', data) => {
    // console.log(data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}

let cart = {};

items.addEventListener('click', async function (e) {// add item to shopping cart
    if (e.target.tagName === 'BUTTON') {
        // Get the parent .item element
        let itemElement = e.target.parentElement;

        // Find the name, price, and quantity elements within the .item
        let name = itemElement.querySelector('.name').textContent;
        let price = itemElement.querySelector('.price').textContent;
        let quantity = parseInt(itemElement.querySelector('input').value, 10);

        // Remove the dollar sign and convert price to numeric
        if (price[0] === "$") {
            price = parseFloat(price.replace('$', ''));
        }

        // Check if quantity is greater than 0
        if (quantity > 0) {
            // Save item details into the cart
            if (cart[name]) {
                // Update existing item in the cart
                cart[name].quantity += quantity;
                cart[name].price = price;
            } else {
                // Add new item to the cart
                cart[name] = {
                    price: price * quantity,
                    quantity: quantity
                };
            }
        }

        updateCartDisplay();
    }
    if (e.target.classList.contains("x")) {
        let name = e.target.nextElementSibling.textContent;
        const data = await postData("/deleteproduct", { name: name });
        getItemsFromDB();
    }
});



function updateCartDisplay() {// Function to update the cart display
    console.log(cart);
    let total = 0;
    // Get the cart div element
    const cartElement = document.querySelector('.cart');

    // Clear existing content
    cartElement.innerHTML = '';

    // Check if the cart is empty
    if (Object.keys(cart).length === 0) {
        cartElement.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Create a list to display cart items
    const list = document.createElement('ul');
    // Iterate over cart items and create list items
    for (const [name, { price, quantity }] of Object.entries(cart)) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<div><span>${name}</span>: 
                            <span>$${price * quantity}<span>
                            <span> for </span> 
                            <span>${quantity}</span>
                            <span> items</span></div>`;

        const buttons = document.createElement('div');
        total += price * quantity;

        // Create and append the + button
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.dataset.name = name;
        buttons.appendChild(addButton);

        // Create and append the - button
        const subtractButton = document.createElement('button');
        subtractButton.textContent = '-';
        subtractButton.dataset.name = name;
        buttons.appendChild(subtractButton);



        listItem.appendChild(buttons);

        // Append the list item to the list
        list.appendChild(listItem);
    }

    // Append the list to the cart div
    cartElement.appendChild(list);
    cartElement.innerHTML += `  <h2>total: ${total}</h2>      <div id="submit-order">submit order</div>    `;

    orderObject = Object.keys(cart).map(key => {
        return {
            productname: key,
            quantity: cart[key].quantity,
            price: cart[key].price
        };
    });
    orderObject = {
        "total": total,
        "products": orderObject
    }
    document.querySelector("#submit-order").addEventListener("click", async () => {
        console.log(orderObject);
        const data = await postData("/addorder", orderObject);
    })

    // Add event listeners for + and - buttons

}

document.querySelector(".cart").addEventListener('click', function (e) {// add or subtract items in the cart
    if (e.target.tagName === 'BUTTON') {
        const itemName = e.target.dataset.name;

        if (e.target.textContent === '+') {
            cart[itemName].quantity += 1;
        } else {
            if (cart[itemName].quantity > 0) {
                cart[itemName].quantity -= 1;
            }
        }

        // Remove item from cart if quantity is 0
        if (cart[itemName].quantity === 0) {
            delete cart[itemName];
        }

        // Update cart display
        updateCartDisplay();
    }
});

function showHide(item) {// function to show and hide cart
    let type = (item == addItemDiv) ? "flex" : "block";
    if (item.style.display == type)
        item.style.display = "none";
    else
        item.style.display = type;
}

document.querySelector("body").addEventListener("click", handleBodyClick);

function handleBodyClick(e) {// to control showHide function
    if (e.target.tagName != "BUTTON")
        if (e.target == cartSpan || cartDiv.style.display === "block" && !cartDiv.contains(e.target)) {
            showHide(cartDiv);
        }
    if (e.target == addItemSpan || addItemDiv.style.display === "flex" && !addItemDiv.contains(e.target)) {
        showHide(addItemDiv);
    }
    if (e.target == orderSpan || orderDiv.style.display === "block" && !orderDiv.contains(e.target)) {
        showHide(orderDiv);
    }

};

const getItemsFromDB = async () => {// get he produtcts from data base and show them 
    const url = '/getproducts';

    try {
        const data = await postData(url, {});

        if (Array.isArray(data)) {
            items.innerHTML = "";
            for (const product of data) {
                const { name, price } = product;
                items.innerHTML += ` <div class="item">
                <div class="x">X</div>
                <div class="name">${name}</div>
                <span class="price">$${price}</span>
                <input type="number" min="0" value="1">
                <button>Add</button>
            </div>`;
            }
        } else {
            console.error('Data is not an array:', data);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};
getItemsFromDB();

document.querySelector(".new-item button").addEventListener("click", async () => {
    let name = document.querySelector(".new-item #item-name").value;
    let price = document.querySelector(".new-item #item-price").value;
    try {
        const data = await postData("/addproduct", { "name": name, "price": price });
        getItemsFromDB();
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
})

// Function to update the HTML with the fetched orders
const displayOrders = (orders) => {
    const ordersDiv = document.querySelector('.orders');

    // Clear existing content
    ordersDiv.innerHTML = '';

    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order');

        // Create a string with order details
        let orderHTML = `<h3>Order ID: ${order.id}</h3>`;
        orderHTML += `<p>Total: ${order.total}</p>`;
        orderHTML += '<ul>';

        // Add order products
        order.order_products.forEach(product => {
            orderHTML += `
                <li>
                    Product: ${product.productname}, 
                    Quantity: ${product.quantity}, 
                    Price: ${product.price}
                </li>
            `;
        });

        orderHTML += '</ul>';

        // Append the order details to the ordersDiv
        orderElement.innerHTML = orderHTML;
        ordersDiv.appendChild(orderElement);
    });
};

orderSpan.addEventListener("click", async () => {
    const orders = await postData("/orders", {});

    displayOrders(orders);
})