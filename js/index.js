
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

var homeTab = document.getElementById("home-tab");
var galleryTab = document.getElementById("gallery-tab");
if (window.location.hash === "#gallery") {
  galleryTab.classList.add("active");
  homeTab.classList.remove("active");
}
galleryTab.addEventListener("click", function () {
  galleryTab.classList.add("active");
  homeTab.classList.remove("active");
});

function showLoginForm() {
  let loginBtn = document.getElementById("login-btn");
  let loginPopup = document.getElementById("my-form");
  let closeBtn = document.getElementById("close-btn");

  if (loginBtn && loginPopup && closeBtn) {
    loginBtn.addEventListener("click", function () {
      if (loginPopup.style.display === "block") {
        loginPopup.style.display = "none";
      } else {
        loginPopup.style.display = "block";
      }
    });

    closeBtn.addEventListener("click", function () {
      loginPopup.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == loginPopup) {
        loginPopup.style.display = "none";
      }
    });
  } else {
    console.error('One or more elements not found');
  }
}

function openLoginForm() {
  let loginPopup = document.getElementById("my-form");
  loginPopup.style.display = "block"
}


function truncateDescription() {
  var descriptionList = document.getElementsByClassName("description")
  for (var i = 0; i < descriptionList.length; i++) {
    var text = cardList[i].innerHTML;
    var newText = truncateString(text, 50)
    cardList[i].innerHTML = newText;

  }
}
function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

// Main Function
let listUser = new ListUser();
let validate = new Validate();
let listOrder = new ListOrder();
// listUser.listUsers.to
function login() {
  listUser.listUsers = getListUserInStorage();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  for (let i = 0; i < listUser.listUsers.length; i++) {
    if (email === listUser.listUsers[i].email && password === listUser.listUsers[i].pw && listUser.listUsers[i].auth == 1) {
      let user = listUser.listUsers[i];
      setUserToStorage(user);
      window.location.href = '/pages/MenuPage/dashboard.html';
    } else if (email === listUser.listUsers[i].email && password === listUser.listUsers[i].pw && listUser.listUsers[i].auth == 0) {
      let user = listUser.listUsers[i];
      setUserToStorage(user);
      window.location.href = "/pages/shopPage/shop.html";

    }

  }
  document.getElementById("invalidUser").style.display = "block";
}



function checkLogin() {
  if (localStorage.getItem('User') != null) {
    document.getElementById("login-btn").innerHTML = '<i class="fa fa-sign-out-alt"></i> Logout';
    document.getElementById("login-btn").addEventListener('click', () => {
      logout();
    })

    document.getElementById('visit-shop').innerHTML = '<a href="./pages/shopPage/shop.html">Visit shop</a>';

    document.getElementById('menubar-shop').innerHTML = ' <a id="shop-tab" href="./pages/shopPage/shop.html">SHOP</a>'
  } else {
    document.getElementById("login-btn").innerHTML = "Login";
    document.getElementById("login-btn").onclick = showLoginForm();
    document.getElementById('menubar-shop').innerHTML = 'SHOP';
    document.getElementById('menubar-shop').addEventListener('click', openLoginForm);
    document.getElementById('visit-shop').addEventListener('click', () => {
      openLoginForm();
    })
  }
}

function logout() {
  localStorage.removeItem('User');
  checkLogin();
}

document.querySelector('#login-submit').addEventListener('click', function (event) {
  event.preventDefault();
  login();
});

function closeSignUpModal() {
  document.getElementById("signUp-modal").style.display = 'none'
}
function openSignUpModal() {
  document.getElementById("my-form").style.display = 'none'
  document.getElementById("signUp-modal").style.display = 'block'
}

function DOM_ID(id) {
  return document.getElementById(id);
}


function signUp() {
  let email = DOM_ID("email_sU").value;
  let pw = DOM_ID("pw_sU").value;
  let phone = DOM_ID("phone_sU").value;
  let firstName = DOM_ID("firstname_sU").value;
  let lastName = DOM_ID("lastname_sU").value;
  let confirmPW = DOM_ID("cfPw_sU").value
  listUser.listUsers = getListUserInStorage();
  // validate
  let error = 0;
  if (validate.CheckDuplicateUser("email_sU", listUser)) {
    error++
  }
  if (pw != confirmPW) {
    DOM_ID("cfPw_sU").style.borderColor = 'red';
    error++;
  }
  if (error != 0) { return; }
  let listInCart = [];
  let user = new User(email, pw, phone, firstName, lastName, listOrder, listInCart, 0);
  listUser.AddUser(user);
  alert("Sign up successfully, Login now!");
  closeSignUpModal();
  setStorageListUser();

}

function setStorageListUser() {
  let jsonUser = JSON.stringify(listUser.listUsers);
  localStorage.setItem("listUsers", jsonUser);
}


function getListUserInStorage() {
  if (localStorage.getItem("listUsers") != null) {
    let userInStorage = localStorage.getItem("listUsers");
    let listUsers = JSON.parse(userInStorage);
    return listUsers;
  } else {
    let listUser = new ListUser();
    return listUser.listUsers;
  }
}

function setUserToStorage(user) {
  let jsonUser = JSON.stringify(user);
  localStorage.setItem("User", jsonUser);
}



window.onload = checkLogin();