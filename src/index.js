import express from "express";
import { config } from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.routes.js"
import custoRoute from "./routes/customer.routes.js"
import projectRoute from "./routes/projects.routes.js"
config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth",authRoute)
app.use("/api/customer",custoRoute)
app.use("/api",projectRoute)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})