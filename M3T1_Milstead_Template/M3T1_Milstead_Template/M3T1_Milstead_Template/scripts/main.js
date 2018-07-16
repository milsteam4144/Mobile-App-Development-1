//Creates a reference(variable) to the img element.
var myImage = document.querySelector('img');
/*Creates a function: if one image is assigned to the src element, switch it to
the other one.*/
myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute ('src','images/firefox2.png');
    } else {
      myImage.setAttribute ('src','images/firefox-icon.png');
    }
}
//Creates references to the the elements.
var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');
/*This function prompts the user to enter their name and assigns that string
to a variable and stores it locally in the browser. Then assigns a string with that
variable to the textContent property of the myHeading variable*/
function setUserName() {
  var myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.textContent = 'Mozilla is cool, ' + myName;
}
//If there is not data in the 'name' property, call the setUserName function.
//If there is data in the 'name' element, use that data with a string and assign
//it to the textContent property of the myHeading reference variable.
if(!localStorage.getItem('name')) {
  setUserName();
} else {
  var storedName = localStorage.getItem('name');
  myHeading.textContent = 'Mozilla is cool, ' + storedName;
}
//When the users clicks myButton, the setUserName function is called.
myButton.onclick = function() {
  setUserName();
}
