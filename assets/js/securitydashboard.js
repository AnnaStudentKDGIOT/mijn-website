// IPAPI ophalen en tonen
document.addEventListener("DOMContentLoaded", function () {
  const ipInfoDiv = document.getElementById("ipapi-info");

  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      ipInfoDiv.innerHTML = `
        <h3>Netwerkstatistieken</h3>
        <ul>
          <li><strong>IP-adres:</strong> ${data.ip}</li>
          <li><strong>Stad:</strong> ${data.city}</li>
          <li><strong>Regio:</strong> ${data.region}</li>
          <li><strong>Land:</strong> ${data.country_name} (${data.country})</li>
          <li><strong>Provider:</strong> ${data.org}</li>
          <li><strong>Postcode:</strong> ${data.postal}</li>
          <li><strong>Locatie:</strong> ${data.latitude}, ${data.longitude}</li>
        </ul>
      `;
    })
    .catch(() => {
      ipInfoDiv.innerHTML = "<p>Kan netwerkgegevens niet ophalen.</p>";
    });

  // ---- Chart.js (voorbeelddata, kun je dynamisch maken) ----
  const ctx = document.getElementById('myChart').getContext('2d');

  // Voorbeelddata — kun je vervangen door echte network stats!
  const labels = ['12:00', '12:05', '12:10', '12:15', '12:20'];
  const dataPoints = [20, 35, 25, 40, 30];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'CPU Load (%)',
        data: dataPoints,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
});
