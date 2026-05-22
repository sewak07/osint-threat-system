import express from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyze.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/", analyzeRoute);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Node backend running on ${PORT} `);
});