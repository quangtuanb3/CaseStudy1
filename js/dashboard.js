window.addEventListener("load", function () {
  truncateDescription();
});
function truncateDescription() {
  var descriptionList = document.getElementsByClassName("description")
  console.log(descriptionList);
  for (var i = 0; i < descriptionList.length; i++) {
      var text = descriptionList[i].innerHTML;
      var newText = truncateString(text, 65)
      descriptionList[i].innerHTML = newText;

  }
}
function truncateString(str, num) {
  if (str.length > num) {
      return str.slice(0, num) + "...";
  } else {
      return str;
  }
}


