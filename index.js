const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const apiKey = process.env.API_KEY;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error fetching weather data");
    }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});


