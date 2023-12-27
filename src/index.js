import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
     })
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})