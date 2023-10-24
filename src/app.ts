import express, { urlencoded, Request, Response } from "express";
import { RegisterRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import asyncRouteHandler from "./utilities/asyncRouteHandler";
const cors = require("cors");

const corsConfig = { origin: ["http://localhost:3000"] };

dotenv.config();

const app = express();

app.use(cors(corsConfig));

app.use(express.json());

RegisterRoutes(app);

app.use(
    "/swagger",
    swaggerUi.serve,
    asyncRouteHandler(async (_: Request, res: Response) => {
        res.send(swaggerUi.generateHTML(await import("./swagger.json")));
    }),
);

app.use((req: Request, res: Response) => {
    return res.status(404).json({ message: "Not Found" });
});

export default app;
