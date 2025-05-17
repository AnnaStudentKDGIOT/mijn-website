const IPINFO_TOKEN = "57ae4e2b472760"; // <-- Vul je eigen token in!

function fetchIPInfo(callback) {
  fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`)
    .then(response => response.json())
    .then(data => {
      // Zet alle gewenste info uit data
      const land = data.country || data.country_name || "onbekend";
      const stad = data.city || "onbekend";
      const tijdzone = data.timezone || "onbekend";
      const vlag = data.country ? data.country.toLowerCase() : "";
      const vlagUrl = vlag ? `https://flagcdn.com/24x18/${vlag}.png` : "";

      // Lokale tijd
      let now = "onbekend";
      try {
        now = new Date().toLocaleTimeString('nl-NL', { timeZone: tijdzone });
      } catch (e) {}

      let begroeting = "Hallo";
      if (now !== "onbekend") {
        const uur = parseInt(now.split(':')[0]);
        if (uur < 12) begroeting = 'Goedemorgen';
        else if (uur < 18) begroeting = 'Goedemiddag';
        else begroeting = 'Goedenavond';
      }

      // Fail-safe voor data-velden
      const infoHTML = `
        ${begroeting}!<br>
        Welkom vanuit ${stad}, ${land}
        ${vlagUrl ? `<img src="${vlagUrl}" alt="vlag">` : ""} <br>
        Jouw lokale tijd is: ${now} <br>
        <small>
          IP: ${data.ip || 'onbekend'} <br>
          Organisatie: ${data.org || 'onbekend'} <br>
          AS Number: ${data.asn || 'onbekend'} <br>
          Valuta: ${data.currency || 'onbekend'} <br>
          Taal: ${data.language || data.languages || 'onbekend'} <br>
          Tijdzone: ${tijdzone} <br>
          Locatie: ${(data.loc) ? data.loc : 'onbekend'} <br>
        </small>
      `;

      // Zet alles in het #welkom div
      const welkomDiv = document.getElementById('welkom');
      if (welkomDiv) {
        welkomDiv.innerHTML = infoHTML;
      }

      // Callback als je iets wilt doen met alle data
      if (typeof callback === "function") callback(data);
    })
    .catch(error => {
      const welkomDiv = document.getElementById('welkom');
      if (welkomDiv) {
        welkomDiv.textContent = "Kon locatiegegevens niet ophalen.";
      }
      if (typeof callback === "function") callback(null, error);
    });
}

// Direct uitvoeren als het bestand wordt geladen
window.addEventListener('DOMContentLoaded', () => {
  fetchIPInfo();
});
