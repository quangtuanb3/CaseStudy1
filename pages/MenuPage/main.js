window.onload = checkLogin();
var listCoffee = new ListCoffee();
var validate = new Validate();

function DOM_ID(id) {
    return document.getElementById(id)
}

if (localStorage.getItem("coffeeList") == null) {
    RenderNewCoffee(listCoffee);
} else getStorage();
setStorage()

function checkLogin() {
    if (localStorage.getItem("User") == null) {
        window.location.href = '/index.html';
    }
}

 
function AddCoffee() {
    // get Input data 
    var id = DOM_ID("coffee-id").value;
    var name = DOM_ID("name").value;
    var image = DOM_ID("image").value;
    var title = DOM_ID("title").value;
    var rate = DOM_ID("rate").value;
    var order = DOM_ID("order").value;
    var price = DOM_ID("price").value;
    var description = DOM_ID("description").value

    // validation 
    var error = 0;

    image = validate.CheckToSetDefaultImg(image);

    if (validate.CheckEmpty("coffee-id", id) == true) {
        error++;
    } else if ((validate.CheckDuplicateId("coffee-id", listCoffee) == true)) {
        error++;
    }

    if (validate.CheckEmpty("name", name) == true) {
        error++;
    } else if ((validate.CheckDuplicateName("name", listCoffee) == true)) {
        error++;
    }

    if (validate.CheckEmpty("image", image) == true) {
        error++;
    }
    if (validate.CheckEmpty("title", title) == true) {
        error++;
    }
    if (validate.CheckEmpty("rate", rate) == true) {
        error++;
    }
    if (validate.CheckEmpty("order", order) == true) {
        error++;
    }
    if (validate.CheckEmpty("price", price) == true) {
        error++;
    }
    if (validate.CheckEmpty("description", description) == true) {
        error++;
    }

    // add coffee
    if (error != 0) {
        return
    }
    var coffee = new Coffee(id, name, image, title, rate, order, price, description)
    listCoffee.AddCoffee(coffee);
    setStorage();
    getStorage();
    closeModal();


}
function confirmDeleteCoffee(CfId) {
    if (confirm("Are you sure you want to delete?")) {
        DeleteCoffee(CfId)
        alert("Item deleted successfully!");
    } else {
        alert("Delete cancelled.");
    }
}
function DeleteCoffee(CfId) {
    listCoffee.DeleteCoffee(CfId);
    setStorage();
    getStorage();
}

function EditCoffee(id) {
    let coffee = listCoffee.FindById(id)
    if (coffee != null) {
        openModal();
        let btn = DOM_ID("submit-btn")
        btn.value = "Save";
        btn.removeAttribute("onclick");
        btn.setAttribute("onclick", "SaveCoffee()");
        DOM_ID("coffee-id").value = coffee.id;
        DOM_ID("cf-hide-id").value = coffee.id;
        DOM_ID("coffee-id").disabled = 'true';
        DOM_ID("name").value = coffee.name;
        DOM_ID("image").value = coffee.image;
        DOM_ID("title").value = coffee.title;
        DOM_ID("rate").value = coffee.rate;
        DOM_ID("order").value = coffee.order;
        DOM_ID("price").value = coffee.price;
        DOM_ID("description").value = coffee.description;

    }
    setStorage();
    getStorage();

}
function SaveCoffee() {
    // get data 
    var id = DOM_ID("cf-hide-id").value;
    var name = DOM_ID("name").value;
    var image = DOM_ID("image").value;
    var title = DOM_ID("title").value;
    var rate = DOM_ID("rate").value;
    var order = DOM_ID("order").value;
    var price = DOM_ID("price").value;
    var description = DOM_ID("description").value

    // validation 
    var error = 0;

    if (validation.CheckEmpty("name", name) == true) {
        error++;
    }

    if (validation.CheckEmpty("image", image) == true) {
        error++;
    }
    if (validation.CheckEmpty("title", title) == true) {
        error++;
    }
    if (validation.CheckEmpty("rate", rate) == true) {
        error++;
    }
    if (validation.CheckEmpty("order", order) == true) {
        error++;
    }
    if (validation.CheckEmpty("price", price) == true) {
        error++;
    }
    if (validation.CheckEmpty("description", description) == true) {
        error++;
    }

    // add coffee
    if (error != 0) {
        return
    }
    var coffee = new Coffee(id, name, image, title, rate, order, price, description)
    listCoffee.EditCoffeeInList(coffee);
    closeModal()
    setStorage();
    getStorage();

}


function RenderNewCoffee(listCoffee) {
    var tbody = DOM_ID("my-table");
    tbody.innerHTML = '';

    var trCoffee = '';

    for (let i = 0; i < listCoffee.listCf.length; i++) {
        var coffee = listCoffee.listCf[i];
        var newTitle = truncateString(listCoffee.listCf[i].title, 50)
        var newDescription = truncateString(listCoffee.listCf[i].description, 50)
        trCoffee += `
        <tr>
          <td>${coffee.id}</td>
          <td>${coffee.name}</td>
          <td class="table-img"><img src="${coffee.image}" alt="${coffee.image}"></td>
          <td>${newTitle}</td>
          <td>${coffee.rate}</td>
          <td>${coffee.order}</td>
          <td>${coffee.price}</td>
          <td>${newDescription}</td>
          <td>
            <button class="edit-btn" onclick="EditCoffee(${coffee.id})"><i class="fa fa-edit"></i></button>
            <button class="delete-btn" onclick="confirmDeleteCoffee(${coffee.id})" ><i class="fa fa-trash"></i></button>
          </td>
        </tr>`;
    }
    tbody.innerHTML = trCoffee;
}

function openModal() {
    DOM_ID("myModal").style.display = 'block';
}

function closeModal() {
    DOM_ID("myModal").style.display = 'none';
}

function setStorage() {
    var jsonCoffeeData = JSON.stringify(listCoffee.listCf);
    localStorage.setItem("coffeeList", jsonCoffeeData);
}

function getStorage() {
    var coffeeData = localStorage.getItem("coffeeList");
    listCoffee.listCf = JSON.parse(coffeeData);
    RenderNewCoffee(listCoffee);
}


function clearForm() {
    console.log(DOM_ID("coffee-id").disabled)
    if (!DOM_ID("coffee-id").disabled) {
        DOM_ID("coffee-id").value = '';
    }
    DOM_ID("name").value = '';
    DOM_ID("image").value = '';
    DOM_ID("title").value = '';
    DOM_ID("rate").value = '';
    DOM_ID("order").value = '';
    DOM_ID("price").value = '';
    DOM_ID("description").value = '';

}

function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}


