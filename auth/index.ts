import express, { Application, Request, Response } from "express";
import cors from "cors";
import auth from "./router/authRouter"


// const amqpServer = "amqp://localhost:5672";

const app: Application = express();
const port: number = 3344;

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use("/api",auth)

app.get("/", (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            message: "Awesome Auth",
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});

app.listen(port, () => {
    console.log(" ");
    console.log(`student auth server is active:`, port);
});