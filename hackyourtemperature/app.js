import express from "express";
import fetch from "node-fetch";
import { keys } from "./sources/keys.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<h1> Hello from backend to frontend!</h1>");
});

app.post("/weather/:city", async (req, res) => {
  const cityName = req.params.city;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`
    );

    const data = await response.json();
    const cityTempInCelsius = Math.round(data.main.temp - 273.15);
    res
      .status(200)
      .send(`The temperature of ${cityName} is : ${cityTempInCelsius} C`);
  } catch (error) {
    res.status(404).json({ weatherText: "City is not found!" });
  }
});

export default app;
