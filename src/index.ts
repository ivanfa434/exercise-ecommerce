import express from "express";
import cors from "cors"
import { PORT } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";
import sampleRouter from "./routes/sample.router";

const app = express();

app.use(cors())
app.use(express.json())
app.use("/samples", sampleRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
