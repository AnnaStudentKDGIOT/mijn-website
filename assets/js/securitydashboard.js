 const ctx = document.getElementById('myChart').getContext('2d');

    // Voorbeelddata — pas dit zelf aan of laad via fetch()
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