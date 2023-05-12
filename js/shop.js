var listCoffee = new ListCoffee();
var validation = new Validation();
var productionType = [
    {
        "title": "ORGANIC COFFEE",
        "image": "./images/oganic-coffe.webp",
        "content": "Organic coffee beans are often considered to have a richer, more complex flavor profile than conventionally grown coffee beans. \nThanks to the fact that they are grown in nutrient-rich soil and are able to develop their full flavor potential without the interference of chemical additives."
    },
    {
        "title": "FLAVOR COFFEE",
        "image": "./images/image-2.jpg",
        "content": "Organic coffee beans are often considered to have a richer, more complex flavor profile than conventionally grown coffee beans. \nThanks to the fact that they are grown in nutrient-rich soil and are able to develop their full flavor potential without the interference of chemical additives."
    }

]
RenderProductSection();
RenderCart()
if (localStorage.getItem("coffeeInCart") != null) {
    listCoffee = getCartListInStorage();
}


function RenderProductSection() {
    if (localStorage.getItem("coffeeList") == null) {
        RenderCoffeeData(productionType, listCoffee);
    } else {
        getCfListInStorage()
    };
}

function RenderCart() {
    if (localStorage.getItem("coffeeInCart") != null) {
        getCartListInStorage();
    }
}



var coffeeOder = new Coffee();
Coffee.prototype.size = 'Medium';
Coffee.prototype.topping = [];
Coffee.prototype.quantity = '';
// Coffee.prototype.payment = '';
Coffee.prototype.calculatePayment = function () {
    switch (this.size) {
        case 'Small':
            this.payment = this.quantity * (this.price + this.topping.length * 0.5 + 0.5);
            break;
        case 'Medium':
            this.payment = this.quantity * (this.price + this.topping.length * 0.5 + 1);
            break;
        case 'Big':
            this.payment = this.quantity * (this.price + this.topping.length * 0.5 + 1.5);

            break;
    }
};


function DOM_ID(id) {
    return document.getElementById(id)
}
function qSelector(attribute) {
    return document.querySelectorAll(attribute)
}

function renderCartTable() {
    listCoffee = getCartListInStorage();
    openTable();
    var tbody = DOM_ID("cart-tbody");
    var totalElement = DOM_ID("total-payment");
    tbody.innerHTML = '';
    var totalPayment = calculateTotalPayment(listCoffee);
    var tbodyContent = '';

    for (let i = 0; i < listCoffee.listInCart.length; i++) {
        var coffee = listCoffee.listCf[i];
        tbodyContent += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${coffee.id}</td>
                    <td>${coffee.name}</td>
                    <td>
               
                    <div >
                        <input type="radio" id="small" name="cf-size" value="Small" class="radio-option">
                        <label for="small">
                            <p class="my-button radio-btn">Small</p>
                        </label>
                    </div>
                    <div >
                        <input type="radio" id="medium" name="cf-size" value="Medium" class="radio-option">
                        <label for="medium">
                            <p class="my-button radio-btn active">Medium</p>
                        </label>
                    </div>
                    <div >
                        <input type="radio" id="big" name="cf-size" value="Big" class="radio-option">
                        <label for="big">
                            <p class="my-button radio-btn" class="">Big</p>
                        </label>
                    </div>
            
                    </td>
                    
                    <td>
                        <div class="topping-grid">
                            <div>
                                <input type="checkbox" id="topping1" name="topping1" value="topping1"
                                    class="topping-option">
                                <label for="topping1">
                                    <p class="my-button topping-btn" class="">Lorem psum1</p>
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="topping2" name="topping2" value="topping2"
                                    class="topping-option">
                                <label for="topping2">
                                    <p class="my-button topping-btn" class="">Lorem psum2</p>
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" id="topping3" name="topping3" value="topping3"
                                    class="topping-option">
                                <label for="topping3">
                                    <p class="my-button topping-btn" class="">Lorem psum3</p>
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="topping4" name="topping4" value="topping4"
                                    class="topping-option">
                                <label for="topping4">
                                    <p class="my-button topping-btn" class="">Lorem psum4</p>
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="topping5" name="topping5" value="topping5"
                                    class="topping-option">
                                <label for="topping5">
                                    <p class="my-button topping-btn" class="">Lorem psum5</p>
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="topping6" name="topping6" value="topping6"
                                    class="topping-option">
                                <label for="topping6">
                                    <p class="my-button topping-btn" class="">Lorem psum6</p>
                                </label>
                            </div>

                        </div>

                    </td>
                    <td> <input type="number" min="1" max="1000" value="${coffee.quantity}" style="text-align: right;" id="quantity">
                    </td>
                    <td><span id="table-payment">${coffee.payment}</span>$</td>
                </tr>
        `

    }

    tbody.innerHTML = tbodyContent;
    totalElement.innerHTML = totalPayment;
}

function addToCart(cfId) {
    var coffeeCalled = listCoffee.FindById(cfId);

    coffeeCalled.size = getSize();

    coffeeCalled.topping = getTopping();
    coffeeCalled.quantity = DOM_ID("quantity").value;

    var coffeeToCart = new Coffee(coffeeCalled.id, coffeeCalled.name, coffeeCalled.image, coffeeCalled.title, coffeeCalled.rate, coffeeCalled.order, coffeeCalled.price, coffeeCalled.description)
    coffeeToCart.size = coffeeCalled.size;
    coffeeToCart.topping = coffeeCalled.topping;
    coffeeToCart.quantity = coffeeCalled.quantity;
    // coffeeToCart.calculatePayment();
    coffeeToCart.payment = calculateTotal(coffeeToCart.size, coffeeToCart.topping, coffeeToCart.quantity, coffeeToCart.price);

    //validate
    var error = 0;
    if (validation.CheckBoundary("quantity") == true) {
        error++;
    }
    if (error != 0) {
        return
    }


    listCoffee.AddToCart(coffeeToCart);

    showCart(listCoffee)
    closeModal();
    setStorage();

}

function calculateTotalPayment(listCoffee) {
    let sum = 0;
    for (let i = 0; i < listCoffee.listInCart.length; i++) {
        sum += listCoffee.listInCart[i].payment;
    }
    return sum;
}

function showCart(listCoffee) {
    let items = listCoffee.listInCart.length;
    let sum = calculateTotalPayment(listCoffee);
    DOM_ID("cart-number").innerHTML = items;
    DOM_ID("cart-money").innerHTML = sum;

}

function getSize() {
    var sizeItems = document.querySelectorAll('.radio-btn');
    var selectedSize = '';
    for (var i = 0; i < sizeItems.length; i++) {
        if (sizeItems[i].classList.contains('active')) {
            selectedSize = sizeItems[i].innerHTML;
        }
    }
    return selectedSize;
}

function getTopping() {
    var toppingItems = document.querySelectorAll('.topping-btn');
    var selectedToppings = [];
    for (var i = 0; i < toppingItems.length; i++) {
        if (toppingItems[i].classList.contains('active')) {
            var toppingInput = document.querySelector('input[id="' + toppingItems[i].parentNode.getAttribute('for') + '"]');
            if (toppingInput) {
                selectedToppings.push(toppingInput.value);
            }
        }
    }
    return selectedToppings;
}
function setStorage() {
    var jsonCoffeeData = JSON.stringify(listCoffee.listInCart);
    localStorage.setItem("coffeeInCart", jsonCoffeeData);
}



function getTotal() {
    let size = getSize();
    let topping = getTopping();
    let quantity = DOM_ID("quantity").value;
    let price = document.querySelector(".coffee-price").innerHTML;

    let total = calculateTotal(size, topping, quantity, price);
    DOM_ID("total").innerHTML = total;
}


function showTotal() {

    getTotal();

    var sizeItems = qSelector('input[name="cf-size"]');
    sizeItems.forEach(function (radio) {
        radio.addEventListener("change", function () {
            getTotal();
        });
    });

    var toppingCheckboxes = qSelector('input[name^="topping"]');
    toppingCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            getTotal();
        });
    });

    var quantityInput = DOM_ID("quantity");
    quantityInput.addEventListener("input", function () {
        getTotal();
    });
}


function calculateTotal(size, topping, quantity, price) {
    let total;
    switch (size) {
        case 'Small':
            total = quantity * ((parseInt(price)) + (topping.length * 0.5) + 0.5);
            break;
        case 'Medium':
            total = quantity * ((parseInt(price)) + (topping.length * 0.5) + 1);
            break;
        case 'Big':
            total = quantity * ((parseInt(price)) + (topping.length * 0.5) + 1.5);
            break;
    }
    return total;
};

function getCfListInStorage() {
    var coffeeData = localStorage.getItem("coffeeList");
    listCoffee.listCf = JSON.parse(coffeeData);
    RenderCoffeeData(productionType, listCoffee);
}
function getCartListInStorage() {
    var coffeeInCart = localStorage.getItem("coffeeInCart");
    listCoffee.listInCart = JSON.parse(coffeeInCart);
    showCart(listCoffee);
    return listCoffee;
}

function setStorage() {
    var jsonCoffeeInCart = JSON.stringify(listCoffee.listInCart);
    localStorage.setItem("coffeeInCart", jsonCoffeeInCart);
}
function RenderCoffeeData(productionType, listCoffee) {
    var divContent = DOM_ID("pro-cont");
    divContent.innerHTML = '';
    var content = createDivItem(productionType, listCoffee)

    divContent.innerHTML = content;
}

function createStar(start) {
    let startItem = '';
    for (let i = 0; i < start; i++) {
        startItem += `<i class="fa fa-star"></i>`
    }
    return startItem;
}

function createDivItem(productionType, listCoffee) {
    var divItems = '';

    for (let i = 0; i < listCoffee.listCf.length; i++) {
        const des = listCoffee.listCf[i].description.replace(/\n/g, '<br> <br>')
        var coffee = listCoffee.listCf[i];
        var newTitle = truncateString(listCoffee.listCf[i].title, 32)
        var newDescription = truncateString(des, 150)
        if (i == 0) {
            divItems += createDivBanner(productionType, 0)
        }
        if (i == 6) {
            divItems += createDivBanner(productionType, 1)
        }
        divItems += `
            <div class="pro-item">
            <div class="pro-img">
                <img src="${coffee.image}" alt="${coffee.name}">
                <div class="pro-item-overlay animate__animated animate__fadeIn">
                    <h3>${coffee.name}</h3>
                    <p>${newDescription}</p>
                </div>
            </div>
    
            <div class="pro-body">
                <div class="pro-title">
                    <p>${coffee.name}</p>
                </div>
                <div class="pro-text pt-10">
                    <p>${newTitle}</p>
                </div>
                <div class="pro-start pt-10">
                    ${createStar(coffee.rate)}
                    <span>(${coffee.order})</span>
                </div>
                <div class="pro-price pt-10">
                    <span>$</span>
                    <span id="pro-price">${coffee.price}</span>
                </div>
                <button class="my-button" onclick="buyCoffee(${coffee.id})">Buy now</button>
            </div>
    
        </div>
               `;
    }
    return divItems;
}
function createDivBanner(productionType, item) {
    const content = productionType[item].content.replace(/\n/g, '<br> <br>')
    return `
            <div class="pro-banner">
                <img src="${productionType[item].image}" alt="${productionType[item].title}">
                <div class="pro-overlay animate__animated animate__fadeInUp">
                    <h3>${productionType[item].title}</h3>
                    <p>${content}</p>
                </div>
            </div>`;
}

function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}

function buyCoffee(id) {
    openModal()
    let coffeeToBuy = listCoffee.FindById(id)
    let modalElement = `
    <span class="close" onclick="closeModal()">&times;</span>
    <div id="modal-buy-cf" class="d-flex">
        <div class="modal-cf-img">
            <img src="${coffeeToBuy.image}" alt="${coffeeToBuy.name}">
            <p class="pt-20" style="width:90%;line-height:25px">${coffeeToBuy.description}</p>
        </div>

        <div class="modal-cf-content">
            <h3 class="coffee-name">${coffeeToBuy.name}</h3>
            <h3><span class="coffee-price">${coffeeToBuy.price}</span> <span style="color: #d7084d"> $</span></h3>
            <!-- option form  -->
            <form action="#" class="buy-coffee-form">
                <div class="size">
                    <h4>Please select your favorite size:</h4>
                    <div class="d-flex">
                        <div class="pr-30">
                            <input type="radio" id="small" name="cf-size" value="Small" class="radio-option">
                            <label for="small">
                                <p class="my-button radio-btn">Small</p>
                            </label>
                        </div>
                        <div class="pr-30">
                            <input type="radio" id="medium" name="cf-size" value="Medium" class="radio-option"
                                checked="checked">
                            <label for="medium">
                                <p class="my-button radio-btn active">Medium</p>
                            </label>
                        </div>
                        <div class="pr-30">
                            <input type="radio" id="big" name="cf-size" value="Big" class="radio-option">
                            <label for="big">
                                <p class="my-button radio-btn" class="">Big</p>
                            </label>
                        </div>
                    </div>

                </div>

                <div class="topping">

                    <h4>Please select your topping:</h4>
                    <div class="topping-grid">
                        <div>
                            <input type="checkbox" id="topping1" name="topping1" value="topping1"
                                class="topping-option">
                            <label for="topping1">
                                <p class="my-button topping-btn" class="">Lorem psum1</p>
                            </label>
                        </div>

                        <div>
                            <input type="checkbox" id="topping2" name="topping2" value="topping2"
                                class="topping-option">
                            <label for="topping2">
                                <p class="my-button topping-btn" class="">Lorem psum2</p>
                            </label>
                        </div>


                        <div>
                            <input type="checkbox" id="topping3" name="topping3" value="topping3"
                                class="topping-option">
                            <label for="topping3">
                                <p class="my-button topping-btn" class="">Lorem psum3</p>
                            </label>
                        </div>

                        <div>
                            <input type="checkbox" id="topping4" name="topping4" value="topping4"
                                class="topping-option">
                            <label for="topping4">
                                <p class="my-button topping-btn" class="">Lorem psum4</p>
                            </label>
                        </div>

                        <div>
                            <input type="checkbox" id="topping5" name="topping5" value="topping5"
                                class="topping-option">
                            <label for="topping5">
                                <p class="my-button topping-btn" class="">Lorem psum5</p>
                            </label>
                        </div>

                        <div>
                            <input type="checkbox" id="topping6" name="topping6" value="topping6"
                                class="topping-option">
                            <label for="topping6">
                                <p class="my-button topping-btn" class="">Lorem psum6</p>
                            </label>
                        </div>

                    </div>
                </div>
                <div class="d-flex" style="justify-content: space-between">
                    <div class="quantity">
                        <h4>Please enter quantity</h4>
                        <input type="number" min="1" max="1000" value="1" style="text-align: right;" id="quantity">
                    </div>
                    <div>
                        <p class="total">Total: <span id="total">${coffeeToBuy.price + 0.5}</span>$</p>
                    </div>
                </div>


               

                <div class="add-to-cart">
                    <input id="add-to-cart-btn" type="button" value="Add to cart" class="my-button add-to-cart-btn"
                        onclick="addToCart(${coffeeToBuy.id})">
                </div>

            </form>
        </div>
    </div>
    `
    DOM_ID("my-modal").innerHTML = modalElement;
    activeSize();
    activeTopping();
    showTotal();
}

function activeSize() {
    var sizeItem = qSelector('.radio-btn')
    for (var i = 0; i < sizeItem.length; i++) {
        sizeItem[i].addEventListener('click', function () {
            for (var j = 0; j < sizeItem.length; j++) {
                sizeItem[j].classList.remove('active');
            }
            this.classList.add('active');

        });
    }
}

function activeTopping() {
    const toppings = qSelector('.topping-btn');

    toppings.forEach((topping) => {
        topping.addEventListener('click', () => {
            topping.classList.toggle('active');
        });
    });
}

function openModal() {
    DOM_ID("my-modal").style.display = 'block';
}

function closeModal() {
    DOM_ID("my-modal").style.display = 'none';
}

function closeTable() {
    DOM_ID("table-container").style.display = 'none';
}
function openTable() {
    DOM_ID("table-container").style.display = 'block';
}