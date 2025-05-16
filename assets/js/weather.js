 const API_KEY = "f32f9b8e576065966ba174743ebb30f0"; // OpenWeatherMap API Key
    let chartInstance, scene, camera, renderer, rain;

    function setBackground(desc) {
      if (desc.includes("clear")) {
        document.body.style.backgroundImage = "url('https://example.com/sunny.jpg')"; addStars();
      } else if (desc.includes("rain")) {
        document.body.style.backgroundImage = "url('https://example.com/rain.jpg')"; addRain();
      } else if (desc.includes("cloud")) {
        document.body.style.backgroundImage = "url('https://example.com/cloudy.jpg')"; addClouds();
      } else if (desc.includes("storm")) {
        document.body.style.backgroundImage = "url('https://example.com/storm.jpg')"; addLightning();
      } else {
        document.body.style.backgroundImage = "url('https://example.com/default.jpg')";
      }
    }

    function addStars() {
      cleanupScene();
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({alpha:true});
      renderer.setSize(innerWidth, innerHeight);
      document.body.appendChild(renderer.domElement);
      const geo = new THREE.SphereGeometry(1,32,32);
      const mat = new THREE.MeshBasicMaterial({color:0xffff00});
      const star = new THREE.Mesh(geo,mat); scene.add(star);
      camera.position.z=5;
      (function animate(){ requestAnimationFrame(animate);
        star.rotation.x+=0.01; star.rotation.y+=0.01;
        renderer.render(scene,camera);
      })();
    }

    function addRain() {
      cleanupScene();
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({alpha:true});
      renderer.setSize(innerWidth, innerHeight);
      document.body.appendChild(renderer.domElement);
      const geo = new THREE.BufferGeometry();
      const verts = [];
      for(let i=0;i<1000;i++){
        verts.push((Math.random()*200-100),(Math.random()*200-100),(Math.random()*200-100));
      }
      geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
      const mat = new THREE.PointsMaterial({color:0x00aaff, size:0.1});
      rain = new THREE.Points(geo,mat); scene.add(rain);
      camera.position.z=5;
      (function animate(){ requestAnimationFrame(animate);
        rain.rotation.x+=0.01; rain.rotation.y+=0.01;
        renderer.render(scene,camera);
      })();
    }

    function addClouds() { cleanupScene(); /* eventueel wolken‐anim */ }
    function addLightning() { cleanupScene(); /* eventueel bliksem‐anim */ }

    function cleanupScene() {
      if(renderer){ renderer.domElement.remove(); renderer.dispose(); }
    }

    async function getWeatherByIP() {
      try {
        const locRes = await fetch("https://ipapi.co/json/");
        const loc = await locRes.json();
        const { city, latitude:lat, longitude:lon } = loc;
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=nl`
        );
        const data = await weatherRes.json();
        const slice = data.list.slice(0,8);
        const temps = slice.map(p=>p.main.temp);
        const labels = slice.map(p=>new Date(p.dt_txt).getHours()+":00");
        const desc = slice[0].weather[0].description;
        setBackground(desc);

        const ctx = document.getElementById("weatherChart").getContext("2d");
        if(chartInstance) chartInstance.destroy();
        chartInstance = new Chart(ctx, {
          type: "line",
          data: { labels, datasets:[{
            label: `🌡️ Temp. in ${city} (°C)`,
            data: temps,
            backgroundColor:"rgba(54,162,235,0.2)",
            borderColor:"rgba(54,162,235,1)",
            borderWidth:2, fill:true, tension:0.3
          }]},
          options:{ responsive:true, scales:{ y:{ beginAtZero:false } } }
        });

      } catch(err) {
        alert("Fout: "+ err.message);
      }
    }