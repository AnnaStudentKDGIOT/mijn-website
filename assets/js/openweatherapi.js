async function getWeather() {
            const city = document.getElementById('city').value;
            const apiKey = 'f32f9b8e576065966ba174743ebb30f0'; // Replace with your OpenWeatherMap API key
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Use 'metric' for Celsius, or 'imperial' for Fahrenheit

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('City not found');

                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                document.getElementById('weather').innerHTML = 'Error: ' + error.message;
            }
        }

        function displayWeather(data) {
            const weatherDiv = document.getElementById('weather');
            const city = data.name;
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            weatherDiv.innerHTML = `
                <h2>Weather in ${city}</h2>
                <img src="${icon}" alt="${description}">
                <p>Temperature: ${temp}°C</p>
                <p>Description: ${description}</p>
            `;
        }