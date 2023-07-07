document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const materialsList = document.getElementById("materialsList");
  const designsList = document.getElementById("designsList");
  const materialDetails = document.getElementById("materialDetails");
  const costCalculator = document.getElementById("costCalculator");

  // Fetch building materials from the local API
  function fetchMaterials() {
    fetch("http://localhost:3000/materials")
      .then(response => response.json())
      .then(data => {
        renderMaterials(data);
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  }

  // Render building materials list
  function renderMaterials(materials) {
    // Render the materials list dynamically
  }

  // Fetch designs from the local API
  function fetchDesigns() {
    fetch(" http://localhost:3000/materials")
      .then(response => response.json())
      .then(data => {
        renderDesigns(data);
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  }

  // Render designs list
  function renderDesigns(designs) {
    // Render the designs list dynamically
  }

  // Fetch material details from the local API
  function fetchMaterialDetails(materialId) {
    fetch(` http://localhost:3000/materials/ ${materialId}`)
      .then(response => response.json())
      .then(data => {
        renderMaterialDetails(data);
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  }

  // Render material details
  function renderMaterialDetails(material) {
    // Render the material details dynamically
  }

  // Calculate cost
  function calculateCost(materialId, quantity) {
    // Calculate the cost based on material ID and quantity
  }

  // Event listeners
  searchInput.addEventListener("keyup", function(event) {
    const searchQuery = event.target.value;
    // Implement search functionality
  });

  // Fetch data when the page loads
  fetchMaterials();
  fetchDesigns();
});