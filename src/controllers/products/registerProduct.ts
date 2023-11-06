import { Body, Controller, Post, Route } from "tsoa";
import ErrorReturn from "../../moddels/errorReturn";
import { db } from "../../db";

interface RegisterProductBody {
    name: string;
    description: string;
    price?: number;
    listPrice?: number;
    soldPrice?: number;
    sold: boolean;
    soldAt?: string;
    activeFrom?: string;
    priceBreakdown?: string;
}

@Route("/post")
export class RegisterProduct extends Controller {
    @Post("/product")
    public async register(
        @Body() body: RegisterProductBody,
    ): Promise<unknown | ErrorReturn> {
        const dbRetun = await db.product.create({
            data: {
                ...body,
            },
        });

        return dbRetun;
    }
}
