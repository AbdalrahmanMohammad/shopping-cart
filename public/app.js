let items = document.querySelector(".items");
let cartDiv=document.querySelector(".cart");
let cartSpan=document.querySelector("header span:last-child");

const postData = async (url = '', data) => {
    // console.log(data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: (data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}



let cart = {};

items.addEventListener('click', function (e) {
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
                cart[name].price += price * quantity;
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
});


// Function to update the cart display
function updateCartDisplay() {
    console.log(cart);
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

    // Add event listeners for + and - buttons

}

document.querySelector(".cart").addEventListener('click', function (e) {
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

function showHide() {// function to show and hide cart
    if (cartDiv.style.display == "block")
    cartDiv.style.display = "none";
    else
    cartDiv.style.display = "block";
}

document.querySelector("body").addEventListener("click", handleBodyClick);

function handleBodyClick(e) {
    if(e.target.tagName!="BUTTON")
    if (e.target == cartSpan || cartDiv.style.display === "block" && !cartDiv.contains(e.target)) {
        showHide();
    }
};
