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
  
  // Initialize the navigation once the DOM content is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    showPage('page1'); // Show the first page by default
  });
  