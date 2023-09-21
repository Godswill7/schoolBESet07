import express, { Application, Request, Response } from "express";
import cors from "cors";
import classs from "./router/classRouter"
import { consumerService } from "./utils/connection";


// const amqpServer = "amqp://localhost:5672";

const app: Application = express();
const port: number = 7428;

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use("/api",classs)

app.get("/", (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            message: "Awesome Class",
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});

consumerService("student")

app.listen(port, () => {
    console.log(" ");
    console.log(`class server is active:`, port);
});