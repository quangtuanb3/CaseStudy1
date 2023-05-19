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
    console.log('tbody: ' + tbody);
    console.log('listOrder.listCfOrder:' + listOrder.listCfOrder);
    if (listOrder.listCfOrder == null) { return };
    tbodyData = '';
    let orderItemsLst = [];
    let orderItem;
    let firstRow = '';
    let otherRows = '';

    for (i = 0; i < listOrder.listCfOrder.length; i++) {
        let orderLength = listOrder.listCfOrder[i].cfId.length;
        let orderedCf = listOrder.listCfOrder[i];
        firstRow +=
            `   <tr>
                <td rowspan="${orderLength}">${i + 1}</td>
                <td rowspan="${orderLength}">${orderedCf.firstName} ${orderedCf.lastName}</td>
                <td rowspan="${orderLength}"> <span class="address">${orderedCf.address}</span><br><span class="phone">${orderedCf.phone}</span></td>
                <td rowspan="${orderLength}">${orderedCf.comment}</td>
                <td class="cfId">${orderedCf.cfId[i]}</td>
                <td class="cfName">${orderedCf.address[i]}</td>
                <td class="cfSize">${orderedCf.cfSize[i]}</td>
                <td class="cfTopping">${orderedCf.cfTopping[i]}</td>
                <td class="cfQuantity">${orderedCf.cfQuantity[i]}</td>
                <td class="cfPrice">${orderedCf.cfTotal[i]}</td>
                <td rowspan="${orderLength}"> <span class="total-payment">${orderedCf.cfPayment}</span> <span>$</span> </td>
                <td rowspan="${orderLength}">
                <button class='done-btn'><i class="fa fa-check-circle"></i></button>
                <button class='delete-btn'><i class="fa fa-trash"></i></button>
                 </td>
            </tr>`
        for (j = 1; j < orderedCf.cfId.length; j++) {
            otherRows += `
            <tr>
            <td class="cfId">${orderedCf.cfId[j]}</td>
            <td class="cfName">${orderedCf.address[j]}</td>
            <td class="cfSize">${orderedCf.cfSize[j]}</td>
            <td class="cfTopping">${orderedCf.cfTopping[j]} </td>
            <td class="cfQuantity">${orderedCf.cfQuantity[j]}</td>
            <td class="cfPrice">${orderedCf.cfTotal[j]}</td>
            </tr>
         `
        }
        orderItem = firstRow + otherRows;
        orderItemsLst.push(orderItem);
        firstRow = '';
        otherRows = '';
    }


    for (i = 0; i < orderItemsLst.length; i++) {
        tbodyData += orderItemsLst[i];
        console.log('orderItemsLst' + i + ': ' + orderItemsLst[i])
    }
    tbody.innerHTML = tbodyData;
}
