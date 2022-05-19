import express from "express";
import fetch from "node-fetch";
import { keys } from "./sources/keys.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<h1> Hello from backend to frontend!</h1>");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.city;

  try {
    if (!cityName) {
      res.status(400).json({ weatherText: "Please provide a city name" });
      return;
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}&units=metric`
    );

    const data = await response.json();
    const cityTemp = data.main.temp;
    res.status(200).send(`The temperature of ${cityName} is : ${cityTemp} C`);
  } catch (error) {
    res.status(404).json({ weatherText: "City is not found!" });
  }
});

export default app;
