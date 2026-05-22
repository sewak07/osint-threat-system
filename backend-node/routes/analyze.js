import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    // Call Flask AI service (Hugging Face runs there)
    const response = await axios.post("http://localhost:5000/predict", {
      text
    });

    //return AI result
    res.json({
      success: true,
      result: response.data
    });
  } catch (error) {
    res.status(500).json({ error: "AI service failed" });
  }
})

export default router;
