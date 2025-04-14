document.getElementById("guestbookForm").addEventListener("submit", function (e) {
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
  
    if (!name || !message) {
      e.preventDefault();
      alert("Please fill out both fields before submitting.");
      return false;
    }
  });
  