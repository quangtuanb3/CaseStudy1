window.onload = checkLogin();
function checkLogin() {
    if (localStorage.getItem("User") == null) {
        window.location.href = '../../index.html';
    }
}

let listOrder = new ListOrder();
function getStorage() {
    var listOrderData = localStorage.getItem("orderedCoffee");
    listOrder.listCfOrder = JSON.parse(listOrderData);
    return listOrder;
}
function DOM_ID(id) {
    return document.getElementById(id);
}

RenderTableOrder();

function RenderTableOrder() {
    let listOrder = getStorage();
    let tbody = DOM_ID("order-table");
    if (listOrder.listCfOrder == null) { return };
    tbodyData = '';
    listOrder.listCfOrder.map((order, index) => {
        tbodyData += `
        <tr>
        <td>${index + 1}</td>
        <td>${order.name}</br>${order.email}</td>
        <td>${order.address} </td>
        <td> ${order.phone} </td>
        <td>${order.comment}</td>
        <td>${order.cfPayment} $</td>
        <td><button onclick='getDetail(${index})'><i class="fa fa-file-invoice"></i></button></td>
    </tr>
        `
    })


    tbody.innerHTML = tbodyData;
}
function getDetail(No) {
    document.getElementById('bill-modal').style.display = 'block'
    let listOrder = getStorage();
    if (listOrder.listCfOrder == null) { return };
    let order = listOrder.listCfOrder[No];
    let billTableHead = `    
    <span class="close" onclick='closeBillModal()'>&times;</span>
    <table id="bill-table">
        <caption> BILL DETAIL</caption>
        <thead>
            <tr>
                <td>
                    Client Name:
                </td>
                <td>${order.name}</td>
                <td></td>
                <td></td>
                <td>
                    Email:
                </td>
                <td>${order.email}</td>
            </tr>
            <tr>
                <td>
                    Address:
                </td>
                <td>${order.address}</td>
                <td></td>
                <td></td>
                <td>
                    Comment:
                </td>
                <td> ${order.comment}</td>
            </tr>
            <tr>
                <td>
                    Phone:
                </td>
                <td>${order.phone}</td>
                <td></td>
                <td></td>
                <td>Total</td>
                <td>${order.cfPayment}$</td>
            </tr>
            <tr class='trHead'>
            <td>No</td>
            <td>Coffee Name</td>
            <td>Size</td>
            <td>Topping</td>
            <td>Quantity</td>
            <td>Payment</td>
            </tr>

        </thead>`
    let billTableBody = `<tbody>`;
    for (let j = 0; j < order.cfId.length; j++) {
        billTableBody +=
            `<tr>
                <td> ${j + 1}</td>
                <td>${order.cfName[j]}</td>
                <td> ${order.cfSize[j]}</td>
                <td>${order.cfTopping[j].toString()}</td>
                <td>${order.cfQuantity[j]}</td>
                <td> ${order.cfTotal[j]}</td>
            </tr>`
        let billTableFoot = `    </tbody>
    </table>`

        document.getElementById('bill-modal').innerHTML = billTableHead + billTableBody + billTableFoot
    }

}
function closeBillModal() {
    document.getElementById('bill-modal').style.display = 'none';
}

function logout() {
    localStorage.removeItem('User');
    window.location.href = '../../index.html';
}
