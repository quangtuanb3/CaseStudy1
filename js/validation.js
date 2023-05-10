
function Validation() {
    this.CheckEmpty = function (id, value) {
        if (value.trim() === '') {
            document.getElementById(id).style.borderColor = "red"
            return true;
        }
        document.getElementById(id).style.borderColor = "green"
        return false;
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
}
