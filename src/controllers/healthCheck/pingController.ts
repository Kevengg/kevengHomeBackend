import { Controller, Get, Route, Tags } from "tsoa";

@Route("/ping")
export class pingController extends Controller {
    @Get()
    @Tags("health check")
    get(): { ping: string } {
        return {
            ping: "pong",
        };
    }
}

// TODO: create a system to log server errors to db
