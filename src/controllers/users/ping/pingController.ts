import { Controller, Get, Route } from "tsoa";

@Route("/ping")
export class pingController extends Controller {
    @Get()
    get(): { ping: string } {
        return {
            ping: "pong",
        };
    }
}
