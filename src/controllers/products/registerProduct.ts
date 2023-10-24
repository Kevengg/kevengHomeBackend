import { Body, Controller, Post, Route } from "tsoa";
import ErrorReturn from "../../moddels/errorReturn";
import { db } from "../../db";

interface RegisterProductBody {
    name: string;
    description: string;
    sold: boolean;
    activeFrom: Date;
}

@Route("/post/product")
export class RegisterProduct extends Controller {
    @Post("/new")
    public async register(
        @Body() body: RegisterProductBody,
    ): Promise<unknown | ErrorReturn> {
        const dbRetun = await db.product.create({
            data: {
                name: body.name,
                description: body.description,
                sold: body.sold,
                activeFrom: body.activeFrom,
            },
        });

        return dbRetun;
    }
}
