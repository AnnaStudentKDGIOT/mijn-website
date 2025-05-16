
    async function haalNetwerkStatsOp() {
      try {
        const response = await fetch('https://ip-api.com/json');
        const data = await response.json();
        
        if (data.status === "success") {
          document.getElementById('stats').innerHTML = `
            <ul>
              <li><strong>IP-adres:</strong> ${data.query}</li>
              <li><strong>ISP:</strong> ${data.isp}</li>
              <li><strong>Organisatie:</strong> ${data.org}</li>
              <li><strong>Stad:</strong> ${data.city}</li>
              <li><strong>Regio:</strong> ${data.regionName}</li>
              <li><strong>Land:</strong> ${data.country}</li>
              <li><strong>Tijdzone:</strong> ${data.timezone}</li>
              <li><strong>Coördinaten:</strong> ${data.lat}, ${data.lon}</li>
            </ul>
          `;
        } else {
          document.getElementById('stats').textContent = "Kon netwerkgegevens niet ophalen.";
        }
      } catch (error) {
        document.getElementById('stats').textContent = "Fout bij ophalen netwerkgegevens.";
      }
    }

    haalNetwerkStatsOp();