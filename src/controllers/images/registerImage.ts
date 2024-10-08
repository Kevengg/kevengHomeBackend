import { Body, Controller, Post, Route, Tags } from "tsoa";
import ErrorReturn from "../../moddels/errorReturn";
import { db } from "../../db";

interface RegisterImageBody {
    link: string;
    descripiton: string;
}

@Route("post/")
export class RegisterPost extends Controller {
    @Post("image/")
    @Tags("register")
    public async register(
        @Body() body: RegisterImageBody,
    ): Promise<unknown | ErrorReturn> {
        const dbRetun = await db.imageLink.create({
            data: {
                ...body,
            },
        });
        return dbRetun;
    }
}
