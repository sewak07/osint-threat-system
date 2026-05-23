import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    const input = text.toLowerCase();

    // 🧠 HARD SAFETY OVERRIDE (backend level)
    const hardThreatKeywords = [
      "kill",
      "i will kill",
      "murder",
      "bomb",
      "attack you",
      "shoot"
    ];

    const isHardThreat = hardThreatKeywords.some(word =>
      input.includes(word)
    );

    // Call Flask AI service
    const response = await axios.post("http://localhost:5000/predict", {
      text
    });

    const aiResult = response.data;

    // 🚨 OVERRIDE AI IF CRITICAL THREAT
    if (isHardThreat) {
      aiResult.label = "violence";
      aiResult.risk_score = 95;
      aiResult.confidence = 1.0;
    }

    // 🔥 FINAL DECISION LAYER
    const shouldAlert =
      isHardThreat ||
      aiResult.label !== "normal" ||
      aiResult.risk_score >= 50;

    res.json({
      success: true,
      result: aiResult,
      alert: shouldAlert
    });

  } catch (error) {
    res.status(500).json({
      error: "AI service failed"
    });
  }
});

export default router;