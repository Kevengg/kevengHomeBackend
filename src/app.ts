import express, { urlencoded, Request, Response } from "express";
import { RegisterRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import asyncRouteHandler from "./utilities/asyncRouteHandler";

export const app = express();

// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    }),
);
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
