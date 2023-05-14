
function Validation() {
    this.CheckEmpty = function (id, value) {
        if (value.trim() === '') {
            document.getElementById(id).style.borderColor = "red"
            return true;
        }
        document.getElementById(id).style.borderColor = "green"
        return false;
    }

    this.CheckToSetDefaultImg = function (imgSrc) {
        const http = new XMLHttpRequest();
        http.open('HEAD', imgSrc, false);
        http.send();
        if (http.status == 404) {
            imgSrc = "./images/defaultProduct.webp";
        }
        return imgSrc;
    }


    this.CheckDuplicateId = function (id, listCoffee) {
        let idElement = document.getElementById(id);
        for (let i = 0; i < listCoffee.listCf.length; i++) {
            if (idElement.value == listCoffee.listCf[i].id) {
                idElement.style.borderColor = "red"
                return true
            }
            idElement.style.borderColor = "green"
            return false;
        }
    }
    this.CheckDuplicateName = function (id, listCoffee) {
        let idElement = document.getElementById(id);
        for (let i = 0; i < listCoffee.listCf.length; i++) {
            if (idElement.value == listCoffee.listCf[i].name) {
                idElement.style.borderColor = "red"
                return true
            }
            idElement.style.borderColor = "green"
            return false;
        }
    }

    this.CheckBoundary = function (id) {
        let element = document.getElementById(id);
        console.log(element.min);
        console.log(element.value);
        console.log(element.max);

        if (parseInt(element.min) <= parseInt(element.value) && parseInt(element.value) <= parseInt(element.max)) {
            element.style.borderColor = "green";
            return false;
        } else {
            element.style.borderColor = "red";
            return true;
        }


    }

}