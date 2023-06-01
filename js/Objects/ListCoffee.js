function ListCoffee() {
    this.listCf = [
        {
            "id": 1,
            "name": "Espresso",
            "image": "../../images/sale1.png",
            "title": "Short and strong coffee",
            "rate": 4,
            "order": 1042,
            "price": 15.99,
            "description": "Espresso is a concentrated form of coffee that is brewed by forcing hot water under high pressure through finely ground coffee beans."
        },
        {
            "id": 2,
            "name": "Latte",
            "image": "../../images/sale2.webp",
            "title": "Coffee with steamed milk",
            "rate": 5,
            "order": 1230,
            "price": 16.19,
            "description": "Latte is a coffee drink made with espresso and steamed milk. \nIt is typically topped with a layer of milk foam."
        },
        {
            "id": 3,
            "name": "Cappuccino",
            "image": "../../images/sale3.png",
            "title": "Coffee with equal parts of espresso, steamed milk, and milk foam",
            "rate": 4.2,
            "order": 1190,
            "price": 19.99,
            "description": "Cappuccino is a coffee drink that is made with equal parts of espresso, steamed milk, and milk foam.\n It is typically served in a small cup."
        },
        {
            "id": 4,
            "name": "Americano",
            "image": "../../images/sale4.jpg",
            "title": "Espresso diluted with hot water",
            "rate": 3.8,
            "order": 3819,
            "price": 22.79,
            "description": "Americano is a coffee drink made by diluting an espresso shot with hot water.\n It is similar to drip coffee but has a different taste due to the use of espresso as a base."
        },
        {
            "id": 5,
            "name": "Mocha",
            "image": "../../images/sale5.webp",
            "title": "Espresso with chocolate syrup and steamed milk",
            "rate": 4,
            "order": 2451,
            "price": 24.69,
            "description": "Mocha is a coffee drink made with espresso, chocolate syrup, and steamed milk.\n It is typically topped with whipped cream and chocolate shavings."
        },
        {
            "id": 6,
            "name": "Macchiato",
            "image": "../../images/sale7.jpg",
            "title": "Espresso with a dollop of steamed milk",
            "rate": 4,
            "order": 5831,
            "price": 25.99,
            "description": "Macchiato is a coffee drink made with a shot of espresso and a dollop of steamed milk.\n It is similar to a latte, but with a stronger coffee flavor."
        },
        {
            "id": 7,
            "name": "Iced Coffee",
            "image": "../../images/ca-phe-sua-da-2.jpg",
            "title": "Chilled coffee served over ice",
            "rate": 4,
            "order": 1221,
            "price": 2.99,
            "description": "Iced coffee is a coffee drink that is served chilled over ice.\n It can be made with regular drip coffee or espresso, and is typically sweetened with sugar or a flavored syrup."
        },
        {
            "id": 8,
            "name": "Affogato",
            "image": "../../images/cotardo2.jpg",
            "title": "Espresso poured over a scoop of ice cream",
            "rate": 5,
            "order": 2390,
            "price": 1.99,
            "description": "Affogato is a dessert coffee made with a shot of espresso poured over a scoop of vanilla ice cream.\n It is typically served in a small bowl or glass."
        },
        {
            "id": 9,
            "name": "Flat White",
            "image": "../../images/Raf-2.jpg",
            "title": "Coffee with a double shot of espresso and steamed milk",
            "rate": 5,
            "order": 5210,
            "price": 3.99,
            "description": "Flat white is a coffee drink made with a double shot of espresso and steamed milk. \nIt is similar to a latte, but with a stronger coffee flavor and less milk foam."
        },
        {
            "id": 10,
            "name": "Turkish Coffee",
            "image": "../../images/slide1.webp",
            "title": "Strong coffee brewed in a pot and served unfiltered",
            "rate": 5,
            "order": 3190,
            "price": 1.99,
            "description": "Turkish coffee is a coffee drink that is brewed in a pot and served unfiltered. \nIt is a stronger coffee flavor"
        },
        {
            "id": 11,
            "name": "Iced Coffee",
            "image": "../../images/red-eyes.webp",
            "title": "Chilled coffee served over ice",
            "rate": 4,
            "order": 1221,
            "price": 2.99,
            "description": "Iced coffee is a coffee drink that is served chilled over ice. \nIt can be made with regular drip coffee or espresso, and is typically sweetened with sugar or a flavored syrup."
        },
        {
            "id": 12,
            "name": "Affogato",
            "image": "../../images/machiato2.jpg",
            "title": "Espresso poured over a scoop of ice cream",
            "rate": 5,
            "order": 2390,
            "price": 4.99,
            "description": "Affogato is a dessert coffee made with a shot of espresso poured over a scoop of vanilla ice cream. \nIt is typically served in a small bowl or glass."
        }
    ];
    this.AddCoffee = function (newCoffee) {
        this.listCf.push(newCoffee)
    }
    this.DeleteCoffee = function (CfId) {
        for (let i = 0; i < this.listCf.length; i++) {
            if (CfId == this.listCf[i].id) {
                this.listCf.splice(i, 1);
            }
        }

    }
    this.EditCoffeeInList = function (coffee) {
        for (let i = 0; i < this.listCf.length; i++) {
            console.log("length: " + this.listCf.length);
            let coffeeNeedEdit = this.listCf[i];
            if (coffee.id == coffeeNeedEdit.id) {
                coffeeNeedEdit.name = coffee.name;
                coffeeNeedEdit.image = coffee.image;
                coffeeNeedEdit.title = coffee.title;
                coffeeNeedEdit.rate = coffee.rate;
                coffeeNeedEdit.order = coffee.order;
                coffeeNeedEdit.price = coffee.price;
                coffeeNeedEdit.description = coffee.description;
            }
        }
    }

    this.FindById = function (cfId) {
        for (let i = 0; i < this.listCf.length; i++) {
            if (cfId == this.listCf[i].id) {
                return this.listCf[i]
            }
        }
        return null;
    }

    this.SearchCoffee = function (keyword) {
        let listSearch = new ListCoffee();
        listSearch.listCf = [];
        let newKey = keyword.trim().toLowerCase()
        for (var i = 0; i < this.listCf.length; i++) {
            var coffee = this.listCf[i];
            if (coffee.name.trim().toLowerCase().search(newKey) != -1) {
                listSearch.listCf.push(coffee);
            } else if (coffee.title.trim().toLowerCase().search(newKey) != -1) {
                listSearch.listCf.push(coffee);
            } else if (parseInt(coffee.price) == parseInt(keyword)) {
                listSearch.listCf.push(coffee);
            }

        }
        return listSearch
    }

    this.listInCart = [];
    this.AddToCart = function (coffeeToAdd) {
        this.listInCart.push(coffeeToAdd);
    }
    this.DeleteOrder = function (No) {
        this.listInCart.splice(No, 1);
    }
    this.listOrdered = [];
    this.ChangeToOrdered = function () {
        this.listOrdered = this.listInCart;
        this.listInCart = [];
    }

}



