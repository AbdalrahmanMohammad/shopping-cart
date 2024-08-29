<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart</title>
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <header>
        <span>orders</span>
        <span>shopping cart</span>
        <span>cart</span>
    </header>
    <div class="items">
    </div>
    <div class="add-item">
        <button>Add new item</button>
    </div>
    <div class="new-item">
        <div class="title">Add new item</div>
        <input type="text" id="item-name" placeholder="Name">
        <input type="number" id="item-price" placeholder="Price">
        <button id="add-the-item">Add</button>
    </div>
    <div class="cart">
    </div>
    <div class="orders"></div>

    <script src="app.js"></script>
</body>

</html>