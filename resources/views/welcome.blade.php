<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>postgreSQL</title>
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <header>postgreSQL</header>
    <main>
        <form action="../process_form.php" method="POST" id="myForm">

            <div class="operations">
                <label for="menu">Choose the operation:</label>
                <select id="menu" name="operation">
                    <option value="insert">insert</option>
                    <option value="select">select</option>
                    <option value="update">update</option>
                    <option value="delete">delete</option>
                </select>
            </div>

            <div class="text">
                <input name="id" type="text" id="id" placeholder="ID">
                <input name="name" type="text" id="name" placeholder="Name">
                <input name="address" type="text" id="address" placeholder="Address">
            </div>

            <div class="update">
                <input name="new-name" type="text" id="new-name" placeholder="New Name">
                <input name="new-address" type="text" id="new-address" placeholder="New Address">
            </div>

            <select id="cities" name="address">
            </select>

            <input type="submit" value="Submit">
        </form>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>

    </main>

    <script src="app.js"></script>
</body>

</html>