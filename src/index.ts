import express from "express";
import cors from "cors"
import { PORT } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";
import sampleRouter from "./routes/sample.router";
import authRouter from "./routes/auth.router";
import productRouter from "./routes/product.router"

const app = express();

app.use(cors())
app.use(express.json())
app.use("/samples", sampleRouter)
app.use("/auth", authRouter)
app.use("/products", productRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
