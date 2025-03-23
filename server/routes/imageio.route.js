import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import FormData from "form-data"; // Import FormData

dotenv.config();

const router = express.Router();
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

router.route("/").get((req, res) => {
  res.send("Hello from Stability AI Image Generator!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Create form-data object
    const form = new FormData();
    form.append("prompt", prompt);
    form.append("width", "1024"); // Lower resolution for faster generation
    form.append("height", "1024"); // Lower resolution for faster generation
    form.append("steps", "15"); // Lower steps for speed (default is ~50)
    form.append("cfg_scale", "4"); // Less processing for speed
    form.append("samples", "1"); // Only generate 1 image to save credits

    // Make request to Stability AI
    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      form, // Pass form-data instead of JSON
      {
        headers: {
          Authorization: `Bearer ${STABILITY_API_KEY}`,
          ...form.getHeaders(), // Set correct content type
        },
      }
    );

  
    const imageUrl = response.data.image; // Stability AI returns an image URL

    res.status(200).json({ photo: imageUrl });
  } catch (err) {
    console.error("Error generating image:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || "Something went wrong!" });
  }
});

export default router;
