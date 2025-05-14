   // API Key for OpenWeatherMap
        const apiKey = 'f32f9b8e576065966ba174743ebb30f0';  // Replace with your OpenWeatherMap API key

        // Function to get weather based on the city entered by the user
        async function getWeather() {
            const city = document.getElementById('city').value;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;  // Use 'metric' for Celsius

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('City not found'); // Handle error if city is not found

                const data = await response.json();
                console.log('Weather Data:', data); // Debugging line to show fetched data in the console
                displayWeather(data);  // Display the fetched weather data
            } catch (error) {
                console.error('Error:', error); // Log the error for debugging
                document.getElementById('error-message').style.display = 'block';
            }
        }

        // Function to display the weather data on the page
        function displayWeather(data) {
            const weatherDetails = document.getElementById('weather-details');
            const locationElement = document.getElementById('location');
            const temperatureElement = document.getElementById('temperature');
            const descriptionElement = document.getElementById('weather-description');

            const city = data.name;
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            // Set the weather data
            locationElement.textContent = city;
            temperatureElement.textContent = temp;
            descriptionElement.textContent = description;

            // Show the weather details
            weatherDetails.style.display = 'block';

            // Hide the error message if the data is fetched successfully
            document.getElementById('error-message').style.display = 'none';
        }