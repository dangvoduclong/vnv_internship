///////////////////////////////// Selecting Elements
const element = document.getElementById("myElementId");
const elements = document.getElementsByClassName("myClass");
const elements = document.getElementsByTagName("div");
const element = document.querySelector(".myClass"); // Selects the first element with class 'myClass'
const element = document.querySelector("#myElementId"); // Selects the element with id 'myElementId'
const elements = document.querySelectorAll(".myClass"); // Selects all elements with class 'myClass'

///////////////////////////////// Modifying Content
const element = document.getElementById("myElementId");
element.textContent = "New Text Content"; // Changes the text content of the element

const element = document.getElementById("myElementId");
element.innerHTML = "<strong>New HTML Content</strong>"; // Changes the HTML content of the element

const element = document.getElementById("myElementId");
element.setAttribute("data-custom", "customValue"); // Sets a new attribute
const value = element.getAttribute("data-custom"); // Gets the attribute value
element.removeAttribute("data-custom"); // Removes the attribute

const element = document.getElementById("myElementId");
element.style.backgroundColor = "lightblue"; // Changes the background color of the element

////////////////////////////////// Handling Events
const button = document.getElementById("myButton");

button.addEventListener("click", function (event) {
  alert("Button clicked!");
});

const button = document.getElementById("myButton");

button.addEventListener("click", function (event) {
  console.log("Event type:", event.type); // Logs 'click'
  console.log("Clicked element:", event.target); // Logs the clicked element
});

const handleClick = function (event) {
  alert("Button clicked!");
};

const button = document.getElementById("myButton");

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents the form from submitting the default way
  const formData = new FormData(form);
  console.log("Form data:", formData.get("inputName")); // Get form input value
});
/*
Selecting Elements: Use methods like getElementById, querySelector, and querySelectorAll to select elements.
Modifying Content: Change text content, HTML content, attributes, and styles using properties like textContent, innerHTML, setAttribute, and style.
Handling Events: Attach event handlers with addEventListener, and handle events with the event object. Remove event handlers with removeEventListener when necessary.

<div id="example">
        <p>Hello <strong style="display:none;">World</strong></p>
        <span>Visible Text</span>
    </div>
    // Select the element
const element = document.getElementById('example');

// Using textContent
console.log('textContent:', element.textContent); 
// Outputs: "Hello WorldVisible Text" (All text including hidden ones)

// Using innerText
console.log('innerText:', element.innerText); 
// Outputs: "Hello Visible Text" (Excludes hidden text and collapses whitespace)

// Using innerHTML
console.log('innerHTML:', element.innerHTML); 
// Outputs: "<p>Hello <strong style="display:none;">World</strong></p><span>Visible Text</span>"
// (Includes the full HTML structure)


*/
