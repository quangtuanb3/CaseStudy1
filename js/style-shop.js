
var sizeItem = document.querySelectorAll('.radio-btn')

for (var i = 0; i < sizeItem.length; i++) {
    sizeItem[i].addEventListener('click', function () {
        for (var j = 0; j < sizeItem.length; j++) {
            sizeItem[j].classList.remove('active');
        }
        this.classList.add('active');

    });
}

const toppings = document.querySelectorAll('.topping-btn');

toppings.forEach((topping) => {
    topping.addEventListener('click', () => {
        topping.classList.toggle('active');
    });
});

function showModal() {
    DOM_ID("my-modal").style.display = 'block';
}

function hideModal() {
    DOM_ID("my-modal").style.display = 'none';
}