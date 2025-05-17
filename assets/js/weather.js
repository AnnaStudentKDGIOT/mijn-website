// === Configuratie ===
const WEATHER_API_KEY = "f32f9b8e576065966ba174743ebb30f0"; // <-- Vul in!
const IPINFO_TOKEN = "57ae4e2b472760";          // <-- Vul in!

let chartInstance, scene, camera, renderer, rain;

// --- Achtergrond & Animatie afhankelijk van het weer ---
function setBackground(desc) {
  if (desc.includes("clear")) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')";
    addStars();
  } else if (desc.includes("rain")) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80')";
    addRain();
  } else if (desc.includes("cloud")) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80')";
    addClouds();
  } else if (desc.includes("storm")) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1500&q=80')";
    addLightning();
  } else {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1465101178521-c1a9136a3f1a?auto=format&fit=crop&w=1500&q=80')";
    cleanupScene();
  }
}

// --- Animatie helpers (Three.js) ---
function addStars() {
  cleanupScene();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);
  for (let i = 0; i < 100; i++) {
    const geo = new THREE.SphereGeometry(0.2, 8, 8);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geo, mat);
    star.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
    scene.add(star);
  }
  camera.position.z = 10;
  (function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  })();
}

function addRain() {
  cleanupScene();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);
  const geo = new THREE.BufferGeometry();
  const verts = [];
  for (let i = 0; i < 1000; i++) {
    verts.push((Math.random() * 200 - 100), (Math.random() * 200 - 100), (Math.random() * 200 - 100));
  }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  const mat = new THREE.PointsMaterial({ color: 0x00aaff, size: 0.1 });
  rain = new THREE.Points(geo, mat);
  scene.add(rain);
  camera.position.z = 5;
  (function animate() {
    requestAnimationFrame(animate);
    rain.rotation.x += 0.01;
    rain.rotation.y += 0.01;
    renderer.render(scene, camera);
  })();
}

function addClouds() { cleanupScene(); }
function addLightning() { cleanupScene(); }
function cleanupScene() {
  if (renderer && renderer.domElement) {
    renderer.domElement.remove();
    renderer.dispose?.();
    renderer = null;
  }
}

// --- Hoofdfunctie: weer ophalen op basis van IP ---
async function getWeatherByIP() {
  try {
    // IP-gebaseerde locatie ophalen
    const locRes = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
    if (!locRes.ok) throw new Error("Locatie ophalen mislukt (ipinfo.io)");
    const loc = await locRes.json();
    const [lat, lon] = loc.loc.split(",");
    const city = loc.city;

    // Weer ophalen
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=nl`
    );
    if (!weatherRes.ok) throw new Error("Weer ophalen mislukt (OpenWeatherMap)");
    const data = await weatherRes.json();
    const slice = data.list.slice(0, 8);
    const temps = slice.map(p => p.main.temp);
    const labels = slice.map(p => new Date(p.dt_txt).getHours() + ":00");
    const desc = slice[0]?.weather?.[0]?.description || "";

    setBackground(desc);

    // Toon info
    document.getElementById('weatherInfo').innerHTML = `
      <strong>${city}</strong><br>
      ${desc}
    `;

    // Maak een chart
    const ctx = document.getElementById("weatherChart").getContext("2d");
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: `🌡️ Temp. in ${city} (°C)`,
          data: temps,
          backgroundColor: "rgba(54,162,235,0.2)",
          borderColor: "rgba(54,162,235,1)",
          borderWidth: 2,
          fill: true,
          tension: 0.3
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: false } } }
    });

  } catch (err) {
    alert("Fout: " + err.message);
  }
}

// --- Automatisch uitvoeren bij laden ---
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("zoekWeerBtn")) {
    document.getElementById("zoekWeerBtn").addEventListener("click", getWeatherByIP);
  } else {
    getWeatherByIP();
  }
});
