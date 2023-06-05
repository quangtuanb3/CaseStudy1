var menuItems = document.querySelectorAll('div ul li a');
var section = document.querySelectorAll('section')

for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', function () {
        for (var j = 0; j < menuItems.length; j++) {
            menuItems[j].classList.remove('active');
        }
        this.classList.add('active');

    });
}


function setMemory() {
    let user = JSON.parse(localStorage.getItem("User"));
    if (!memory.isExist(user)) {
        memory.addNewUser(user);
    } else {
        localStorage.setItem("memory", JSON.stringify(memory));
    }

}
function logout() {
    localStorage.removeItem('User');
    window.location.href = './index.html';
}
var listCoffee = new ListCoffee();
var validate = new Validate();
var order = new Order();
var listOrder = new ListOrder();
var productionType = [
    {
        "title": "ORGANIC COFFEE",
        "image": "../../images/oganic-coffe.webp",
        "content": "Organic coffee beans are often considered to have a richer, more complex flavor profile than conventionally grown coffee beans. \nThanks to the fact that they are grown in nutrient-rich soil and are able to develop their full flavor potential without the interference of chemical additives."
    },
    {
        "title": "FLAVOR COFFEE",
        "image": "../../images/image-2.jpg",
        "content": "Organic coffee beans are often considered to have a richer, more complex flavor profile than conventionally grown coffee beans. \nThanks to the fact that they are grown in nutrient-rich soil and are able to develop their full flavor potential without the interference of chemical additives."
    }

]

let user = getMemory();
let memory = new Memory();
let coffeeOder = new Coffee();
let listUser = new ListUser();
Coffee.prototype.size = 'Medium';
Coffee.prototype.topping = [];
Coffee.prototype.quantity = '';
Coffee.prototype.ordered = false;
Coffee.prototype.calculatePayment = calculateTotal(this.size, this.topping, this.quantity, this.price);

function checkLogin() {
    if (localStorage.getItem("User") == null) {
        window.location.href = './index.html';
    }
}




if (localStorage.getItem("coffeeInCart") != null) {
    listCoffee = getCartListInStorage();
}

function RenderProductSection() {
    if (localStorage.getItem("coffeeList") == null) {
        RenderCoffeeData(productionType, listCoffee);
    } else {
        listCoffee = getCfListInStorage();
        RenderCoffeeData(productionType, listCoffee);
    };
}

function searchCoffee() {
    keyword = DOM_ID('keyword').value;
    listCfSearched = listCoffee.SearchCoffee(keyword)
    RenderCoffeeData(productionType, listCfSearched);
    DOM_ID("product").scrollIntoView({ behavior: 'smooth' });
    if (listCfSearched.listCf.length == 0) {
        DOM_ID("notFound").style.display = 'block';
    } else {
        DOM_ID("notFound").style.display = 'none';
    }
}

function DOM_ID(id) {
    return document.getElementById(id)
}
function qSelector(attribute) {
    return document.querySelectorAll(attribute)
}


function renderCartTable() {
    user = getMemory();
    openTable();
    let tbody = DOM_ID("cart-tbody");
    let totalElement = DOM_ID("payment-cart");
    tbody.innerHTML = '';
    let totalPayment = calculateTotalPayment(user);

    let tbodyContent = '';
    if (user.listInCart.length == 0) {
        tbodyContent = `
        <tr>
        <td colspan="8">Please select coffee first</td>
    </tr>
        `
    }
    for (let i = 0; i < user.listInCart.length; i++) {
        let coffee = user.listInCart[i];

        tbodyContent +=
            `
                    <tr>
                        <td>${i + 1}</td>

                        <td>${coffee.id}</td>

                        <td>${coffee.name}</td>

                        <td> ${coffee.size}</td>
    
                        <td> ${coffee.topping.map(topping => `<span class='toppingItems'>${topping}</span>`).join(', ')}</td >

                        <td> ${coffee.quantity}</td>
    
                        <td><span id="cf-${i}-payment">${coffee.payment}</span>$</td>
   
                        <td> <button class="edit-btn" onclick="editOrder(${i})" ><i class="fa fa-pen" style="color:orange;"></i></button>
                                <button class="delete-btn" onclick="confirmRemoveOrder(${i})" ><i class="fa fa-trash"></i></button></td>
                    </tr >
                `
    }

    tbody.innerHTML = tbodyContent;
    totalElement.innerHTML = totalPayment;
    renderRecentProduct()
}
function renderRecentProduct() {
    user = getMemory();
    let divRecent = DOM_ID("recent-order");
    divRecent.innerHTML = '';
    let tableHead = `
    <table>
    <caption><h3 style='padding: 10px';>Recent Order</h3></caption>
    <thead>
        <tr>
            <th> No.</th>
            <th> Name </th>
            <th> Comment </th>
            <th>Total Payment</th>
        </tr>
    </thead>
    <tbody id="recent-order-tbody">`
    let tableFoot = `   </tbody>
    </table>`
    let tableBody = '';
    user.listOrder.map((order, index) => {
        tableBody += `
        <tr>
        <td> ${index + 1}</td>
        <td> ${order.cfName.toString()} </td>
        <td> ${order.comment} </td>
        <td>${order.cfPayment}$</td>
    </tr>
        `
    })

    divRecent.innerHTML = tableHead + tableBody + tableFoot;
}

function saveOrder(No) {
    user.listInCart[No] = listCoffee.listInCart[No]
    user.listInCart[No].size = getSize();
    user.listInCart[No].topping = getTopping();
    user.listInCart[No].quantity = Number(DOM_ID("quantity").value);
    user.listInCart[No].payment = calculateTotal(user.listInCart[No].size, user.listInCart[No].topping, user.listInCart[No].quantity, Number(user.listInCart[No].price));
    //validate
    if (validate.CheckBoundary("quantity", "error-quantity")) { return; }
    saveToMemory(user);
    showCart();
    closeModal();
    openTable();
    renderCartTable();

};
function addToCart(cfId) {
    user = getMemory();

    listCoffee.listInCart = user.listInCart;
    let coffeeCalled = listCoffee.FindById(cfId);

    coffeeCalled.size = getSize();
    coffeeCalled.topping = getTopping();
    coffeeCalled.quantity = Number(DOM_ID("quantity").value);

    let coffeeToCart = new Coffee(coffeeCalled.id, coffeeCalled.name, coffeeCalled.image, coffeeCalled.title, coffeeCalled.rate, coffeeCalled.order, coffeeCalled.price, coffeeCalled.description)
    coffeeToCart.size = coffeeCalled.size;
    coffeeToCart.topping = coffeeCalled.topping;
    coffeeToCart.quantity = coffeeCalled.quantity;
    coffeeToCart.ordered = false;
    coffeeToCart.payment = calculateTotal(coffeeToCart.size, coffeeToCart.topping, coffeeToCart.quantity, coffeeToCart.price);

    //validate
    if (validate.CheckBoundary("quantity", "error-quantity")) {
        return
    }

    listCoffee.AddToCart(coffeeToCart);
    user.listInCart = listCoffee.listInCart;
    saveToMemory(user);
    showCart()
    closeModal();
}

function calculateTotalPayment(user) {
    let sum = 0;
    for (let i = 0; i < user.listInCart.length; i++) {
        sum += parseFloat(user.listInCart[i].payment);
    }

    return parseFloat(sum).toFixed(2);
}

function showCart() {
    user = getMemory();
    if (user.listInCart != undefined) {
        let items = user.listInCart.length;
        let sum = calculateTotalPayment(user);
        DOM_ID("cart-number").innerHTML = items;
        DOM_ID("cart-money").innerHTML = sum;
    }

}

function getSize() {
    let sizeItems = document.querySelectorAll('.radio-btn');
    let selectedSize = '';
    for (let i = 0; i < sizeItems.length; i++) {
        if (sizeItems[i].classList.contains('active')) {
            selectedSize = sizeItems[i].innerHTML;
        }
    }
    return selectedSize;
}

function getTopping() {
    let toppingItems = document.querySelectorAll('.topping-btn');
    let selectedToppings = [];
    for (let i = 0; i < toppingItems.length; i++) {
        if (toppingItems[i].classList.contains('active')) {
            let toppingInput = document.querySelector('input[id="' + toppingItems[i].parentNode.getAttribute('for') + '"]');
            if (toppingInput) {
                selectedToppings.push(toppingInput.value);
            }
        }
    }
    return selectedToppings;
}

function getTotal(eleId) {
    let size = getSize();
    let topping = getTopping();
    let quantity = DOM_ID("quantity").value;
    let price = parseFloat(document.querySelector(".coffee-price").innerHTML);

    let total = calculateTotal(size, topping, quantity, price);

    DOM_ID(eleId).innerHTML = total;
}

function showTotalBuy(eleId) {

    getTotal(eleId);

    let sizeItems = qSelector('input[name="cf-size"]');
    sizeItems.forEach(function (radio) {
        radio.addEventListener("click", function () {
            getTotal(eleId);
        });
    });

    let toppingCheckboxes = qSelector('input[name^="topping"]');
    toppingCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("click", function () {
            getTotal(eleId);
        });
    });

    let quantityInput = DOM_ID("quantity");
    quantityInput.addEventListener("click", function () {
        getTotal(eleId);
    });
}

function calculateTotal(size, topping, quantity, price) {
    let total;


    switch (size) {
        case 'Small':
            total = quantity * (((price)) + (topping.length * 0.5));
            break;
        case 'Medium':
            total = quantity * (((price)) + (topping.length * 0.5) + 1);
            break;
        case 'Big':
            total = quantity * (((price)) + (topping.length * 0.5) + 1.5);
            break;
    }

    if (total != undefined) {
        return total.toFixed(2);
    }

};

function getCfListInStorage() {
    let coffeeData = localStorage.getItem("coffeeList");
    listCoffee.listCf = JSON.parse(coffeeData);
    return listCoffee;
}

function getCartListInStorage() {
    let user = getMemory();
    listCoffee.listInCart = user.listInCart;
    return listCoffee;
}

// function setStorage(user) {
//     let jsonUser = JSON.stringify(user);
//     localStorage.setItem("User", jsonUser);
// }
function getUserInStorage() {
    let user = JSON.parse(localStorage.getItem("User"));
    return user;
}

function getMemory() {
    let result = {};
    let user = JSON.parse(localStorage.getItem("User"));
    let memory = JSON.parse(localStorage.getItem("userList"));
    if (memory && user && memory.find(obj => obj.email === user.email)) {
        let foundObj = memory.find(obj => obj.email === user.email);
        result = foundObj;
    }
    return result;
}

function saveToMemory(user) {
    let memory = new Memory();
    memory.userList = JSON.parse(localStorage.getItem("userList"));
    memory.overrideUser(user);
    localStorage.setItem("userList", JSON.stringify(memory.userList));
}

function setOrderToStorage(cfOrder) {
    if (localStorage.getItem("orderedCoffee") == null) {
        localStorage.setItem("orderedCoffee", JSON.stringify(listOrder.listCfOrder));
    } else {
        let listOrder = new ListOrder();
        listOrder.listCfOrder = JSON.parse(localStorage.getItem("orderedCoffee"));
        listOrder.listCfOrder.push(cfOrder);
        localStorage.setItem("orderedCoffee", JSON.stringify(listOrder.listCfOrder));
    }
}


function RenderCoffeeData(productionType, listCoffee) {
    let divContent = DOM_ID("pro-cont");
    divContent.innerHTML = '';
    let content = createDivItem(productionType, listCoffee)
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
    let divItems = '';
    for (let i = 0; i < listCoffee.listCf.length; i++) {
        const des = listCoffee.listCf[i].description.replace(/\n/g, '<br> <br>')
        let coffee = listCoffee.listCf[i];
        let newTitle = truncateString(listCoffee.listCf[i].title, 32)
        let newDescription = truncateString(des, 150)
        if (i == 0) {
            divItems += createDivBanner(productionType, 0)
        }
        if (i == 6) {
            divItems += createDivBanner(productionType, 1)
        }
        divItems += `
            <div class="pro-item">
            <div class="pro-img">
                <img src="${coffee.image}" alt="${coffee.name}" onclick="buyCoffee(${coffee.id})">
                <div class="pro-item-overlay animate__animated animate__fadeIn" onclick="buyCoffee(${coffee.id})">
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
                    <span style='font-weight: 500;'>(<span class="old-price">${(coffee.price * 1.2).toFixed(2)}$</span>)</span>
                    <span class="new-price" style="color:red;letter-spacing:1px;">${coffee.price}</span>
                    <span style="color:red;">$</span>
                </div>
                <button class="my-button" onclick="buyCoffee(${coffee.id})" value="buyCoffee">Buy now</button>
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
    let coffeeToBuy = listCoffee.FindById(id);

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
                        <input type="checkbox" id="topping1" name="topping1" value="topping1" class="topping-option">
                        <label for="topping1">
                            <p class="my-button topping-btn" class="">Topping 1</p>
                        </label>
                    </div>

                    <div>
                        <input type="checkbox" id="topping2" name="topping2" value="topping2" class="topping-option">
                        <label for="topping2">
                            <p class="my-button topping-btn" class="">Topping 2</p>
                        </label>
                    </div>

                    <div>
                        <input type="checkbox" id="topping3" name="topping3" value="topping3" class="topping-option">
                        <label for="topping3">
                            <p class="my-button topping-btn" class="">Topping 3</p>
                        </label>
                    </div>

                    <div>
                        <input type="checkbox" id="topping4" name="topping4" value="topping4" class="topping-option">
                        <label for="topping4">
                            <p class="my-button topping-btn" class="">Topping 4</p>
                        </label>
                    </div>

                    <div>
                        <input type="checkbox" id="topping5" name="topping5" value="topping5" class="topping-option">
                        <label for="topping5">
                            <p class="my-button topping-btn" class="">Topping 5</p>
                        </label>
                    </div>

                    <div>
                        <input type="checkbox" id="topping6" name="topping6" value="topping6" class="topping-option">
                        <label for="topping6">
                            <p class="my-button topping-btn" class="">Topping 6</p>
                        </label>
                    </div>

                </div>
            </div>
            <div class="d-flex" style="justify-content: space-between">
                <div class="quantity">
                    <h4>Please enter quantity</h4>
                    <input type="number" min="1" max="1000" value="1" style="text-align: right;" id="quantity">
                    <span id='error-quantity'>*Invalid quantity</span>
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
    showTotalBuy("total");
}

function editOrder(No) {
    OpenModalEditCoffee(No)
}

function OpenModalEditCoffee(No) {
    closeTable();
    openModal();
    let listCoffee = getCartListInStorage();
    let coffeeToEdit = listCoffee.listInCart[No];
    let size = coffeeToEdit.size;
    let quantity = coffeeToEdit.quantity;
    let topping = coffeeToEdit.topping;
    let modalElement = `
    <span class="close" onclick="closeModal()">&times;</span>
    <div id="modal-buy-cf" class="d-flex">
        <div class="modal-cf-img">
            <img src="${coffeeToEdit.image}" alt="${coffeeToEdit.name}">
            <p class="pt-20" style="width:90%;line-height:25px">${coffeeToEdit.description}</p>
        </div>

        <div class="modal-cf-content">
            <h3 class="coffee-name">${coffeeToEdit.name}</h3>
            <h3><span class="coffee-price">${coffeeToEdit.price}</span> <span style="color: #d7084d"> $</span></h3>
            <!-- option form  -->
            <form action="#" class="buy-coffee-form">
                <div class="size">
                    <h4>Please select your favorite size:</h4>
                    <div class="d-flex">
                        <div class="pr-30">
                            <input type="radio" id="small" name="cf-size" value="Small" class="radio-option">
                            <label for="small">
                                <p class="my-button radio-btn small-size">Small</p>
                            </label>
                        </div>
                        <div class="pr-30">
                            <input type="radio" id="medium" name="cf-size" value="Medium" class="radio-option"
                                checked="checked">
                            <label for="medium">
                                <p class="my-button radio-btn active medium-size">Medium</p>
                            </label>
                        </div>
                        <div class="pr-30">
                            <input type="radio" id="big" name="cf-size" value="Big" class="radio-option">
                            <label for="big">
                                <p class="my-button radio-btn big-size" >Big</p>
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
                                <p class="my-button topping-btn topping1-btn" >Topping 1</p>
                            </label>
                        </div>

                        <div>
                            <input type="checkbox" id="topping2" name="topping2" value="topping2"
                                class="topping-option">
                            <label for="topping2">
                                <p class="my-button topping-btn topping2-btn" >Topping 2</p>
                            </label>
                        </div>


                        <div>
                            <input type="checkbox" id="topping3" name="topping3" value="topping3"
                                class="topping-option">
                            <label for="topping3">
                                <p class="my-button topping-btn topping3-btn" >Topping 3</p>
                            </label>
                        </div>

                        <div>
                            <input type="checkbox" id="topping4" name="topping4" value="topping4"
                                class="topping-option">
                            <label for="topping4">
                                <p class="my-button topping-btn topping4-btn" >Topping 4</p>
                            </label>
                        </div>

                        <div>
                            <input type="checkbox" id="topping5" name="topping5" value="topping5"
                                class="topping-option">
                            <label for="topping5">
                                <p class="my-button topping-btn topping5-btn" >Topping 5</p>
                            </label>
                        </div>

                        <div>
                            <input type="checkbox" id="topping6" name="topping6" value="topping6"
                                class="topping-option">
                            <label for="topping6">
                                <p class="my-button topping-btn topping6-btn">Topping 6</p>
                            </label>
                        </div>

                    </div>
                </div>
                <div class="d-flex" style="justify-content: space-between">
                    <div class="quantity">
                        <h4>Please enter quantity</h4>
                        <input type="number" min="1" max="1000" value="${quantity}" style="text-align: right;" id="quantity">
                        <span id='error-quantity'>*Invalid quantity</span>
                    </div>
                    <div>
                        <p class="total">Total: <span id="total">${coffeeToEdit.payment}</span>$</p>
                    </div>
                </div>




                <div class="add-to-cart">
                    <input id="add-to-cart-btn" type="button" value="Save" class="my-button add-to-cart-btn"
                        onclick="saveOrder(${No})">
                </div>

            </form>
        </div>
    </div>
    `
    DOM_ID("my-modal").innerHTML = modalElement;
    setSize(size);
    setTopping(topping);
    activeSize();
    activeTopping();
    showTotalBuy("total");
}

function confirmOrder() {
    let listCoffee = getCartListInStorage();
    if (listCoffee.listInCart.length == 0) {
        DOM_ID('errorInfo').style.display = 'block';
        return;
    }
    closeTable();
    openConfirmModal();
    showClientInfo()
    renderConfirmTable();
}

function sendOrder() {

    // get Input data 
    let email = DOM_ID("client-email").value;
    let name = DOM_ID("client-name").value;
    let phone = DOM_ID("client-phone").value;
    let address = DOM_ID("client-address").value;
    let comment = DOM_ID("client-comment").value

    // validation 
    let error = 0;

    if (validate.CheckEmpty("client-email", email, "client-email-error")) {
        error++;
    }

    if (validate.CheckEmpty("client-name", name, "client-name-error")) {
        error++;
    }

    if (validate.CheckEmpty("client-phone", phone, "client-phone-error")) {
        error++;
    }
    if (validate.CheckEmpty("client-address", address, "client-address-error")) {
        error++;
    }

    // send order
    if (error != 0) {
        return
    }
    let cfId = [],
        cfName = [],
        cfSize = [],
        cfTopping = [],
        cfQuantity = [],
        cfTotal = [],
        cfPayment = parseFloat(DOM_ID('payment-order').innerText).toFixed(2)
    let listCoffee = getCartListInStorage();
    for (i = 0; i < listCoffee.listInCart.length; i++) {
        cfId.push(listCoffee.listInCart[i].id)
        cfName.push(listCoffee.listInCart[i].name)
        cfSize.push(listCoffee.listInCart[i].size)
        cfTopping.push(listCoffee.listInCart[i].topping)
        cfQuantity.push(listCoffee.listInCart[i].quantity)
        cfTotal.push(listCoffee.listInCart[i].payment)
    }
    let order = new Order(email, name, address, phone, comment, cfId, cfName, cfSize, cfTopping, cfQuantity, cfTotal, cfPayment)
    listOrder.AddOrder(order);
    user = getMemory();
    user.listOrder = listOrder.listCfOrder;
    user.listInCart = [];
    setOrderToStorage(order);
    alert("Your order has been sent!!")
    saveToMemory(user);
    showCart();
    closeConfirmModal();
}

function renderConfirmTable() {
    let listCoffeeConfirm = getCartListInStorage();
    let tbody = DOM_ID("order-tbody");
    let totalElement = DOM_ID("payment-order");
    let totalPayment = calculateTotalPayment(listCoffeeConfirm);
    let trData = '';
    for (i = 0; i < listCoffeeConfirm.listInCart.length; i++) {
        coffee = listCoffeeConfirm.listInCart[i];
        trData += `
        
                    <tr>
                        <td>${i + 1}</td>

                        <td>${coffee.id}</td>

                        <td>${coffee.name}</td>

                        <td> ${coffee.size}</td>
    
                        <td> ${coffee.topping.map(topping => `<span class='toppingItems'>${topping}</span>`).join(', ')}</td >

                        <td> ${coffee.quantity}</td>
    
                        <td><span id="cf-${i}-payment">${coffee.payment}</span>$</td>
                    </tr >
                
        `
    }
    tbody.innerHTML = trData;
    totalElement.innerHTML = totalPayment;
}

function openConfirmModal() {
    DOM_ID('confirm-order').style.display = 'block';
}
function showClientInfo() {
    user = getMemory();
    DOM_ID("client-email").value = user.email;
    DOM_ID("client-name").value = user.firstName + ' ' + user.lastName;
    DOM_ID("client-phone").value = user.phone;

}
function closeConfirmModal() {
    DOM_ID('confirm-order').style.display = 'none';
}
function activeSize() {
    let sizeItems = qSelector('.radio-btn')
    for (let i = 0; i < sizeItems.length; i++) {
        sizeItems[i].addEventListener('click', function () {
            for (let j = 0; j < sizeItems.length; j++) {
                sizeItems[j].classList.remove('active');
            }
            this.classList.add('active');

        });
    }
}
function setSize(size) {

    let elementSmall = document.querySelector('.small-size');
    let elementMed = document.querySelector('.medium-size');
    let elementBig = document.querySelector('.big-size');
    if (size == 'Big') {
        elementSmall.classList.remove('active');
        elementMed.classList.remove('active');
        elementBig.classList.add('active');
    } else if (size == 'Medium') {
        elementSmall.classList.remove('active');
        elementBig.classList.remove('active');
        elementMed.classList.add('active');
    } else {
        elementBig.classList.remove('active');
        elementMed.classList.remove('active');
        elementSmall.classList.add('active');
    }

}
function setTopping(topping) {
    let elementsTopping1 = document.querySelector('.topping1-btn');
    let elementsTopping2 = document.querySelector('.topping2-btn');
    let elementsTopping3 = document.querySelector('.topping3-btn');
    let elementsTopping4 = document.querySelector('.topping4-btn');
    let elementsTopping5 = document.querySelector('.topping5-btn');
    let elementsTopping6 = document.querySelector('.topping6-btn');

    for (i = 0; i < topping.length; i++) {
        if (topping[i] == 'topping1') {
            elementsTopping1.classList.add('active');
        } else if (topping[i] == 'topping2') {
            elementsTopping2.classList.add('active');
        } else if (topping[i] == 'topping3') {
            elementsTopping3.classList.add('active');
        } else if (topping[i] == 'topping4') {
            elementsTopping4.classList.add('active');
        } else if (topping[i] == 'topping5') {
            elementsTopping5.classList.add('active');
        } else elementsTopping6.classList.add('active');
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

function confirmRemoveOrder(No) {
    if (confirm("Are you sure you want to delete?")) {
        removeOrder(No);
        alert("Item deleted successfully!");
    } else {
        alert("Delete cancelled.");
    }
}


function removeOrder(No) {
    user = getMemory();
    listCoffee.listInCart = user.listInCart;
    listCoffee.DeleteOrder(No);
    user.listInCart = listCoffee.listInCart;
    saveToMemory(user);
    getCartListInStorage();
    showCart();
    renderCartTable()
}
function openModal() {
    DOM_ID("modal-container").style.display = 'block';
}

function closeModal() {
    DOM_ID("modal-container").style.display = 'none';
}

function closeTable() {
    DOM_ID('cart-container').style.display = 'none';

}
function openTable() {
    DOM_ID('cart-container').style.display = 'block';
}
function logout() {
    localStorage.removeItem('User');
    window.location.href = './index.html';
}

window.onload = checkLogin();
RenderProductSection();
showCart();

