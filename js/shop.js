var listCoffee = new ListCoffee();
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

function DOM_ID(id) {
    return document.getElementById(id)
}

if (localStorage.getItem("coffeeList") == null) {
    RenderNewCoffee(listCoffee);
} else getStorage();


function getStorage() {
    var coffeeData = localStorage.getItem("coffeeList");
    listCoffee.listCf = JSON.parse(coffeeData);

    RenderCoffeeData(productionType, listCoffee);
}

var listCoffee = getStorage();


function RenderCoffeeData(productionType, listCoffee) {
    var divContent = DOM_ID("pro-cont");
    divContent.innerHTML = '';
    var content = createDivBanner(productionType, 0) + createDivItem(listCoffee)

    divContent.innerHTML = content
}

function createStar(start) {
    let startItem = '';
    for (let i = 0; i < start; i++) {
        startItem += `<i class="fa fa-star"></i>`
    }
    return startItem;
}

function createDivItem(listCoffee) {
    var divItems = '';

    for (let i = 0; i < listCoffee.listCf.length; i++) {
        const des = listCoffee.listCf[i].description.replace(/\n/g, '<br> <br>')
        var coffee = listCoffee.listCf[i];
        var newTitle = truncateString(listCoffee.listCf[i].title, 32)
        var newDescription = truncateString(des, 150)
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
    showModal()
}
