let listOrder = new ListOrder();
function getStorage() {
    var listOrderData = localStorage.getItem("orderedCoffee");
    listOrder.listCfOrder = JSON.parse(listOrderData);
    RenderTableOrder(listOrder);
} ;
function RenderTableOrder(listOrder){
    
}
