// IPAPI.js
const IPINFO_TOKEN = "57ae4e2b472760";          // <-- Vul in!


function fetchIPInfo(callback) {
  fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`)
    .then(response => response.json())
    .then(data => {
      // Zet hier alle gewenste info uit data
      const land = data.country_name;
      const stad = data.city;
      const tijdzone = data.timezone;
      const vlag = data.country_code ? data.country_code.toLowerCase() : 'unknown';

      // Lokale tijd
      const now = new Date().toLocaleTimeString('nl-NL', { timeZone: tijdzone });
      let begroeting;
      const uur = parseInt(now.split(':')[0]);
      if (uur < 12) begroeting = 'Goedemorgen';
      else if (uur < 18) begroeting = 'Goedemiddag';
      else begroeting = 'Goedenavond';

      // Je kunt ALLE data gebruiken, zie voorbeeld hieronder!
      const infoHTML = `
        ${begroeting}! <br>
        Welkom vanuit ${stad}, ${land} 
        <img src="https://flagcdn.com/24x18/${vlag}.png" alt="vlag"> <br>
        Jouw lokale tijd is: ${now} <br>
        <small>
          IP: ${data.ip} <br>
          Organisatie: ${data.org} <br>
          AS Number: ${data.asn} <br>
          Valuta: ${data.currency_name} (${data.currency}) <br>
          Taal: ${data.languages} <br>
          Tijdzone: ${data.timezone} <br>
          Locatie: ${data.latitude}, ${data.longitude} <br>
        </small>
      `;

      // Zet alles in het #welkom div
      if (document.getElementById('welkom')) {
        document.getElementById('welkom').innerHTML = infoHTML;
      }

      // Callback als je iets wilt doen met alle data
      if (typeof callback === "function") callback(data);
    })
    .catch(error => {
      if (document.getElementById('welkom')) {
        document.getElementById('welkom').textContent = "Kon locatiegegevens niet ophalen.";
      }
      if (typeof callback === "function") callback(null, error);
    });
}

// Direct uitvoeren als het bestand wordt geladen
window.addEventListener('DOMContentLoaded', () => {
  fetchIPInfo();
});
