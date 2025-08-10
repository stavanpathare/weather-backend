const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const apiKey = process.env.API_KEY;

// Root route for testing
app.get('/', (req, res) => {
    res.send('🌦 Weather backend is running! Use /weather?city=CityName to get data.');
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send("City parameter is required");
    }
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error fetching weather data");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
