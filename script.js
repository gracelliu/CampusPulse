// This function will show the target page and hide all others


function showPage(targetId) {
    // Hide all pages first
    const pages = document.querySelectorAll('.app-page');
    pages.forEach(page => {
      page.style.display = 'none';
    });
  
    // Show the target page
    const targetPage = document.getElementById(targetId);
    if (targetPage) {
      targetPage.style.display = 'block';
    }
}

// This function sets up event listeners for all navigation buttons
function setupNavigation() {
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the data-target attribute to identify the target page
      const targetId = this.getAttribute('data-target');
      showPage(targetId);
    });
  });
}

document.querySelectorAll('.circle').forEach(circle => {
  circle.addEventListener('click', function() {
      alert('Circle ' + this.textContent + ' clicked!');
  });
});

// Initialize the navigation once the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  setupNavigation();
  showPage('page1'); // Show the first page by default
});


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById('toggleInputBtn').addEventListener('click', function() {
    var inputBar = document.getElementById('inputBar');
    if (inputBar.classList.contains('hidden')) {
        inputBar.classList.remove('hidden');
    } else {
        inputBar.classList.add('hidden');
    }
});

function displayInput() {
    var input = document.getElementById('userInput').value;
    document.getElementById('displayText').innerText = input;
}


document.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('click', function() {
        alert('Circle ' + this.textContent + ' clicked!');
    });
});