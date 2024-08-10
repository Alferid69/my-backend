require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Route to handle API request from React app
app.get("/api/search", async (req, res) => {
  const { artist, song } = req.query;

  try {
    const response = await axios.get(
      `https://api.vagalume.com.br/search.php?art=${artist}&mus=${song}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from Vagalume API");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
