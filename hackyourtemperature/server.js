import express from "express";

const app = express();

const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1> Hello from backend to frontend!</h1>");
});

app.post("/weather", (req, res) => {
  if (req.body.cityName) {
    const cityName = req.body.cityName;
    res.status(200).json({ cityName });
  } else {
    res.status(400).json({ msg: "Sorry No city found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at Port${PORT}`);
});
