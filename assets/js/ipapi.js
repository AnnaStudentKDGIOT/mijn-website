fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {
    const land = data.country_name;
    const stad = data.city;
    const tijdzone = data.timezone;
    const vlag = data.country_code.toLowerCase();
    
    const now = new Date().toLocaleTimeString('nl-NL', { timeZone: tijdzone });
    let begroeting;

    const uur = parseInt(now.split(':')[0]);
    if (uur < 12) begroeting = 'Goedemorgen';
    else if (uur < 18) begroeting = 'Goedemiddag';
    else begroeting = 'Goedenavond';

    document.getElementById('welkom').innerHTML = `
      ${begroeting}! <br>
      Welkom vanuit ${stad}, ${land} <img src="https://flagcdn.com/24x18/${vlag}.png" alt="vlag"> <br>
      Jouw lokale tijd is: ${now}
    `;
  });