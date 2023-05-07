


// Get all the menu items
var menuItems = document.querySelectorAll('div ul li a');
var section = document.querySelectorAll('section')
console.log(menuItems);

// Loop through each menu item
for (var i = 0; i < menuItems.length; i++) {

  // Add a click event listener to the menu item

  menuItems[i].addEventListener('click', function () {

    // Remove the "active" class from all the menu items
    for (var j = 0; j < menuItems.length; j++) {
      menuItems[j].classList.remove('active');
    }

    // Add the "active" class to the clicked menu item
    this.classList.add('active');

  });
}

var homeTab = document.getElementById("home-tab");
var galleryTab = document.getElementById("gallery-tab");
// Check if the URL contains the #gallery fragment
if (window.location.hash === "#gallery") {
  // If the URL contains the #gallery fragment, add the "active" class to the Gallery tab's <li> element
  galleryTab.classList.add("active");
  // And remove the "active" class from the Home tab's <li> element
  homeTab.classList.remove("active");
}
// Add a click event listener to the Gallery tab's <li> element
galleryTab.addEventListener("click", function () {
  // When the Gallery tab is clicked, add the "active" class to its <li> element
  galleryTab.classList.add("active");
  // And remove the "active" class from the Home tab's <li> element
  homeTab.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function (event) {
  var loginBtn = document.getElementById("login-btn");
  var loginPopup = document.getElementById("my-form");
  var closeBtn = document.getElementById("close-btn");
  console.log(loginBtn);
  console.log(loginPopup);
  console.log(closeBtn);

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
});


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

// login 
function login() {
  // Get the values of the username and password inputs
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // Check if the username and password are valid
  if (username === 'admin' && password === 'admin') {
    // If the username and password are valid, navigate to the homepage
    window.location.href = './dashboard.html';
  } else if (username === 'user' && password === 'user') {
    // If the username and password are valid, navigate to the homepage
    window.location.href = './shop.html';
  }   else {
    // If the username and password are not valid, show an error message
    alert('Invalid username or password. Please try again.');
  }
}

// Add an event listener to the login button
document.querySelector('#login-submit').addEventListener('click', function (event) {
  event.preventDefault(); // prevent the form from submitting
  login(); // call the login function
});
