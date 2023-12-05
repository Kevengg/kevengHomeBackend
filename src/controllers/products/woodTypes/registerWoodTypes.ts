import { Body, Controller, Post, Request, Route, Tags } from "tsoa";
import { Request as ExpressRequest } from "express";
import ErrorReturn from "../../../moddels/errorReturn";
import handleError from "../../../utilities/handleError";
import { db } from "../../../db";

interface RegisterWoodTypeBody {
    name: string;
    description: string;
    basePrise?: number;
    widthMultiplier: number;
    lengthMultiplier: number;
    imageIds: number[];
}

@Route("/post")
export class RegisterWoodType extends Controller {
    @Post("woodtype")
    @Tags("register")
    public async register(
        @Body() body: RegisterWoodTypeBody,
        @Request() request: ExpressRequest,
    ): Promise<unknown | ErrorReturn> {
        const err = (error: ErrorReturn) => {
            handleError(this, error, "RegisterWoodType", request);
        };
        if (!body.name) {
            return err({
                error: 401,
                errorMsg: "Please provide the name of the wood type",
            });
        }

        if (!body.description) {
            err({
                error: 401,
                errorMsg: "Please provide a description of the wood type",
            });
        }

        // create the array for connect
        const connectArr = body.imageIds?.reduce(
            (prev, current) => {
                return [...prev, { imageLinkId: current }];
            },
            [] as { imageLinkId: number }[],
        );

        const dbRetun = await db.woodType.create({
            data: {
                name: body.name,
                description: body.description,
                basePrice: body.basePrise || 0,
                widthMultiplier: body.widthMultiplier,
                lengthMultiplier: body.lengthMultiplier,
                images: { connect: connectArr },
            },
        });
    }
}
